<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';

	export let x: number;
	export let y: number;
	export let project: Project;
	export let onProjectClicked: (projectId: number) => void;
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
	on:click={() => onProjectClicked(project.id)}
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
	on:click={() => onProjectClicked(project.id)}
/>
