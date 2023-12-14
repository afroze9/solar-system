<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { writable } from 'svelte/store';
	import { companySize } from '../../store';

	export let x: number = 0;
	export let y: number = 0;
	export let color: number;
	export let company: Company;
	export let onCompanyClicked: (companyId: number) => void;

	let projectCount = writable<number>(company.projectCount);
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(color || 0xffffff);
		graphics.drawCircle(0, 0, $companySize + 0.05 * $companySize * $projectCount);
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
		fill: 'black',
		fontSize: '20px',
		stroke: 'white',
		strokeThickness: 1
	}}
	on:click={() => onCompanyClicked(company.id)}
	cursor="pointer"
/>
