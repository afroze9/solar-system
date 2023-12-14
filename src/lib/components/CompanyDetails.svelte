<script lang="ts">
	import { selectedCompany } from '../../store';
</script>

<!-- Project List -->
<!-- Project Row (circle + text) e.g. () Project Name -->
<!-- Scrolls -->

{#if $selectedCompany !== 0}
	<button type="button" class="btn variant-filled scroll-up-btn">^</button>
	<button type="button" class="btn variant-filled scroll-down-btn">v</button>
{/if}

<style>
	.scroll-up-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 50%;
	}

	.scroll-down-btn {
		position: absolute;
		z-index: 10;
		bottom: 10px;
		left: 50%;
	}
</style>
