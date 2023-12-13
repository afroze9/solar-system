<script lang="ts">
	import { Application } from 'svelte-pixi';
	import StarField from './StarField.svelte';
	import SolarSystem from './SolarSystem.svelte';
	import Title from './Title.svelte';
	import { isAuthenticated, isLoading } from '../../store';
	import LoginButton from './LoginButton.svelte';
	import LogoutButton from './LogoutButton.svelte';
</script>

<Application resizeTo={window} antialias={true}>
	<StarField />
	{#if !$isAuthenticated}
		<Title />
		{#if !$isLoading}
			<LoginButton />
		{/if}
	{/if}
	{#if $isAuthenticated}
		<SolarSystem />
		<LogoutButton />
	{/if}
</Application>
