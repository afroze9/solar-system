<script lang="ts">
	import { writable } from 'svelte/store';
	import {
		rootX,
		rootY,
		selectedCompany,
		selectedProject,
		showActivity,
		showTertiaryRing
	} from '../../store';
	import { colors } from '$lib/helpers';
	import ProjectNode from './ProjectNode.svelte';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import ProjectDetails from './ProjectDetails.svelte';
	import { Graphics, Text } from 'svelte-pixi';
	import companyApi from '../../services/CompanyApi';
	import ApiHelpers, { type ErrorResponse } from '../../services/ApiHelpers';
	import projectApi, { type ProjectResponse } from '../../services/ProjectApi';
	const toastStore = getToastStore();
	const spotColor = 0xc9a36a;
	let projects = writable<Project[]>([]);
	let filteredProjects: Project[] = [];
	let projectNodes = writable<NodeData<Project>[]>([]);
	let scrollAngle = tweened(0, {
		duration: 750,
		easing: cubicOut
	});

	function handleScroll(e: WheelEvent) {
		if ($selectedProject === 0) {
			let oldAngle = $scrollAngle;
			scrollAngle.set(oldAngle + (0.15 * -1 * e.deltaY) / 100);
		}
	}

	function getAngle(index: number): number {
		return -0.3 + $scrollAngle + index * 0.1;
	}

	async function fetchCompany() {
		showActivity.set(true);
		let response = await companyApi.getCompanyById($selectedCompany);

		if (!ApiHelpers.isErrorReponse(response)) {
			let mappedProjects = response.projects.map((p): Project => {
				return {
					id: p.id,
					name: p.name,
					todoCount: p.taskCount,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
			});

			projects.set(mappedProjects);
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
		showActivity.set(false);
	}

	function generateData() {
		fetchCompany().then(() => {
			const mappedNodes = filteredProjects.map((project, index): NodeData<Project> => {
				const angle = getAngle(index);
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
		});
	}

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'projectModal',
		title: 'Add Project',
		response: addProject
	};

	async function addProject(data: ProjectModalData) {
		showActivity.set(true);
		let response = await projectApi.createProject({
			name: data.name,
			companyId: $selectedCompany
		});

		if (!ApiHelpers.isErrorReponse(response)) {
			const newProjectResponse = response as ProjectResponse;
			$projects.push({
				id: newProjectResponse.id,
				name: newProjectResponse.name,
				todoCount: newProjectResponse.todoItems.length,
				color: colors[Math.floor(Math.random() * colors.length)]
			});
		} else {
			toastStore.trigger({
				message: (response as ErrorResponse).message,
				background: 'variant-filled-error'
			});
		}
		showActivity.set(false);
	}

	function onAddProjectClicked() {
		modalStore.trigger(modal);
	}

	function onProjectClicked(projectId: number) {
		selectedProject.set(projectId);
		showTertiaryRing.set(true);
		if ($scrollAngle !== 0) {
			scrollAngle.set(0);
		}
	}

	function onBackButtonClicked() {
		selectedProject.set(0);
		showTertiaryRing.set(false);
	}

	onMount(() => {
		generateData();
		const updateData = () => {
			const mappedNodes = filteredProjects.map((project, index): NodeData<Project> => {
				const baseAngle = getAngle(index);
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
		window.addEventListener('wheel', handleScroll);

		return () => {
			window.removeEventListener('wheel', handleScroll);
		};
	});

	$: filteredProjects =
		$selectedProject === 0 ? $projects : $projects.filter((p) => p.id === $selectedProject);
</script>

{#if $selectedCompany !== 0}
	{#if $selectedProject === 0}
		<button type="button" class="btn variant-filled add-project-btn" on:click={onAddProjectClicked}>
			<i class="fa-solid fa-plus" />
			<span>Add Project</span>
		</button>
	{/if}
	<Text
		x={$rootX + Math.cos(-0.5) * 750}
		y={$rootY + Math.sin(-0.5) * 750}
		anchor={0.5}
		text={'Projects'}
		style={{
			fill: 'white',
			fontSize: '30px'
		}}
	/>
{/if}

{#if $selectedProject !== 0}
	<button type="button" class="btn variant-filled back-btn" on:click={onBackButtonClicked}>
		<i class="fa-solid fa-arrow-left" />
		<span>Back to Projects</span>
	</button>
	<ProjectDetails />
{/if}

{#if $selectedCompany !== 0 && $projectNodes.length > 0}
	{#each $projectNodes as projectNode, index (projectNode.nodeId)}
		<ProjectNode
			x={projectNode.x}
			y={projectNode.y}
			project={projectNode.data}
			{onProjectClicked}
		/>
	{/each}
	{#if $rootX === 0}
		<Graphics
			x={$rootX + Math.cos($scrollAngle + (Math.PI * 1) / 3) * 150}
			y={$rootY + Math.sin($scrollAngle + (Math.PI * 1) / 3) * 150}
			draw={(graphics) => {
				graphics.clear();
				-graphics.beginFill(spotColor);
				graphics.drawCircle(0, 0, 20);
				graphics.endFill();
			}}
		/>
		<Graphics
			x={$rootX + Math.cos($scrollAngle + (Math.PI * 3) / 3) * 150}
			y={$rootY + Math.sin($scrollAngle + (Math.PI * 3) / 3) * 150}
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(spotColor);
				graphics.drawCircle(0, 0, 20);
				graphics.endFill();
			}}
		/>

		<Graphics
			x={$rootX + Math.cos($scrollAngle + (Math.PI * 5) / 3) * 150}
			y={$rootY + Math.sin($scrollAngle + (Math.PI * 5) / 3) * 150}
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(spotColor);
				graphics.drawCircle(0, 0, 20);
				graphics.endFill();
			}}
		/>
	{/if}
{/if}

<style>
	.add-project-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 225px;
	}

	.back-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 10px;
	}
</style>
