<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { companies, rotationEnabled, rootX, rootSize, ringSize, companySize } from '../../store';
	import { companySizeLarge, ringSizeLarge, rootSizeLarge } from '../../constants';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 30;
	export let color: number;
	export let company: Company;

	function onCompanyClicked() {
		$companies = $companies.filter((c) => c.id === company.id);
		$rotationEnabled = false;
		$rootX = 0;
		$rootSize = rootSizeLarge;
		$ringSize = ringSizeLarge;
		$companySize = companySizeLarge;
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
	on:click={onCompanyClicked}
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
	on:click={onCompanyClicked}
	cursor="pointer"
/>
