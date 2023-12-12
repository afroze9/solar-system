<script lang="ts">
	import { Graphics, onTick } from 'svelte-pixi';
	import RootNode from './RootNode.svelte';
	import CompanyNode from './CompanyNode.svelte';
	import { onMount } from 'svelte';
	import { colors } from '$lib/helpers';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const hx = tweened(window.innerWidth / 2, {
		duration: 2500,
		easing: cubicOut
	});

	export let companies: Company[] = [];

	const distance = 200;
	function getRingNumber(index: number): number {
		if (index < 3) return 1;
		if (index < 10) return 2;
		return 3;
	}

	function getRingDistance(index: number): number {
		const ringNumber = getRingNumber(index);
		return ringNumber * distance;
	}

	function getAngle(index: number, total: number): number {
		const ringNumber = getRingNumber(index);
		if (ringNumber === 1) {
			const min = Math.min(total, 3);
			return ((Math.PI * 2) / min) * (index + 1);
		}

		if (ringNumber === 2) {
			const min = Math.min(total - 3, 7);
			return ((Math.PI * 2) / min) * (index + 1);
		}

		const min = total - 10 < 10 ? total - 10 : total;
		return ((Math.PI * 2) / min) * (index + 1);
	}

	function getRingSpeed(index: number): number {
		const ringNumber = getRingNumber(index);
		return ringNumber * 0.001;
	}

	let rootX = window.innerWidth / 2;
	let rootY = window.innerHeight / 2;

	let companyNodes: CompanyNodeData[] =
		companies.length === 0
			? []
			: companies.map((company, index): CompanyNodeData => {
					const angle = getAngle(index, companies.length);
					const color = colors[Math.floor(Math.random() * colors.length)];
					return {
						nodeId: `c${company.id}`,
						angle: angle,
						x: $hx + Math.cos(angle) * getRingDistance(index),
						y: rootY + Math.sin(angle) * getRingDistance(index),
						color: color,
						company: company
					};
				});

	function generateData() {}

	let numberOfRings = companies.length <= 3 ? 1 : companies.length <= 10 ? 2 : 3;

	onMount(() => {
		generateData();
		const updateData = () => {
			companyNodes = companyNodes.map((companyNode, index) => {
				let newAngle = (companyNode.angle += getRingSpeed(index));
				companyNode.angle = newAngle;
				companyNode.x = $hx + Math.cos(newAngle) * getRingDistance(index);
				companyNode.y = rootY + Math.sin(newAngle) * getRingDistance(index);

				return companyNode;
			});
			requestAnimationFrame(updateData);
		};
		updateData();
	});

	setTimeout(() => {
		$hx = 0;
	}, 5000);
</script>

<RootNode x={$hx} y={rootY} color={0xfccd85} size={60} {numberOfRings} />

{#each companyNodes as companyNode, index (companyNode.nodeId)}
	<CompanyNode
		x={companyNode.x}
		y={companyNode.y}
		company={companyNode.company}
		color={companyNode.color}
	/>
{/each}
