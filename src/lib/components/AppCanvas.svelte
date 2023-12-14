<script lang="ts">
	import { Application } from 'svelte-pixi';
	import StarField from './StarField.svelte';
	import SolarSystem from './SolarSystem.svelte';
	import Title from './Title.svelte';
	import { isAuthenticated, isLoading } from '../../store';
</script>

<Application resizeTo={window} antialias={true}>
	<StarField />
	{#if !$isAuthenticated}
		<Title />
	{/if}
	{#if $isAuthenticated}
		<SolarSystem />
	{/if}
</Application>
