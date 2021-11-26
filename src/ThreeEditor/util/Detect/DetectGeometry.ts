import { Signal } from 'signals';
import * as THREE from 'three';
import { Editor } from '../../js/Editor';
import * as CSG from '../CSG/CSG';
import { SimulationPoints } from '../SimulationBase/SimulationMesh';
import { DetectManager } from './DetectManager';
import * as DETECT from './DetectTypes';

export interface DetectGeometryJSON {
	data: DETECT.Any;
	type: DETECT.DETECT_TYPE;
	position: THREE.Vector3Tuple;
	name: string;
}

type DetectGeometryArgs = Partial<DetectGeometryJSON>;

export class DetectGeometry extends SimulationPoints {
	readonly notRemovable = false;
	map: null;
	alphaMap: null;
	size: number;
	sizeAttenuation: boolean;
	get notMovable() {
		// custom get function to conditionally return notMoveable property;
		return ['Zone', 'All'].includes(this.detectType);
	}
	readonly notRotatable = true;
	readonly notScalable = true;
	readonly isDetectGeometry: true = true;

	private static _detectPointsMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
		color: new THREE.Color('cyan'),
		size: 0.1
	});

	private positionProxy: THREE.Vector3;
	private proxy: DetectGeometry;
	private _detectType: DETECT.DETECT_TYPE;

	get detectType(): DETECT.DETECT_TYPE {
		return this._detectType;
	}

	set detectType(value: DETECT.DETECT_TYPE) {
		this._detectType = value;
		this.tryUpdateGeometry();
		this.signals.objectSelected.dispatch(this.proxy);
	}

	get geometryData(): DETECT.Any {
		return this._geometryData;
	}

	set geometryData(value: DETECT.Any) {
		this._geometryData = value;
		this.tryUpdateGeometry();
	}

	static maxDisplayDensity: number = 4;
	autoSplitGrid: boolean = true;

	private signals: {
		objectAdded: Signal<THREE.Object3D>;
		objectChanged: Signal<THREE.Object3D>;
		objectRemoved: Signal<THREE.Object3D>;
		zoneGeometryChanged: Signal<CSG.Zone>;
		zoneEmpty: Signal<CSG.Zone>;
		sceneGraphChanged: Signal;
		CSGManagerStateChanged: Signal;
		detectGeometryAdded: Signal<DetectGeometry>;
		detectGeometryRemoved: Signal<DetectGeometry>;
		detectGeometryChanged: Signal<DetectGeometry>;
		objectSelected: Signal<THREE.Object3D>;
	};
	readonly isDetectGeo: true = true;

	private _geometryData: DETECT.Any;
	private disableGeometryUpdate: boolean = false;

	private tryUpdateGeometry = (type: DETECT.DETECT_TYPE = this.detectType) => {
		if (!this.disableGeometryUpdate) {
			this.geometry.dispose();
			this.geometry = this.generateGeometry(undefined, type);
			this.geometry.computeBoundingSphere();
		}
	};

	private overrideHandler = {
		get: (target: DetectGeometry, p: keyof DetectGeometry) => {
			let result: unknown;
			switch (p) {
				case 'position':
					result = this.positionProxy;
					break;
				default:
					result = Reflect.get(target, p);
			}
			return result;
		},
		set: (
			target: DetectGeometry,
			p: keyof DetectGeometry,
			value: unknown,
			receiver: unknown
		) => {
			const result = Reflect.set(target, p, value, receiver);
			switch (p) {
				case 'geometry':
					this.geometry.computeBoundingSphere();
					this.updateMatrixWorld(true);
					break;
				default:
					break;
			}
			return result;
		}
	};

	private generateGeometry(
		data: DETECT.Any = this.geometryData,
		type: DETECT.DETECT_TYPE = this.detectType
	): THREE.BufferGeometry {
		let geometry: THREE.BufferGeometry = new THREE.BufferGeometry();

		switch (type) {
			case 'Mesh':
				geometry = new THREE.BoxGeometry(
					data.width,
					data.height,
					data.depth,
					Math.min(data.widthSegments, DetectGeometry.maxDisplayDensity),
					Math.min(data.heightSegments, DetectGeometry.maxDisplayDensity),
					Math.min(data.depthSegments, DetectGeometry.maxDisplayDensity)
				);
				break;
			case 'Cyl':
				geometry = createCylindricalGeometry(data, this.matrix);
				geometry = geometry.rotateX(Math.PI / 2); // rotate to align along the z axis
				break;
			case 'Zone':
				const zone = this.editor.zoneManager.getZoneById(data.zoneId);
				geometry =
					zone?.geometry
						.clone()
						.translate(-this.position.x, -this.position.y, -this.position.z) ??
					geometry;

				break;
			case 'All':
				break;
			default:
				throw new Error(`${type} is not a valid Detect Geometry type`);
		}
		return geometry;
	}

	constructor(
		editor: Editor,
		{ data = DETECT.DEFAULT_ANY, type = 'Mesh', position = [0, 0, 0], name }: DetectGeometryArgs
	) {
		super(editor, name, 'Detect');
		this.map = null;

		this.alphaMap = null;

		this.size = 1;
		this.sizeAttenuation = true;
		this.proxy = new Proxy(this, this.overrideHandler);
		this.signals = editor.signals;
		this.position.fromArray(position);
		this._geometryData = data;
		this._detectType = type;

		this.positionProxy = new Proxy(this.position, {
			get: (target: THREE.Vector3, p: keyof THREE.Vector3) => {
				const scope = this;
				const parent: DetectManager | undefined = this.parent?.parent as
					| DetectManager
					| undefined;
				switch (p) {
					case 'copy':
						return function (v: THREE.Vector3) {
							target[p].apply(target, [v]);
							return scope.positionProxy;
						};
					case 'add':
						if (parent)
							return function (v: THREE.Vector3) {
								const nV = target[p].apply(target, [v]);
								parent.detectHelper.position.copy(nV);
								return nV;
							};
						return Reflect.get(target, p);
					default:
						return Reflect.get(target, p);
				}
			}
		});

		this.geometry = this.generateGeometry(data, type);
		this.material = DetectGeometry._detectPointsMaterial;
		this.signals.zoneGeometryChanged.add(zone => {
			if (zone.id === this._geometryData.zoneId) this.geometry = this.generateGeometry();
		});

		return this.proxy;
	}

	getMesh(): DETECT.Mesh {
		if (this.detectType !== 'Mesh')
			throw new Error(`DetectGeo of uui=${this.uuid} isn't of 'Mesh' type`);
		return Object.assign({}, this._geometryData as DETECT.Mesh);
	}

	getCyl(): DETECT.Cyl {
		if (this.detectType !== 'Cyl')
			throw new Error(`DetectGeo of uui=${this.uuid} isn't of 'Cyl' type`);
		return Object.assign({}, this._geometryData as DETECT.Cyl);
	}

	getZone(): DETECT.Zone {
		if (this.detectType !== 'Zone')
			throw new Error(`DetectGeo of uui=${this.uuid} isn't of 'Zone' type`);
		return Object.assign({}, this._geometryData as DETECT.Zone);
	}

	getAll(): DETECT.All {
		if (this.detectType !== 'All')
			throw new Error(`DetectGeo of uui=${this.uuid} isn't of 'All' type`);
		return {};
	}

	getData(type: DETECT.DETECT_TYPE = this.detectType): Partial<DETECT.Any> {
		switch (type) {
			case 'Mesh':
				return this.getMesh();
			case 'Cyl':
				return this.getCyl();
			case 'Zone':
				return this.getZone();
			case 'All':
			default:
				return this.getAll();
		}
	}

	setData(data: DETECT.Any): void {
		this.disableGeometryUpdate = true;
		Object.assign(this.geometryData, data);
		this.disableGeometryUpdate = false;
		this.tryUpdateGeometry();
	}

	copy(source: this, recursive = true) {
		return new Proxy(super.copy(source, recursive), this.overrideHandler) as this;
	}

	toJSON(): DetectGeometryJSON {
		const data = this._geometryData;
		const type = this.detectType;
		const position = this.position.toArray();
		const name = this.name;
		return {
			data,
			type,
			position,
			name
		};
	}

	fromJSON(data: DetectGeometryJSON): void {
		this._geometryData = data.data;
		this.detectType = data.type;
		this.name = data.name;
		this.geometry = this.generateGeometry();
		this.position.fromArray(data.position);
	}

	static fromJSON(editor: Editor, data: DetectGeometryJSON): DetectGeometry {
		const detectGeometry = new DetectGeometry(editor, data);
		return detectGeometry;
	}
}

export const isDetectGeometry = (x: any): x is DetectGeometry => x instanceof DetectGeometry;

function createCylindricalGeometry(data: DETECT.Cyl, matrix: THREE.Matrix4) {
	const averageRadius = (data.outerRadius - data.innerRadius) / 2;
	const geometry1 = new THREE.CylinderGeometry(
		data.outerRadius,
		data.outerRadius,
		data.depth,
		20,
		Math.min(data.depthSegments, DetectGeometry.maxDisplayDensity)
	);
	const geometry2 = new THREE.CylinderGeometry(
		averageRadius,
		averageRadius,
		data.depth,
		20,
		Math.min(data.depthSegments, DetectGeometry.maxDisplayDensity)
	);

	const geometry3 = new THREE.CylinderGeometry(
		data.innerRadius,
		data.innerRadius,
		data.depth,
		20,
		Math.min(data.depthSegments, DetectGeometry.maxDisplayDensity)
	);
	const cyl1 = new THREE.Mesh(geometry1);
	const cyl2 = new THREE.Mesh(geometry2);
	const cyl3 = new THREE.Mesh(geometry3);
	cyl1.updateMatrix();
	cyl2.updateMatrix();
	cyl3.updateMatrix();
	const BSP1 = CSG.CSG.fromMesh(cyl1);
	const BSP2 = CSG.CSG.fromMesh(cyl2);
	const BSP3 = CSG.CSG.fromMesh(cyl3);
	const newGeometry = CSG.CSG.toGeometry(
		data.innerRadius
			? BSP1.subtract(BSP3).union(BSP2.subtract(BSP3))
			: BSP1.subtract(BSP2).union(BSP2),
		matrix
	);
	return newGeometry;
}