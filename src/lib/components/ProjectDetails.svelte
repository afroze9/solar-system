<script lang="ts">
	import { colors, getSampleTodos } from '$lib/helpers';
	import { cubicOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import { ringSize, rootX, rootY, selectedProject, selectedTodo } from '../../store';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import TodoNode from './TodoNode.svelte';

	let scrollDownIntervalId: NodeJS.Timeout | null;
	let scrollUpIntervalId: NodeJS.Timeout | null;
	let todos = writable<Todo[]>([]);
	let filteredTodos: Todo[] = [];
	let todoNodes = writable<NodeData<Todo>[]>([]);
	let scrollAngle = tweened(0, {
		duration: 750,
		easing: cubicOut
	});

	function getAngle(index: number): number {
		return -0.3 + $scrollAngle + index * 0.1;
	}

	function generateData() {
		let sampleTodos = getSampleTodos(10);
		todos.set(sampleTodos);
		console.log($todos);

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

	onMount(() => {
		generateData();
		const updateData = () => {
			console.log(`todos`, $todos);
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
	});

	$: filteredTodos = $selectedTodo === 0 ? $todos : $todos.filter((t) => t.id === $selectedTodo);
	$: {
		console.log($selectedProject);
	}
</script>

{#if $selectedProject !== 0}
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

	<button type="button" class="btn variant-filled add-todo-btn">
		<i class="fa-solid fa-plus" />
		<span>Add Todo</span>
	</button>
{/if}

{#if $selectedProject !== 0 && $todoNodes.length > 0}
	{#each $todoNodes as todoNode, index (todoNode.nodeId)}
		<TodoNode x={todoNode.x} y={todoNode.y} todo={todoNode.data} onTodoClicked={() => {}} />
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

	.add-todo-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 225px;
	}
</style>
