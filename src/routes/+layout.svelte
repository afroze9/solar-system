<script lang="ts">
	import '../app.postcss';

	import { initializeStores } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { auth } from '../auth/authService';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let { login, logout, initClient } = auth;
	onMount(async () => {
		await initClient();
	});
</script>

<svelte:head>
	<title>Nexus Project Management</title>
</svelte:head>

<slot />
