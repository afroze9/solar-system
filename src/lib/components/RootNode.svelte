<script lang="ts">
	import { Graphics } from 'svelte-pixi';
	import { ringSize, showActivity } from '../../store';
	import { writable } from 'svelte/store';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { onMount } from 'svelte';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 40;
	export let numberOfRings = 0;
	export let showSecondaryRing: boolean = false;
	export let showTertiaryRing: boolean = false;

	let color = writable<number>(0xfccd85);

	// Solar flare properties
	let flareSize = tweened(0, {
		duration: 1000,
		easing: cubicOut
	});
	let opacity = tweened(0.8, {
		duration: 100,
		easing: cubicOut
	});

	// Start a flare effect
	function startFlare() {
		flareSize.set(size); // start size
		opacity.set(0.4);

		setTimeout(() => {
			flareSize.set(0, { duration: 10 }); // Shrink back after a delay
			opacity.set(0, { duration: 10 });
		}, 600); // Delay in milliseconds
	}

	onMount(() => {
		const interval = setInterval(startFlare, 800);
		return () => clearInterval(interval);
	});
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill($color);
		graphics.drawCircle(0, 0, size);
		graphics.endFill();
		$: {
			graphics.beginFill(0xffa500, $opacity); // Orange color, semi-transparent
			graphics.drawCircle(0, 0, $showActivity ? $flareSize : 0);
			graphics.endFill();
		}
	}}
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

{#if showSecondaryRing}
	<Graphics
		{x}
		{y}
		draw={(graphics) => {
			graphics.clear();
			graphics.lineStyle(2, 0x343434);
			graphics.drawCircle(0, 0, $ringSize * 1.5);
			graphics.endFill();
		}}
	/>
{/if}

{#if showTertiaryRing}
	<Graphics
		{x}
		{y}
		draw={(graphics) => {
			graphics.clear();
			graphics.lineStyle(2, 0x343434);
			graphics.drawCircle(0, 0, $ringSize * 2.25);
			graphics.endFill();
		}}
	/>
{/if}
