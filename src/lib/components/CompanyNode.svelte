<script lang="ts">
	import { Graphics } from 'svelte-pixi';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 20;
	export let color: number;
	export let numberOfRings = 0;
	export let company: Company;
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
></Graphics>

<!-- {#each Array(numberOfRings) as _, index (index)}
	<Graphics
		{x}
		{y}
		draw={(graphics) => {
			graphics.clear();
			graphics.lineStyle(2, 0x343434);
			graphics.drawCircle(0, 0, 200 * (index + 1));
			graphics.endFill();
		}}
	/>
{/each} -->
