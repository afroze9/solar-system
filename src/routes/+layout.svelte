<script lang="ts">
	import '../app.postcss';

	import { Modal, initializeStores, type ModalComponent } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { auth } from '../auth/authService';
	import { onMount } from 'svelte';
	import CompanyModal from '../lib/components/CompanyModal.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();

	let { initClient } = auth;
	onMount(async () => {
		await initClient();
	});

	const modalRegistry: Record<string, ModalComponent> = {
		companyModal: {
			ref: CompanyModal
		}
	};
</script>

<svelte:head>
	<title>Nexus Project Management</title>
</svelte:head>

<slot />

<div>
	<Modal components={modalRegistry} />
</div>
