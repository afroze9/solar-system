<script lang="ts">
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	// Form Data
	const formData: CompanyModalData = {
		name: 'Company A'
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) {
			$modalStore[0].response(formData);
		}
		modalStore.close();
	}

	function onClose(): void {
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? 'Company'}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
			<label class="label">
				<span>Name</span>
				<input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer flex justify-end space-x-2">
        <button class="btn variant-filled" on:click={onClose}>Cancel</button>
        <button class="btn variant-filled-primary" on:click={onFormSubmit}>Save</button>
    </footer>
	</div>
{/if}
