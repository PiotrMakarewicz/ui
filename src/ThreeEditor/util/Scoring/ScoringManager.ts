import { Signal } from 'signals';
import { Editor } from '../../js/Editor';
import { SimulationSceneGroup } from '../SimulationBase/SimulationGroup';
import { ScoringOutput, ScoringOutputJSON } from './ScoringOutput';

export type ScoringManagerJSON = {
	uuid: string;
	name: string;
	scoringOutputs: ScoringOutputJSON[];
};
export class ScoringManager extends SimulationSceneGroup<ScoringOutput> {
	readonly isScoringManager: true = true;
	readonly notRemovable = true;
	readonly notMovable = true;
	readonly notRotatable = true;
	readonly notScalable = true;
	readonly notHidable = true;
	signals: {
		objectAdded: Signal<THREE.Object3D>;
		objectRemoved: Signal<THREE.Object3D>;
	};
	constructor(editor: Editor) {
		super(editor, 'Outputs', 'OutputGroup');
		this.children = [];
		this.signals = editor.signals;
	}
	addOutput(output: ScoringOutput) {
		this.children.push(output);
		output.parent = this;

		this.signals.objectAdded.dispatch(output);
	}
	createOutput() {
		const output = new ScoringOutput(this.editor);
		this.addOutput(output);
		return output;
	}
	removeOutput(output: ScoringOutput) {
		this.children.splice(this.children.indexOf(output), 1);
		output.parent = null;
		this.signals.objectRemoved.dispatch(output);
	}
	getOutputByUuid(uuid: string) {
		return this.children.find(output => output.uuid === uuid);
	}
	toJSON(): ScoringManagerJSON {
		return {
			uuid: this.uuid,
			name: this.name,
			scoringOutputs: this.children.map(output => output.toJSON())
		};
	}
	fromJSON(json: ScoringManagerJSON): this {
		this.uuid = json.uuid;
		this.name = json.name;
		json.scoringOutputs.forEach(output => {
			const scoringOutput = new ScoringOutput(this.editor);
			scoringOutput.fromJSON(output);
			this.addOutput(scoringOutput);
		});
		return this;
	}
	static fromJSON(editor: Editor, json: ScoringManagerJSON) {
		return new ScoringManager(editor).fromJSON(json);
	}
	reset(): void {
		this.name = 'Outputs';
		return super.reset();
	}
}

export const isScoringManager = (x: unknown): x is ScoringManager => x instanceof ScoringManager;