<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { ringSize, selectedCompany } from '../../store';
	import { writable } from 'svelte/store';

	export let x: number = 0;
	export let y: number = 0;
	export let size: number = 40;
	export let numberOfRings = 0;
	export let onRootNodeClicked: () => void;
	export let showSecondaryRing: boolean = false;

	let color = writable<number>(0xfccd85);
	let isHovered = writable<boolean>(false);
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill($color);
		graphics.drawCircle(0, 0, size);
		graphics.endFill();
	}}
	interactive
	cursor="pointer"
	on:click={onRootNodeClicked}
	on:pointerover={() => {
		color.set(0xc9a36a);
		isHovered.set(true);
	}}
	on:pointerout={() => {
		color.set(0xfccd85);
		isHovered.set(false);
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

{#if $isHovered}
	{#if $selectedCompany === 0}
		<Text text={'+'} {x} {y} anchor={0.5} style={{ fill: 'black', fontSize: '50px' }} />
	{:else}
		<Text text={'<<'} x={x + 50} {y} anchor={0.5} style={{ fill: 'black', fontSize: '50px' }} />
	{/if}
{/if}
