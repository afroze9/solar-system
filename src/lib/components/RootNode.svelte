<script lang="ts">
	import { companyNames } from '$lib/helpers';
	import { Graphics } from 'svelte-pixi';
	import { companies, rotationEnabled, rootX, rootSize, ringSize, companySize } from '../../store';
	import { companySizeRegular, ringSizeRegular, rootSizeRegular } from '../../constants';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 40;
	export let color: number = 0xffffff;
	export let numberOfRings = 0;

	function rootNodeClicked() {
		let ids = $companies.map((c) => c.id);
		let newId = ids.length === 0 ? 0 : Math.max(...$companies.map((c) => c.id)) + 1;
		let newName = companyNames[newId % companyNames.length];
		let newCompany: Company = {
			id: newId,
			name: newName,
			projects: []
		};

		$companies.push(newCompany);

		$rotationEnabled = true;
		$rootX = window.innerWidth / 2;
		$rootSize = rootSizeRegular;
		$ringSize = ringSizeRegular;
		$companySize = companySizeRegular;
	}
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
	on:click={rootNodeClicked}
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
