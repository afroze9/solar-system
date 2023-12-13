<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { auth } from '../../auth/authService';
	let { logout, initClient } = auth;
</script>

<Graphics
	x={window.innerWidth - 175}
	y={20}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(0xffffff);
		graphics.drawRoundedRect(0, 0, 150, 75, 25);
		graphics.endFill();
	}}
	interactive
	cursor={'pointer'}
	on:click={logout}
/>

<Text
	text="Logout"
	anchor={0}
	x={window.innerWidth - 175 + 30}
	y={40}
	style={{
		fill: 'black',
		fontSize: '30px'
	}}
/>
