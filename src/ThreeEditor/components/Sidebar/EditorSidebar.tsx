import { useCallback, useEffect, useState } from 'react';
import { Editor } from '../../js/Editor';
import { Box, Tabs, Tab, Stack } from '@mui/material';
import { TabPanel } from '../../../WrapperApp/components/TabPanel';
import { SidebarTree } from './SidebarTree';
import { PropertiesPanel } from './propeteries/PropeteriesPanel';
import { EditorSidebarTabTree } from './tabs/EditorSidebarTabTree';
import { BoxMesh, CylinderMesh, SphereMesh } from '../../util/BasicMeshes';
import { AddObjectCommand } from '../../js/commands/AddObjectCommand';
import { AddZoneCommand } from '../../js/commands/AddZoneCommand';
import { AddDetectGeometryCommand } from '../../js/commands/AddDetectGeometryCommand';
import { AddFilterCommand } from '../../js/commands/AddFilterCommand';
import { AddOutputCommand } from '../../js/commands/AddOutputCommand';
import { Context } from '../../js/Editor.Context';

export function EditorSidebar(props: { editor: Editor }) {
	const { editor } = props;

	const [value, setValue] = useState('Geometry');

	const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
		switch (newValue) {
			case 'Scoring':
				editor.contextManager.currentContext = 'scoring';
				break;
			case 'Settings':
				editor.contextManager.currentContext = 'settings';
				break;
			default:
				editor.contextManager.currentContext = 'geometry';
		}
	};

	const handleContextChange = useCallback((context: Context) => {
		switch (context) {
			case 'scoring':
				setValue('Scoring');
				break;
			case 'settings':
				setValue('Settings');
				break;
			default:
				setValue('Geometry');
		}
	}, []);

	useEffect(() => {
		editor.signals.contextChanged.add(handleContextChange);
		return () => {
			editor.signals.contextChanged.remove(handleContextChange);
		};
	}, [editor, handleContextChange]);

	const geometryTabElements = [
		{
			title: 'Figures',
			add: [
				{
					title: 'Box',
					onClick: () => editor.execute(new AddObjectCommand(editor, new BoxMesh(editor)))
				},
				{
					title: 'Cylinder',
					onClick: () =>
						editor.execute(new AddObjectCommand(editor, new CylinderMesh(editor)))
				},
				{
					title: 'Sphere',
					onClick: () =>
						editor.execute(new AddObjectCommand(editor, new SphereMesh(editor)))
				}
			],
			tree: <SidebarTree editor={editor} sources={[editor.scene.children]} />
		},
		{
			title: 'Zones',
			add: [
				{
					title: 'Zone',
					onClick: () => editor.execute(new AddZoneCommand(editor))
				}
			],
			tree: (
				<SidebarTree
					editor={editor}
					sources={[
						editor.zoneManager.worldZone,
						editor.zoneManager.zoneContainer.children
					]}
				/>
			)
		},
		{
			title: 'Detectors',
			add: [
				{
					title: 'Detector',
					onClick: () => editor.execute(new AddDetectGeometryCommand(editor))
				}
			],
			tree: (
				<SidebarTree
					editor={editor}
					sources={[editor.detectManager.detectContainer.children]}
				/>
			)
		}
	];

	const scoringTabElements = [
		{
			title: 'Filters',
			add: [
				{
					title: 'Filter',
					onClick: () => editor.execute(new AddFilterCommand(editor))
				}
			],
			tree: (
				<SidebarTree
					editor={editor}
					sources={[editor.detectManager.filterContainer.children]}
				/>
			)
		},
		{
			title: 'Outputs',
			add: [
				{
					title: 'Output',
					onClick: () => editor.execute(new AddOutputCommand(editor))
				}
			],
			tree: <SidebarTree editor={editor} sources={[editor.scoringManager.children]} />
		}
	];

	return (
		<Box sx={{ height: '100vh', overflowY: 'auto' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
					<Tab label='Geometry' value={'Geometry'} />
					<Tab label='Scoring' value={'Scoring'} />
					<Tab label='Settings' value={'Settings'} />
				</Tabs>
			</Box>
			<TabPanel value={value} index={'Geometry'} persistentIfVisited>
				<EditorSidebarTabTree elements={geometryTabElements}></EditorSidebarTabTree>
			</TabPanel>
			<TabPanel value={value} index={'Scoring'} persistentIfVisited>
				<EditorSidebarTabTree elements={scoringTabElements}></EditorSidebarTabTree>
			</TabPanel>
			<TabPanel value={value} index={'Settings'} persistentIfVisited></TabPanel>
			<PropertiesPanel
				editor={editor}
				boxProps={{
					sx: { marginTop: '1rem', padding: '.5rem', overflowY: 'auto' }
				}}></PropertiesPanel>
		</Box>
	);
}