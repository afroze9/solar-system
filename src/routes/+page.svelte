<script lang="ts">
	import AppCanvas from '$lib/components/AppCanvas.svelte';
	import CompanyDetails from '$lib/components/CompanyDetails.svelte';
	let MyAppCanvas = import.meta.env.SSR ? null : AppCanvas;
	import { auth } from '../auth/authService';
	import { isAuthenticated, isLoading, selectedCompany, user } from '../store';
	let { logout, initClient } = auth;
</script>

<svelte:component this={MyAppCanvas} />
{#if $isAuthenticated}
	<div class="login-btn">
		<span class="font text-xl mr-2">{$user?.name}</span>
		<button type="button" class="btn variant-filled" on:click={logout}>Logout</button>
	</div>
{/if}

<style>
	.login-btn {
		position: fixed;
		z-index: 10;
		right: 10px;
		top: 10px;
	}
</style>
