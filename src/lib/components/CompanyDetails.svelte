<script lang="ts">
	import { writable } from 'svelte/store';
	import { rootX, rootY, selectedCompany, selectedProject } from '../../store';
	import { getSampleProjects } from '$lib/helpers';
	import ProjectNode from './ProjectNode.svelte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	let scrollDownIntervalId: NodeJS.Timeout | null;
	let scrollUpIntervalId: NodeJS.Timeout | null;
	let projects = writable<Project[]>([]);
	let filteredProjects: Project[] = [];
	let projectNodes = writable<NodeData<Project>[]>([]);
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
		let oldAngle = $scrollAngle;
		scrollAngle.set(oldAngle + 0.15);
	}

	function scrollDown() {
		let oldAngle = $scrollAngle;
		scrollAngle.set(oldAngle - 0.15);
	}

	function startScrollDown() {
		if (scrollDownIntervalId) {
			clearInterval(scrollDownIntervalId);
		}

		scrollDownIntervalId = setInterval(scrollDown, 100);
	}

	function stopScrollDown() {
		if (scrollDownIntervalId) {
			clearInterval(scrollDownIntervalId);
			scrollDownIntervalId = null;
		}
	}

	function startScrollUp() {
		if (scrollUpIntervalId) {
			clearInterval(scrollUpIntervalId);
		}

		scrollUpIntervalId = setInterval(scrollUp, 100);
	}

	function stopScrollUp() {
		if (scrollUpIntervalId) {
			clearInterval(scrollUpIntervalId);
			scrollUpIntervalId = null;
		}
	}

	function addProject() {
		let newProject: Project = {
			id: Math.max(...$projects.map((p) => p.id)) + 1,
			color: 0xff0fff,
			name: 'New Proj',
			todoCount: 10
		};
		$projects.push(newProject);
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
</script>

{#if $selectedCompany !== 0}
	<button
		type="button"
		class="btn variant-filled scroll-up-btn"
		on:pointerover={startScrollUp}
		on:pointerleave={stopScrollUp}>^</button
	>
	<button
		type="button"
		class="btn variant-filled scroll-down-btn"
		on:pointerover={startScrollDown}
		on:pointerleave={stopScrollDown}>v</button
	>

	<button type="button" class="btn variant-filled add-project-btn" on:click={addProject}>
		<i class="fa-solid fa-plus" />
		<span>Add Project</span>
	</button>
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

	.add-project-btn {
		position: absolute;
		z-index: 10;
		bottom: 10px;
		left: 25%;
	}
</style>
