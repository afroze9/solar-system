<script lang="ts">
	import { auth } from '../../auth/authService';
	import { isLoading } from '../../store';

	let { login } = auth;
</script>

<div class="title">
	<h1 class="h1">Nexus PM</h1>
	<h3 class="h3">A simple project management app built using the Nexus Framework</h3>
	{#if !$isLoading}
		<button type="button" class="btn btn-xl variant-filled-primary login-btn mt-5" on:click={login}
			>Login</button
		>{/if}
</div>

<style>
	.title {
		position: fixed;
		z-index: 10;
		left: 10vw;
		top: 10vh;
	}
</style>
