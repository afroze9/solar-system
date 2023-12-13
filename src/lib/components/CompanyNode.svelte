<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { writable } from 'svelte/store';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 30;
	export let color: number;
	export let company: Company;
	export let onCompanyClicked: (companyId: number) => void;

	let projectCount = writable<number>(company.projects.length);
	let calculatedSize = size + 0.01 * size * $projectCount;
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(color || 0xffffff);
		graphics.drawCircle(0, 0, calculatedSize);
		graphics.endFill();
	}}
	interactive
	cursor="pointer"
	on:click={() => onCompanyClicked(company.id)}
></Graphics>
<Text
	{x}
	{y}
	anchor={0.5}
	text={company.name}
	style={{
		fill: 'white',
		fontSize: '20px'
	}}
	on:click={() => onCompanyClicked(company.id)}
	cursor="pointer"
/>
