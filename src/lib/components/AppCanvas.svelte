<script lang="ts">
	import { Application } from 'svelte-pixi';
	import StarField from './StarField.svelte';
	import SolarSystem from './SolarSystem.svelte';
</script>

<Application resizeTo={window} antialias={true}>
	<!-- <Title /> -->
	<StarField />
	<SolarSystem />
</Application>
