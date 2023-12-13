<script lang="ts">
	import { companyNames, projectNames } from '$lib/helpers';
	import { Graphics } from 'svelte-pixi';
	import { companies, rotationEnabled, rootX, rootSize, ringSize, companySize } from '../../store';
	import { companySizeRegular, ringSizeRegular, rootSizeRegular } from '../../constants';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 40;
	export let color: number = 0xffffff;
	export let numberOfRings = 0;
	export let onRootNodeClicked: () => void;
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(color || 0xffffff);
		graphics.drawCircle(0, 0, size);
		graphics.endFill();
	}}
	interactive
	cursor="pointer"
	on:click={onRootNodeClicked}
></Graphics>

{#each Array(numberOfRings) as _, index (index)}
	<Graphics
		{x}
		{y}
		draw={(graphics) => {
			graphics.clear();
			graphics.lineStyle(2, 0x343434);
			graphics.drawCircle(0, 0, $ringSize * (index + 1));
			graphics.endFill();
		}}
	/>
{/each}
