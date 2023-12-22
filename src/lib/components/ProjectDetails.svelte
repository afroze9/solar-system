<script lang="ts">
	import { colors, getSampleTodos } from '$lib/helpers';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { ringSize, rootX, rootY, selectedProject, selectedTodo, showActivity } from '../../store';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import TodoNode from './TodoNode.svelte';
	import { Graphics, Text } from 'svelte-pixi';
	import projectApi, { type TodoItem } from '../../services/ProjectApi';
	import ApiHelpers, { type ErrorResponse } from '../../services/ApiHelpers';
	import taskApi from '../../services/TaskApi';

	const toastStore = getToastStore();
	const spotColor = 0xc9a36a;

	let todos = writable<Todo[]>([]);
	let filteredTodos: Todo[] = [];
	let todoNodes = writable<NodeData<Todo>[]>([]);
	let scrollAngle = tweened(0, {
		duration: 750,
		easing: cubicOut
	});

	function handleScroll(e: WheelEvent) {
		if ($selectedProject !== 0) {
			let oldAngle = $scrollAngle;
			scrollAngle.set(oldAngle + (0.15 * -1 * e.deltaY) / 100);
		}
	}

	function getAngle(index: number): number {
		return -0.3 + $scrollAngle + index * 0.1;
	}

	async function fetchProject() {
		showActivity.set(true);
		let response = await projectApi.getProjectById($selectedProject);

		if (!ApiHelpers.isErrorReponse(response)) {
			let mappedTodos = response.todoItems.map((t): Todo => {
				return {
					id: t.id,
					name: t.title,
					description: t.description,
					isComplete: t.isCompleted,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
			});

			todos.set(mappedTodos);
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
		showActivity.set(false);
	}

	function generateData() {
		fetchProject().then(() => {
			const mappedNodes = filteredTodos.map((todo, index): NodeData<Todo> => {
				const angle = getAngle(index);
				const mappedNode = {
					nodeId: `p${todo.id}`,
					angle: angle,
					x: $rootX + Math.cos(angle) * $ringSize * 2.25,
					y: $rootY + Math.sin(angle) * $ringSize * 2.25,
					color: todo.color,
					data: todo
				};
				return mappedNode;
			});
			todoNodes.set(mappedNodes);
		});
	}

	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'todoModal',
		title: 'Add Todo',
		response: addTodo
	};

	async function addTodo(data: TodoModalData) {
		showActivity.set(true);
		let response = await taskApi.createTask($selectedProject, {
			title: data.name,
			description: 'Test Task Description'
		});

		if (!ApiHelpers.isErrorReponse(response)) {
			const newTodoResponse = response as TodoItem;
			$todos.push({
				id: newTodoResponse.id,
				name: newTodoResponse.title,
				description: newTodoResponse.description,
				isComplete: newTodoResponse.isCompleted,
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

	function onAddTodoClicked() {
		modalStore.trigger(modal);
	}

	async function onTodoClicked(todoId: number) {
		showActivity.set(true);
		let todoToUpdate = $todos.filter((t) => t.id === todoId);
		if (todoToUpdate === null || todoToUpdate.length === 0) {
			return;
		}

		let updatedTodo: Todo = {
			...todoToUpdate[0],
			isComplete: !todoToUpdate[0].isComplete
		};

		let response = await taskApi.updateTodo(todoId, {
			isCompleted: updatedTodo.isComplete,
			assignedToId: ''
		});

		if (!ApiHelpers.isErrorReponse(response)) {
			const updatedTodoList = $todos.map((t) => {
				if (t.id === todoId) {
					return updatedTodo;
				}
				return t;
			});

			todos.set(updatedTodoList);
		} else {
			toastStore.trigger({
				message: (response as ErrorResponse).message,
				background: 'variant-filled-error'
			});
		}
		showActivity.set(false);
	}

	onMount(() => {
		generateData();
		const updateData = () => {
			const mappedNodes = filteredTodos.map((todo, index): NodeData<Todo> => {
				const baseAngle = getAngle(index);
				const mappedNode = {
					nodeId: `p${todo.id}`,
					angle: baseAngle,
					x: $rootX + Math.cos(baseAngle) * $ringSize * 2.25,
					y: $rootY + Math.sin(baseAngle) * $ringSize * 2.25,
					color: todo.color,
					data: todo
				};
				return mappedNode;
			});
			todoNodes.set(mappedNodes);
			requestAnimationFrame(updateData);
		};

		updateData();
		window.addEventListener('wheel', handleScroll);

		return () => {
			window.removeEventListener('wheel', handleScroll);
		};
	});

	$: filteredTodos = $selectedTodo === 0 ? $todos : $todos.filter((t) => t.id === $selectedTodo);
</script>

{#if $selectedProject !== 0}
	<button type="button" class="btn variant-filled add-todo-btn" on:click={onAddTodoClicked}>
		<i class="fa-solid fa-plus" />
		<span>Add Todo</span>
	</button>
	<Text
		x={$rootX + Math.cos(-0.4) * $ringSize * 2.2}
		y={$rootY + Math.sin(-0.4) * $ringSize * 2.2}
		text={'Todos'}
		style={{
			fill: 'white',
			fontSize: '30px'
		}}
	/>
{/if}

{#if $selectedProject !== 0 && $todoNodes.length > 0}
	{#each $todoNodes as todoNode, index (todoNode.nodeId)}
		<TodoNode x={todoNode.x} y={todoNode.y} todo={todoNode.data} {onTodoClicked} />
	{/each}
	<Graphics
		x={$rootX + Math.cos($scrollAngle + (Math.PI * 2) / 3) * 250}
		y={$rootY + Math.sin($scrollAngle + (Math.PI * 2) / 3) * 250}
		draw={(graphics) => {
			graphics.clear();
			graphics.beginFill(spotColor);
			graphics.drawCircle(0, 0, 20);
			graphics.endFill();
		}}
	/>
	<Graphics
		x={$rootX + Math.cos($scrollAngle + (Math.PI * 4) / 3) * 250}
		y={$rootY + Math.sin($scrollAngle + (Math.PI * 4) / 3) * 250}
		draw={(graphics) => {
			graphics.clear();
			graphics.beginFill(spotColor);
			graphics.drawCircle(0, 0, 20);
			graphics.endFill();
		}}
	/>

	<Graphics
		x={$rootX + Math.cos($scrollAngle) * 250}
		y={$rootY + Math.sin($scrollAngle) * 250}
		draw={(graphics) => {
			graphics.clear();
			graphics.beginFill(spotColor);
			graphics.drawCircle(0, 0, 20);
			graphics.endFill();
		}}
	/>
{/if}

<style>
	.add-todo-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 225px;
	}
</style>
