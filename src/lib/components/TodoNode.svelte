<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';

	export let x: number;
	export let y: number;
	export let todo: Todo;
	export let onTodoClicked: (todoId: number) => void;
</script>

<Graphics
	{x}
	{y}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(todo.color || 0xffffff);
		graphics.drawCircle(0, 0, 20);
		graphics.endFill();
	}}
	interactive
	cursor="pointer"
	on:click={() => onTodoClicked(todo.id)}
></Graphics>
<Text
	x={x + 25}
	{y}
	anchor={[0, 0.5]}
	text={todo.name}
	style={{
		fill: 'white',
		fontSize: '20px'
	}}
	interactive
	cursor="pointer"
	on:click={() => onTodoClicked(todo.id)}
/>
