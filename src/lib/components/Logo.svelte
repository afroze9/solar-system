<script lang="ts">
	import { onMount } from 'svelte';
	import { Graphics } from 'svelte-pixi';
	import { cubicInOut, linear } from 'svelte/easing';
	import { tweened, type Tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';

	type LogoNode = {
		id: number;
		x: number;
		y: number;
		color: number;
		alpha: number;
	};

	type LogoEdge = {
		id: number;
		startNodeId: number;
		endNodeId: number;
		alpha: number;
	};

	type LogoVector = {
		x1: number;
		y1: number;
		x2: number;
		y2: number;
	};

	type Alpha = {
		id: 1;
		type: 'node' | 'edge';
		value: Tweened<number>;
	};

	function getVector(edge: LogoEdge): LogoVector {
		const startNode = $nodes.filter((n) => n.id === edge.startNodeId)[0];
		const endNode = $nodes.filter((n) => n.id === edge.endNodeId)[0];

		return {
			x1: $centerX + startNode.x,
			y1: $centerY + startNode.y,
			x2: endNode.x - startNode.x,
			y2: endNode.y - startNode.y
		};
	}

	const nodes = writable<LogoNode[]>([]);
	const edges = writable<LogoEdge[]>([]);
	const centerX = writable<number>(window.innerWidth / 2);
	const centerY = writable<number>(window.innerHeight / 2);

	const nodeAlphas: Alpha[] = [
		{
			id: 1,
			type: 'node',
			value: tweened(0, {
				duration: 500,
				easing: linear
			})
		}
	];

	const nodeAlpha1 = tweened(0, {
		duration: 500,
		easing: linear
	});
	const nodeAlpha2 = tweened(0, {
		delay: 500,
		duration: 500,
		easing: linear
	});
	const nodeAlpha3 = tweened(0, {
		delay: 1000,
		duration: 500,
		easing: linear
	});

	const nodeAlpha4 = tweened(0, {
		delay: 1500,
		duration: 500,
		easing: linear
	});

	const nodeAlpha5 = tweened(0, {
		delay: 2000,
		duration: 500,
		easing: linear
	});
	const nodeAlpha6 = tweened(0, {
		delay: 2500,
		duration: 500,
		easing: linear
	});

	onMount(() => {
		$nodes = [
			{
				id: 1,
				x: 0,
				y: 0,
				color: 0xeb636f,
				alpha: 0
			},
			{
				id: 2,
				x: 150,
				y: 30,
				color: 0xfcce86,
				alpha: 0
			},
			{
				id: 3,
				x: 0,
				y: 150,
				color: 0x91c9d5,
				alpha: 0
			},
			{
				id: 4,
				x: -150,
				y: 80,
				color: 0x4e9ab7,
				alpha: 0
			},
			{
				id: 5,
				x: -150,
				y: -70,
				color: 0x91cad6,
				alpha: 0
			},
			{
				id: 6,
				x: 0,
				y: -130,
				color: 0xf39388,
				alpha: 0
			}
		];

		$edges = [
			{
				id: 1,
				startNodeId: 1,
				endNodeId: 2,
				alpha: 0
			},
			{
				id: 2,
				startNodeId: 1,
				endNodeId: 3,
				alpha: 0
			},
			{
				id: 3,
				startNodeId: 1,
				endNodeId: 5,
				alpha: 0
			},
			{
				id: 4,
				startNodeId: 2,
				endNodeId: 3,
				alpha: 0
			},
			{
				id: 5,
				startNodeId: 2,
				endNodeId: 6,
				alpha: 0
			},
			{
				id: 6,
				startNodeId: 3,
				endNodeId: 4,
				alpha: 0
			},
			{
				id: 7,
				startNodeId: 3,
				endNodeId: 5,
				alpha: 0
			},
			{
				id: 8,
				startNodeId: 4,
				endNodeId: 6,
				alpha: 0
			},
			{
				id: 9,
				startNodeId: 5,
				endNodeId: 6,
				alpha: 0
			}
		];

		const updateData = () => {
			$nodes = $nodes.map((node, index): LogoNode => {
				if (node.id === 1) {
					return {
						...node,
						alpha: $nodeAlpha1
					};
				}

				if (node.id === 2) {
					return {
						...node,
						alpha: $nodeAlpha2
					};
				}

				if (node.id === 3) {
					return {
						...node,
						alpha: $nodeAlpha3
					};
				}
				if (node.id === 4) {
					return {
						...node,
						alpha: $nodeAlpha4
					};
				}
				if (node.id === 5) {
					return {
						...node,
						alpha: $nodeAlpha5
					};
				}
				if (node.id === 6) {
					return {
						...node,
						alpha: $nodeAlpha6
					};
				}

				return node;
			});

			$edges = $edges.map((edge, index): LogoEdge => {
				if (edge.id === 1) {
					return {
						...edge,
						alpha: $nodeAlpha2
					};
				}

				if (edge.id === 2 || edge.id === 4) {
					return {
						...edge,
						alpha: $nodeAlpha3
					};
				}

				if (edge.id === 6) {
					return {
						...edge,
						alpha: $nodeAlpha4
					};
				}

				if (edge.id === 3 || edge.id === 7) {
					return {
						...edge,
						alpha: $nodeAlpha5
					};
				}

				if (edge.id === 5 || edge.id === 8 || edge.id === 9) {
					return {
						...edge,
						alpha: $nodeAlpha6
					};
				}
				return edge;
			});

			requestAnimationFrame(updateData);
		};

		updateData();
	});

	setTimeout(() => {
		nodeAlpha1.set(1);
		nodeAlpha2.set(1);
		nodeAlpha3.set(1);
		nodeAlpha4.set(1);
		nodeAlpha5.set(1);
		nodeAlpha6.set(1);
	}, 500);
</script>

{#if $nodes.length > 0 && $edges.length > 0}
	{#each $edges as edge}
		{@const vector = getVector(edge)}
		<Graphics
			x={vector.x1}
			y={vector.y1}
			draw={(graphics) => {
				graphics.clear();
				graphics.lineStyle(12, 0x675f7a, edge.alpha);
				graphics.lineTo(vector.x2, vector.y2);
			}}
		/>
	{/each}

	{#each $nodes as node}
		<Graphics
			x={window.innerWidth / 2 + node.x}
			y={window.innerHeight / 2 + node.y}
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(node.color, node.alpha);
				graphics.drawCircle(0, 0, 45);
				graphics.endFill();
			}}
		/>
	{/each}
{/if}
