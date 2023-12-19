<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { writable } from 'svelte/store';
	import { companySize, selectedCompany, selectedProject } from '../../store';

	// export let nodeData: NodeData<Project>;
	export let x: number;
	export let y: number;
	export let project: Project;
	// export let onCompanyClicked: (companyId: number) => void;
	console.log(project);
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(project.color || 0xffffff);
		graphics.drawCircle(0, 0, 20);
		graphics.endFill();
	}}
	interactive
	cursor="pointer"
></Graphics>
<Text
	x={x + 25}
	{y}
	anchor={[0, 0.5]}
	text={project.name}
	style={{
		fill: 'white',
		fontSize: '20px'
	}}
	interactive
	cursor="pointer"
/>
