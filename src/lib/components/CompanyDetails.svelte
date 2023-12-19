<script lang="ts">
	import { writable } from 'svelte/store';
	import { rootX, rootY, selectedCompany, selectedProject } from '../../store';
	import { getSampleProjects } from '$lib/helpers';
	import ProjectNode from './ProjectNode.svelte';
	import { onMount } from 'svelte';
	import { Text } from 'svelte-pixi';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const listSize = 7;
	let projects = writable<Project[]>([]);
	let filteredProjects: Project[] = [];
	let projectNodes = writable<NodeData<Project>[]>([]);
	let scrollUpEnabled = writable<boolean>(false);
	let scrollDownEnabled = writable<boolean>(false);
	let firstProjectInView = writable<number>(0);
	let scrollAngle = tweened(0, {
		duration: 750,
		easing: cubicOut
	});

	function getAngle(index: number, total: number): number {
		return -0.3 + $scrollAngle + index * 0.1;
	}

	function generateData() {
		let sampleProjects = getSampleProjects(10);
		projects.set(sampleProjects);

		const mappedNodes = filteredProjects.map((project, index): NodeData<Project> => {
			const angle = getAngle(index, $projects.length);
			const mappedNode = {
				nodeId: `p${project.id}`,
				angle: angle,
				x: $rootX + Math.cos(angle) * 750,
				y: $rootY + Math.sin(angle) * 750,
				color: project.color,
				data: project
			};
			return mappedNode;
		});
		projectNodes.set(mappedNodes);
	}

	function scrollUp() {
		$firstProjectInView--;
		let oldAngle = $scrollAngle;
		scrollAngle.set(oldAngle + 0.15);
	}

	function scrollDown() {
		$firstProjectInView++;
		let oldAngle = $scrollAngle;
		scrollAngle.set(oldAngle - 0.15);
	}

	onMount(() => {
		generateData();
		const updateData = () => {
			const mappedNodes = filteredProjects.map((project, index): NodeData<Project> => {
				const baseAngle = getAngle(index, $projects.length);
				const mappedNode = {
					nodeId: `p${project.id}`,
					angle: baseAngle,
					x: $rootX + Math.cos(baseAngle) * 750,
					y: $rootY + Math.sin(baseAngle) * 750,
					color: project.color,
					data: project
				};
				return mappedNode;
			});
			projectNodes.set(mappedNodes);
			requestAnimationFrame(updateData);
		};

		updateData();
	});

	$: filteredProjects =
		$selectedProject === 0 ? $projects : $projects.filter((p) => p.id === $selectedProject);
	$: $scrollDownEnabled = $firstProjectInView + filteredProjects.length >= listSize;
	$: $scrollUpEnabled = $firstProjectInView > 0;
</script>

<!-- Project List -->
<!-- Project Row (circle + text) e.g. () Project Name -->
<!-- Scrolls -->

{#if $selectedCompany !== 0}
	<button
		type="button"
		class="btn variant-filled scroll-up-btn"
		disabled={!$scrollUpEnabled}
		on:click={scrollUp}>^</button
	>
	<button
		type="button"
		class="btn variant-filled scroll-down-btn"
		disabled={!$scrollDownEnabled}
		on:click={scrollDown}>v</button
	>
{/if}

{#if $selectedCompany !== 0 && $projectNodes.length > 0}
	{#each $projectNodes as projectNode, index (projectNode.nodeId)}
		<ProjectNode x={projectNode.x} y={projectNode.y} project={projectNode.data} />
	{/each}
{/if}

<style>
	.scroll-up-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 50%;
	}

	.scroll-down-btn {
		position: absolute;
		z-index: 10;
		bottom: 10px;
		left: 50%;
	}
</style>
