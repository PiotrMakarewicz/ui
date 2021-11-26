import * as THREE from 'three';
import { Color, LineBasicMaterial, MeshBasicMaterial, Object3D, Vector3 } from 'three';
import { debounce } from 'throttle-debounce';
import { Editor } from '../js/Editor';
import { getGeometryParameters, PossibleGeometryType } from './AdditionalUserData';
import SimulationMaterial from './Materials/SimulationMaterial';
import { SimulationObject3D } from './SimulationBase/SimulationMesh';

export interface WorldZoneJSON {
	type: string;
	center: THREE.Vector3;
	size: THREE.Vector3;
	geometryType: WorldZoneType;
	name: string;
	color: THREE.ColorRepresentation;
	marginMultiplier: number;
	autoCalculate: boolean;
	simulationMaterialName: string;
	userData?: {
		geometryType: string;
		position: THREE.Vector3Tuple;
		parameters: {
			[key: string]: number;
		};
	};
}

export const BOUNDING_ZONE_TYPE = ['sphere', 'cylinder', 'box'] as const;

export type WorldZoneType = typeof BOUNDING_ZONE_TYPE[number];

const _cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 16, 1, false, 0, Math.PI * 2);

const _sphereGeometry = new THREE.SphereGeometry(1, 16, 8, 0, Math.PI * 2, 0, Math.PI);

const _materialDefault = new THREE.MeshBasicMaterial({
	transparent: true,
	opacity: 0.5,
	wireframe: true
});

interface WorldZoneParams {
	box?: THREE.Box3;
	color?: THREE.ColorRepresentation;
	marginMultiplier?: number;
}

export class WorldZone extends SimulationObject3D {
	readonly notRemovable = true;
	get notMovable() {
		// custom get function to conditionally return notMoveable property;
		return this.autoCalculate && this.canCalculate();
	}
	readonly notRotatable = true;
	readonly notScalable = true;

	editor: Editor;

	box: THREE.Box3;
	marginMultiplier: number;

	// material: SimulationMaterial;

	private _material: MeshBasicMaterial;
	private _simulationMaterial!: SimulationMaterial;

	readonly isWorldZone: true = true;

	private _autoCalculate: boolean = false;
	private _geometryType: WorldZoneType = 'box';
	private boxHelper: THREE.Box3Helper;
	private cylinderMesh: THREE.Mesh<THREE.CylinderGeometry, MeshBasicMaterial>;
	private sphereMesh: THREE.Mesh<THREE.SphereGeometry, MeshBasicMaterial>;

	readonly debouncedCalculate = debounce(200, false, () => this.calculate());

	constructor(
		editor: Editor,
		{ box, color = 0xff0000, marginMultiplier = 1.1 }: WorldZoneParams = {}
	) {
		super(editor, 'World Zone', 'WorldZone');
		this.type = 'WorldZone';
		this.name = 'World Zone';
		this.editor = editor;

		this.marginMultiplier = marginMultiplier;

		this._material = _materialDefault;

		this.simulationMaterial = editor.materialsManager.materials['AIR, DRY (NEAR SEA LEVEL)'];

		// watch for changes on material color
		const materialColorHandler = {
			get: (target: Color, prop: keyof Color) => {
				return Reflect.get(this.simulationMaterial.color, prop);
			}
		};

		const proxyColor = new Proxy(new Color(color), materialColorHandler);
		this._material.color = proxyColor;

		this.box = box ?? new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		this.boxHelper = new THREE.Box3Helper(this.box, this._material.color);
		(this.boxHelper.material as LineBasicMaterial).color = proxyColor;
		this.boxHelper.name = 'boxHelper';

		this.cylinderMesh = new THREE.Mesh(_cylinderGeometry, this._material);
		this.cylinderMesh.name = 'cylinderMeshHelper';
		this.sphereMesh = new THREE.Mesh(_sphereGeometry, this._material);
		this.sphereMesh.name = 'sphereMeshHelper';

		this.geometryType = 'box';

		const handleSignal = (object: Object3D) => {
			if (this.autoCalculate && !isWorldZone(object)) this.debouncedCalculate();
		};
		this.editor.signals.objectChanged.add((object: Object3D) => handleSignal(object));
		this.editor.signals.sceneGraphChanged.add((object: Object3D) => handleSignal(object));
	}

	get material(): MeshBasicMaterial {
		return this._simulationMaterial;
	}

	get simulationMaterial(): SimulationMaterial {
		return this._simulationMaterial;
	}

	set simulationMaterial(value: SimulationMaterial) {
		this._simulationMaterial = value;
		this._material.color.setHex(value.color.getHex());
	}

	get geometryType() {
		return this._geometryType;
	}

	set geometryType(value: WorldZoneType) {
		this._geometryType = value;
		this.getAllHelpers().forEach(e => (e.visible = false));
		this.getHelper(value).visible = true;
		this.editor.signals.objectChanged.dispatch(this);
	}

	get autoCalculate(): boolean {
		return this._autoCalculate;
	}

	set autoCalculate(value: boolean) {
		this._autoCalculate = value;
		if (this._autoCalculate) this.calculate();
	}

	get center() {
		return this.box.getCenter(new Vector3());
	}

	set center(value: Vector3) {
		this.setFromCenterAndSize(value, this.size);
	}

	get size() {
		return this.box.getSize(new Vector3());
	}

	set size(value: Vector3) {
		this.setFromCenterAndSize(this.center, value);
	}

	private getAllHelpers() {
		return [this.boxHelper, this.sphereMesh, this.cylinderMesh];
	}

	private getHelper(geometryType: WorldZoneType): Object3D {
		const obj = {
			box: this.boxHelper,
			cylinder: this.cylinderMesh,
			sphere: this.sphereMesh
		};
		return obj[geometryType];
	}

	canCalculate(): boolean {
		return this._geometryType === 'box';
	}

	calculate(): void {
		if (!this.canCalculate()) return;

		this.setBoxFromObject(this.editor.scene);
	}

	setBoxFromObject(object: THREE.Object3D): void {
		this.updateBox(box => {
			box.setFromObject(object);
			this.addSafetyMarginToBox();
		});
	}

	setFromCenterAndSize(center: THREE.Vector3, size: THREE.Vector3): void {
		this.updateBox(box => {
			box.setFromCenterAndSize(center, size);

			this.sphereMesh.scale.setScalar(size.x);
			this.sphereMesh.position.copy(center);

			this.cylinderMesh.scale.set(size.x, size.y, size.x);
			this.cylinderMesh.position.copy(center);
		});
	}

	updateBox(updateFunction: (box: THREE.Box3) => void): void {
		updateFunction(this.box);
		this.editor.signals.objectChanged.dispatch(this);
	}

	makeCubeFromBox(): void {
		const size = this.box.getSize(new Vector3());
		const maxSize = Math.max(size.x, size.y, size.z);

		size.setScalar(maxSize);

		this.box.setFromCenterAndSize(this.box.getCenter(new Vector3()), size);
	}

	addSafetyMarginToBox(): void {
		const size = this.box.getSize(new Vector3());

		size.multiplyScalar(this.marginMultiplier);

		this.box.setFromCenterAndSize(this.box.getCenter(new Vector3()), size);
	}

	reset({ color = 0xff0000, name = 'World Zone' } = {}): void {
		this._material.color.set(color);
		this.name = name;
		this.simulationMaterial =
			this.editor.materialsManager.materials['AIR, DRY (NEAR SEA LEVEL)'];
		this.geometryType = 'box';
		this.updateBox(box => box.setFromCenterAndSize(new Vector3(), new Vector3()));
	}

	addHelpersToSceneHelpers(): void {
		this.getAllHelpers().forEach(e => this.editor.sceneHelpers.add(e));
	}

	removeHelpersFromSceneHelpers(): void {
		this.getAllHelpers().forEach(e => this.editor.sceneHelpers.remove(e));
	}

	toJSON() {
		const geometry: {
			[K in WorldZoneType]: PossibleGeometryType;
		} = {
			box: new THREE.BoxGeometry(this.size.x, this.size.y, this.size.z),
			sphere: new THREE.SphereGeometry(this.size.x),
			cylinder: new THREE.CylinderGeometry(this.size.x, this.size.x, this.size.y)
		};

		const jsonObject: WorldZoneJSON = {
			center: this.box.getCenter(new Vector3()),
			size: this.box.getSize(new Vector3()),
			type: this.type,
			geometryType: this._geometryType,
			name: this.name,
			color: this._material.color.getHex(),
			marginMultiplier: this.marginMultiplier,
			autoCalculate: this.autoCalculate,
			simulationMaterialName: this.simulationMaterial.name,
			userData: {
				geometryType: geometry[this._geometryType].type,
				parameters: getGeometryParameters(geometry[this._geometryType]),
				position: this.box.getCenter(new Vector3()).toArray()
			}
		};

		return jsonObject;
	}

	fromJSON(data: WorldZoneJSON) {
		this.geometryType = data.geometryType;
		this.name = data.name;

		this._material.color.set(data.color);

		this.marginMultiplier = data.marginMultiplier;

		this.setFromCenterAndSize(data.center, data.size);

		this.autoCalculate = data.autoCalculate;

		this.simulationMaterial =
			this.editor.materialsManager.materials[data.simulationMaterialName];

		return this;
	}

	static fromJSON(editor: Editor, data: WorldZoneJSON) {
		return new WorldZone(editor).fromJSON(data);
	}

	copy(source: this, recursive = true) {
		return super.copy(source, recursive) as this;
	}

	clone(recursive: boolean) {
		return new WorldZone(this.editor).copy(this, recursive) as this;
	}
}

export const isWorldZone = (x: unknown): x is WorldZone => x instanceof WorldZone;