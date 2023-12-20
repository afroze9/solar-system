<script lang="ts">
	import '../app.postcss';

	import { Modal, initializeStores, type ModalComponent } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { auth } from '../auth/authService';
	import { onMount } from 'svelte';
	import CompanyModal from '../lib/components/CompanyModal.svelte';
	import ProjectModal from '../lib/components/ProjectModal.svelte';
	import TodoModal from '$lib/components/TodoModal.svelte';

	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	initializeStores();

	let { initClient } = auth;
	onMount(async () => {
		await initClient();
	});

	const modalRegistry: Record<string, ModalComponent> = {
		companyModal: {
			ref: CompanyModal
		},
		projectModal: {
			ref: ProjectModal
		},
		todoModal: {
			ref: TodoModal
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
