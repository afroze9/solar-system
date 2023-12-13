<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { auth } from '../../auth/authService';
	let { login, logout, initClient } = auth;
</script>

<Graphics
	x={window.innerWidth / 6}
	y={window.innerHeight / 6 + 150}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(0xffffff);
		graphics.drawRoundedRect(0, 0, 150, 75, 25);
		graphics.endFill();
	}}
	interactive
	cursor={'pointer'}
	on:click={login}
/>

<Text
	text="Login"
	anchor={0}
	x={window.innerWidth / 6 + 40}
	y={window.innerHeight / 6 + 170}
	style={{
		fill: 'black',
		fontSize: '30px'
	}}
/>
