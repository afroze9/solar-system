<script lang="ts">
	import { writable } from 'svelte/store';
	import { auth } from '../../auth/authService';
	import { isLoading, isTitleVisible } from '../../store';

	let { login } = auth;

	setTimeout(() => {
		$isTitleVisible = true;
	}, 3500);
</script>

{#if $isTitleVisible}
	<div class="title">
		<h1 class="h1">Nexus PM</h1>
		<h3 class="h3">A simple project management app built using the Nexus Framework</h3>
		{#if !$isLoading}
			<button
				type="button"
				class="btn btn-xl variant-filled-primary login-btn mt-5"
				on:click={login}>Login</button
			>{/if}
	</div>
{/if}

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.title {
		position: fixed;
		z-index: 10;
		left: 10vw;
		top: 10vh;
		animation: fadeIn 1s ease-out;
	}
</style>
