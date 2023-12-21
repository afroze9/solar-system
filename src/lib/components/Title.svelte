<script lang="ts">
	import { writable } from 'svelte/store';
	import { auth } from '../../auth/authService';
	import { isAuthenticated, isLoading, isStartAnimationDone, isTitleVisible } from '../../store';
	import { animationDuration } from '../../constants';

	let { login } = auth;

	setTimeout(
		() => {
			$isTitleVisible = true;
		},
		animationDuration * 6 + 500
	);

	setTimeout(
		() => {
			$isStartAnimationDone = true;
		},
		animationDuration * 7 + 1000
	);
</script>

{#if $isTitleVisible}
	<div class="title">
		<h1 class="h1">Nexus PM</h1>
		<h3 class="h3">A simple project management app built using the Nexus Framework</h3>
		{#if !$isLoading && !$isAuthenticated}
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
