<script lang="ts">
	import { Graphics, Text } from 'svelte-pixi';
	import { isCompanyModalVisible, companyModalXPos } from '../../store';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { Button } from '@pixi/ui';

	const button = new Button();
	button.onHover.connect(() => console.log('hmm'));
</script>

<Graphics
	x={$companyModalXPos}
	y={0}
	draw={(graphics) => {
		graphics.clear();
		graphics.beginFill(0x90c8d4, 0.75);
		graphics.drawRoundedRect(
			0,
			+150,
			(window.innerWidth * 1) / 3 - 20,
			window.innerHeight - 170,
			20
		);
		graphics.endFill();
	}}
/>
