<script lang="ts">
	import AppCanvas from '$lib/components/AppCanvas.svelte';
	let MyAppCanvas = import.meta.env.SSR ? null : AppCanvas;
</script>

<svelte:component this={MyAppCanvas} />
