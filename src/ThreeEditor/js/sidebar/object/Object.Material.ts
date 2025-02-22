import {
	createFullwidthButton,
	createMaterialSelect,
	createRowColor,
	createRowConditionalNumber,
	createRowText,
	hideUIElement,
	showUIElement
} from '../../../../util/Ui/Uis';
import { SimulationMesh } from '../../../Simulation/Base/SimulationMesh';
import { SimulationPoints } from '../../../Simulation/Base/SimulationPoints';
import { Beam } from '../../../Simulation/Physics/Beam';
import { isBooleanZone } from '../../../Simulation/Zones/BooleanZone';
import { isWorldZone } from '../../../Simulation/Zones/WorldZone/WorldZone';
import {
	SetMaterialColorCommand,
	SetMaterialValueCommand,
	SetZoneMaterialCommand
} from '../../commands/Commands';
import { UIButton, UICheckbox, UIColor, UINumber, UIRow, UISelect, UIText } from '../../libs/ui';
import { YaptideEditor } from '../../YaptideEditor';
import { SidebarMaterialBooleanProperty } from '../Sidebar.Material.BooleanProperty';
import { SidebarMaterialConstantProperty } from '../Sidebar.Material.ConstantProperty';
import { ObjectAbstract } from './Object.Abstract';

const MATERIAL_BLENDING_OPTIONS = {
	0: 'No',
	1: 'Normal',
	2: 'Additive',
	3: 'Subtractive',
	4: 'Multiply'
} as const;

export class ObjectMaterial extends ObjectAbstract {
	object?: SimulationMesh | SimulationPoints | Beam;

	typeRow: UIRow;
	type: UIText;

	typeSelectRow: UIRow;
	typeSelect: UISelect;
	renderTypeSelect: (value: number) => void;

	colorRow: UIRow;
	color: UIColor;

	flatShadingRow: UIRow;
	blendingRow: UIRow;

	opacityRow: UIRow;
	opacity: UINumber;
	transparent: UICheckbox;

	exportMaterialsRow: UIRow;
	exportMaterials: UIButton;

	constructor(editor: YaptideEditor) {
		super(editor, 'Visuals');

		[this.typeRow, this.type] = createRowText({ text: 'Material Type' });
		[this.typeSelectRow, this.typeSelect, this.renderTypeSelect] = createMaterialSelect(
			editor.materialManager,
			this.update.bind(this)
		);

		// color
		[this.colorRow, this.color] = createRowColor({
			text: 'Color',
			update: this.update.bind(this)
		});

		// flatShading
		this.flatShadingRow = SidebarMaterialBooleanProperty(editor, 'flatShading', 'Flat Shading');

		// blending
		this.blendingRow = SidebarMaterialConstantProperty(
			editor,
			'blending',
			'Blending',
			MATERIAL_BLENDING_OPTIONS
		);

		// opacity
		[this.opacityRow, this.transparent, this.opacity] = createRowConditionalNumber({
			text: 'Opacity',
			min: 0,
			max: 1,
			step: 0.05,
			update: this.update.bind(this)
		});

		// export JSON
		[this.exportMaterialsRow, this.exportMaterials] = createFullwidthButton({
			text: 'Console Log Materials',
			update: this.materialConsole.bind(this)
		});

		this.panel.add(
			this.typeRow,
			this.typeSelectRow,
			this.colorRow,
			/*
			 * Disable flatShading and blending for now.
			 * this.flatShadingRow,
			 * this.blendingRow,
			 */
			this.opacityRow,
			this.exportMaterialsRow
		);
	}

	setObject(object: SimulationMesh | Beam | SimulationPoints): void {
		super.setObject(object);

		if (!object) return;

		this.object = object;
		const { color, opacity, transparent, type } = object.material;
		hideUIElement(this.typeRow);
		hideUIElement(this.typeSelectRow);
		hideUIElement(this.opacityRow);
		hideUIElement(this.exportMaterialsRow);
		this.color.setHexValue(color.getHexString());

		if (isWorldZone(object) || isBooleanZone(object)) {
			const { icru } = object.simulationMaterial;
			showUIElement(this.typeSelectRow);

			if (isBooleanZone(object)) {
				showUIElement(this.opacityRow);

				if (transparent) showUIElement(this.opacity);
				else hideUIElement(this.opacity);
				showUIElement(this.exportMaterialsRow);
				this.opacity.setValue(opacity);
				this.transparent.setValue(transparent);
			}

			this.typeSelect.setValue(icru);
		} else {
			showUIElement(this.typeRow);
			this.type.setValue(type);
		}

		this.render();
	}

	update(): void {
		const { editor, object } = this;

		if (!object) return;
		if (
			(isWorldZone(object) || isBooleanZone(object)) &&
			object.simulationMaterial.icru !== parseInt(this.typeSelect.getValue())
		)
			editor.execute(new SetZoneMaterialCommand(editor, object, this.typeSelect.getValue()));
		if (object.material.color.getHex() !== this.color.getHexValue())
			editor.execute(
				new SetMaterialColorCommand(editor, object, 'color', this.color.getHexValue())
			);
		if (isBooleanZone(object) && object.material.transparent !== this.transparent.getValue())
			editor.execute(
				new SetMaterialValueCommand(
					editor,
					object,
					'transparent',
					this.transparent.getValue()
				)
			);
		if (isBooleanZone(object) && object.material.opacity !== this.opacity.getValue())
			editor.execute(
				new SetMaterialValueCommand(editor, object, 'opacity', this.opacity.getValue())
			);
	}

	render(): void {
		if (!isWorldZone(this.object) && !isBooleanZone(this.object)) return;
		this.renderTypeSelect(this.object.simulationMaterial.icru);
	}

	materialConsole(): void {
		console.log(this.editor.materialManager.toJSON().materials);
	}
}
