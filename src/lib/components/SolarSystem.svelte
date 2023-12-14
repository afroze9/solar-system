<script lang="ts">
	import RootNode from './RootNode.svelte';
	import CompanyNode from './CompanyNode.svelte';
	import { onMount } from 'svelte';
	import { colors } from '$lib/helpers';
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import {
		companies,
		rotationEnabled,
		rootX,
		rootY,
		ringSize,
		rootSize,
		companySize
	} from '../../store';
	import { writable } from 'svelte/store';
	import { companySizeLarge, ringSizeLarge, rootSizeLarge } from '../../constants';

	let companyNodes = writable<CompanyNodeData[]>([]);
	let previousNodeCount = writable<number>(0);
	let numberOfRings = writable<number>(0);
	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		component: 'companyModal',
		title: 'Add Company',
		response: (data: CompanyModalData) => {
			console.log(data);
		}
	};

	function onRootNodeClicked() {
		modalStore.trigger(modal);
		// $isCompanyModalVisible = !$isCompanyModalVisible;
		// if ($isCompanyModalVisible) {
		// 	$companyModalXPos = (window.innerWidth * 2) / 3;
		// } else {
		// 	$companyModalXPos = 3000;
		// }
		// let ids = $companies.map((c) => c.id);
		// let newId = ids.length === 0 ? 0 : Math.max(...$companies.map((c) => c.id)) + 1;
		// let newName = companyNames[newId % companyNames.length];
		// let newCompany: Company = {
		// 	id: newId,
		// 	name: newName,
		// 	projects: getSampleProjects(Math.floor(Math.random() * 20))
		// };
		// $companies.push(newCompany);

		// $rotationEnabled = true;
		// $rootX = window.innerWidth / 2;
		// $rootSize = rootSizeRegular;
		// $ringSize = ringSizeRegular;
		// $companySize = companySizeRegular;
	}

	function onCompanyClicked(companyId: number) {
		$companies = $companies.filter((c) => c.id === companyId);
		$rotationEnabled = false;
		$rootX = 0;
		$rootSize = rootSizeLarge;
		$ringSize = ringSizeLarge;
		$companySize = companySizeLarge;
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

	function generateData() {
		$companyNodes = $companies.map((company, index): CompanyNodeData => {
			const angle = getAngle(index, $companies.length);
			const color = colors[Math.floor(Math.random() * colors.length)];
			return {
				nodeId: `c${company.id}`,
				angle: angle,
				x: $rootX + Math.cos(angle) * getRingDistance(index),
				y: $rootY + Math.sin(angle) * getRingDistance(index),
				color: color,
				company: company
			};
		});
	}

	onMount(() => {
		$rootX = window.innerWidth / 2;
		$rootY = window.innerHeight / 2;
		generateData();

		const updateData = () => {
			$companyNodes = $companies.map((company, index) => {
				const existingNodes: CompanyNodeData[] = $companyNodes.filter(
					(c) => c.company.id === company.id
				);

				const previousAngle: number = existingNodes.length > 0 ? existingNodes[0].angle : 0;
				const color: number =
					existingNodes.length > 0
						? existingNodes[0].color
						: colors[Math.floor(Math.random() * colors.length)];

				const baseAngle = getAngle(index, $companies.length);
				let newAngle = 0;

				if ($previousNodeCount !== $companies.length) {
					newAngle = baseAngle;
				} else {
					newAngle = (existingNodes.length === 0 ? baseAngle : previousAngle) + getRingSpeed(index);
				}

				return {
					nodeId: `c${company.id}`,
					angle: newAngle,
					x: $rootX + Math.cos(newAngle) * getRingDistance(index),
					y: $rootY + Math.sin(newAngle) * getRingDistance(index),
					color: color,
					company: company
				};
			});

			$previousNodeCount = $companyNodes.length;
			$numberOfRings = $companies.length <= 3 ? 1 : $companies.length <= 10 ? 2 : 3;

			requestAnimationFrame(updateData);
		};

		updateData();
	});
</script>

<RootNode
	x={$rootX}
	y={$rootY}
	color={0xfccd85}
	size={$rootSize}
	numberOfRings={$numberOfRings}
	{onRootNodeClicked}
/>

{#each $companyNodes as companyNode, index (companyNode.nodeId)}
	<CompanyNode
		x={companyNode.x}
		y={companyNode.y}
		company={companyNode.company}
		color={companyNode.color}
		size={$companySize}
		{onCompanyClicked}
	/>
{/each}
