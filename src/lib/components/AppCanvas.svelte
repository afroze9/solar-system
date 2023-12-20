<script lang="ts">
	import { Application } from 'svelte-pixi';
	import StarField from './StarField.svelte';
	import SolarSystem from './SolarSystem.svelte';
	import Title from './Title.svelte';
	import { isAuthenticated, isLoading, isStartAnimationDone } from '../../store';
	import Logo from './Logo.svelte';
</script>

<Application resizeTo={window} antialias={true}>
	<StarField />
	{#if !$isAuthenticated || !$isStartAnimationDone}
		<Title />
		<Logo />
	{/if}
	{#if $isAuthenticated && $isStartAnimationDone}
		<SolarSystem />
	{/if}
</Application>
