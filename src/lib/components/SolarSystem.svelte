<script lang="ts">
	import RootNode from './RootNode.svelte';
	import CompanyNode from './CompanyNode.svelte';
	import { onMount } from 'svelte';
	import { colors } from '$lib/helpers';
	import { getModalStore, getToastStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import { Text } from 'svelte-pixi';
	import {
		companies,
		rotationEnabled,
		rootX,
		rootY,
		ringSize,
		rootSize,
		companySize,
		selectedCompany,
		showSecondaryRing,
		showTertiaryRing,
		selectedProject
	} from '../../store';
	import { writable } from 'svelte/store';
	import {
		companySizeLarge,
		companySizeRegular,
		ringSizeLarge,
		ringSizeRegular,
		rootSizeLarge,
		rootSizeRegular
	} from '../../constants';
	import CompanyDetails from './CompanyDetails.svelte';
	import companyApi, { type CompanyResponse } from '../../services/CompanyApi';
	import ApiHelpers, { type ErrorResponse } from '../../services/ApiHelpers';

	let filteredCompanies: Company[] = [];
	let companyNodes = writable<CompanyNodeData[]>([]);
	let previousNodeCount = writable<number>(0);
	let numberOfRings = writable<number>(0);

	const toastStore = getToastStore();
	const modalStore = getModalStore();

	async function addCompany(data: CompanyModalData) {
		let response = await companyApi.createCompany({
			name: data.name,
			tags: ['companytag1', 'companytag2']
		});
		if (!ApiHelpers.isErrorReponse(response)) {
			const newCompanyResponse = response as CompanyResponse;
			$companies.push({
				id: newCompanyResponse.id,
				name: newCompanyResponse.name,
				projectCount: newCompanyResponse.projects.length,
				color: colors[Math.floor(Math.random() * colors.length)]
			});
		} else {
			toastStore.trigger({
				message: (response as ErrorResponse).message,
				background: 'variant-filled-error'
			});
		}

		rootX.set(window.innerWidth / 2);
		rotationEnabled.set(true);

		rootSize.set(rootSizeRegular);
		ringSize.set(ringSizeRegular);
		companySize.set(companySizeRegular);
	}

	const modal: ModalSettings = {
		type: 'component',
		component: 'companyModal',
		title: 'Add Company',
		response: addCompany
	};

	function onBackButtonClicked() {
		$selectedCompany = 0;
		rotationEnabled.set(true);
		rootX.set(window.innerWidth / 2);
		rootSize.set(rootSizeRegular);
		ringSize.set(ringSizeRegular);
		companySize.set(companySizeRegular);
		showSecondaryRing.set(false);
	}

	function onCompanyClicked(companyId: number) {
		selectedCompany.set(companyId);
		rotationEnabled.set(false);
		rootX.set(0);
		rootSize.set(rootSizeLarge);
		ringSize.set(ringSizeLarge);
		companySize.set(companySizeLarge);
		showSecondaryRing.set(true);
	}

	function getRingNumber(index: number): number {
		if (index < 3) return 1;
		if (index < 10) return 2;
		return 3;
	}

	function getRingDistance(index: number): number {
		const ringNumber = getRingNumber(index);
		return ringNumber * $ringSize;
	}

	function getAngle(index: number, total: number): number {
		const ringNumber = getRingNumber(index);
		if (ringNumber === 1) {
			const min = Math.min(total, 3);
			return ((Math.PI * 2) / min) * (index + 1);
		}

		if (ringNumber === 2) {
			const min = Math.min(total - 3, 7);
			return ((Math.PI * 2) / min) * (index + 1);
		}

		const min = total - 10;
		return ((Math.PI * 2) / min) * (index + 1);
	}

	function getRingSpeed(index: number): number {
		if (!$rotationEnabled) {
			return 0;
		}
		const ringNumber = getRingNumber(index);
		return ringNumber * 0.001;
	}

	async function fetchCompanies() {
		let response = await companyApi.getCompanies();
		if (!ApiHelpers.isErrorReponse(response)) {
			let mappedCompanies = response.map((c): Company => {
				return {
					id: c.id,
					name: c.name,
					projectCount: c.projectCount,
					color: colors[Math.floor(Math.random() * colors.length)]
				};
			});
			companies.set(mappedCompanies);
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
	}

	function generateData() {
		fetchCompanies().then(() => {
			$companyNodes = filteredCompanies.map((company, index): CompanyNodeData => {
				const angle = getAngle(index, $companies.length);
				return {
					nodeId: `c${company.id}`,
					angle: angle,
					x: $rootX + Math.cos(angle) * getRingDistance(index),
					y: $rootY + Math.sin(angle) * getRingDistance(index),
					color: company.color,
					company: company
				};
			});
		});
	}

	onMount(() => {
		$rootX = window.innerWidth / 2;
		$rootY = window.innerHeight / 2;
		generateData();

		const updateData = () => {
			$companyNodes = filteredCompanies.map((company, index) => {
				const existingNodes: CompanyNodeData[] = $companyNodes.filter(
					(c) => c.company.id === company.id
				);

				const previousAngle: number = existingNodes.length > 0 ? existingNodes[0].angle : 0;
				const baseAngle = getAngle(index, filteredCompanies.length);
				let newAngle = 0;

				if ($previousNodeCount !== filteredCompanies.length) {
					newAngle = baseAngle;
				} else {
					newAngle = (existingNodes.length === 0 ? baseAngle : previousAngle) + getRingSpeed(index);
				}

				return {
					nodeId: `c${company.id}`,
					angle: newAngle,
					x: $rootX + Math.cos(newAngle) * getRingDistance(index),
					y: $rootY + Math.sin(newAngle) * getRingDistance(index),
					color: company.color,
					company: company
				};
			});

			$previousNodeCount = $companyNodes.length;
			$numberOfRings = filteredCompanies.length <= 3 ? 1 : filteredCompanies.length <= 10 ? 2 : 3;

			requestAnimationFrame(updateData);
		};

		updateData();
	});
	$: filteredCompanies =
		$selectedCompany === 0 ? $companies : $companies.filter((c) => c.id === $selectedCompany);
</script>

<RootNode
	x={$rootX}
	y={$rootY}
	size={$rootSize}
	numberOfRings={$numberOfRings}
	showSecondaryRing={$showSecondaryRing}
	showTertiaryRing={$showTertiaryRing}
/>

{#each $companyNodes as companyNode, index (companyNode.nodeId)}
	<CompanyNode
		x={companyNode.x}
		y={companyNode.y}
		company={companyNode.company}
		color={companyNode.color}
		{onCompanyClicked}
	/>
{/each}

{#if $selectedCompany !== 0}
	<CompanyDetails />
	{#if $selectedProject === 0}
		<button type="button" class="btn variant-filled back-btn" on:click={onBackButtonClicked}>
			<i class="fa-solid fa-arrow-left" />
			<span>Back to Companies</span>
		</button>
	{/if}
{/if}

{#if $selectedCompany === 0}
	<Text
		x={$rootX}
		y={$rootY}
		anchor={0.5}
		text={'Companies'}
		style={{
			fill: 'white',
			fontSize: '30px'
		}}
	/>
	<button
		type="button"
		class="btn variant-filled add-company-btn"
		on:click={() => modalStore.trigger(modal)}
	>
		<i class="fa-solid fa-plus" />
		<span>Add Company</span>
	</button>
{/if}

<style>
	.back-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 10px;
	}

	.add-company-btn {
		position: absolute;
		z-index: 10;
		top: 10px;
		left: 225px;
	}
</style>
