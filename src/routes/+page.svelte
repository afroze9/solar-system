<script lang="ts">
	import AppCanvas from '$lib/components/AppCanvas.svelte';
	import { cubicIn } from 'svelte/easing';
	let MyAppCanvas = import.meta.env.SSR ? null : AppCanvas;
	import { auth } from '../auth/authService';
	import { isAuthenticated, rootY, user } from '../store';
	let { logout } = auth;

	function onLogout() {
		rootY.set(10000, {
			easing: cubicIn
		});
		setTimeout(() => {
			logout();
		}, 1000);
	}
</script>

<svelte:component this={MyAppCanvas} />
{#if $isAuthenticated}
	<div class="login-btn">
		<span class="font text-xl mr-2">{$user?.name}</span>
		<button type="button" class="btn variant-filled" on:click={onLogout}>Logout</button>
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
