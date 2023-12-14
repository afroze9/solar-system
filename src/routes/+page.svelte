<script lang="ts">
	import AppCanvas from '$lib/components/AppCanvas.svelte';
	import CompanyDetails from '$lib/components/CompanyDetails.svelte';
	let MyAppCanvas = import.meta.env.SSR ? null : AppCanvas;
	import { auth } from '../auth/authService';
	import { isAuthenticated, isLoading, selectedCompany } from '../store';
	let { logout, initClient } = auth;
</script>

<svelte:component this={MyAppCanvas} />
{#if $isAuthenticated}
	<button type="button" class="btn variant-filled login-btn" on:click={logout}>Logout</button>
{/if}

{#if $selectedCompany !== 0}
	<CompanyDetails />
{/if}

<style>
	.login-btn {
		position: fixed;
		z-index: 10;
		right: 10px;
		top: 10px;
	}
</style>
