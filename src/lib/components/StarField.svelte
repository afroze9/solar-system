<script lang="ts">
	import { onMount } from 'svelte';
	import { Sprite } from 'svelte-pixi';
	import * as PIXI from 'pixi.js';

	const count = 1000;
	let stars: Star[] = [];

	function generateStars() {
		for (let i = 0; i < count; i++) {
			stars.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				size: Math.random() * 2 + 1,
				speed: Math.random() * 0.5 + 0.1
			});
		}
	}

	onMount(() => {
		generateStars();
		const updateStars = () => {
			stars = stars.map((star) => {
				star.y += star.speed;

				if (star.y > window.innerHeight) {
					star.y = 0;
				}

				return star;
			});

			requestAnimationFrame(updateStars);
		};

		updateStars();
	});
</script>

{#each stars as { x, y, size } (x)}
	<Sprite
		{x}
		{y}
		texture={PIXI.Texture.from('/star.png')}
		width={size}
		height={size}
		anchor={[0.5, 0.5]}
	/>
{/each}
