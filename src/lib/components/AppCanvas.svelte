<script lang="ts">
	import { Application } from 'svelte-pixi';
	import Title from './Title.svelte';
	import StarField from './StarField.svelte';
	import SolarSystem from './SolarSystem.svelte';
	import { companies } from '$lib/helpers';
</script>

<Application resizeTo={window} antialias={true}>
	<!-- <Title /> -->
	<StarField />
	<SolarSystem {companies} />
</Application>
