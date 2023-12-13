<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
</script>

<Text
	text="Nexus PM"
	anchor={0}
	x={window.innerWidth / 6}
	y={window.innerHeight / 6}
	style={{
		fill: 'white',
		fontSize: '50px'
	}}
/>

<Text
	text="A simple project management app built using the Nexus Framework"
	anchor={0}
	x={window.innerWidth / 6}
	y={window.innerHeight / 6 + 75}
	style={{
		fill: 'white',
		fontSize: '30px'
	}}
/>
