<script lang="ts">
	import { onMount } from 'svelte';
	import type { Week } from '../types/Week';
	import AWeek from '../components/AWeek.svelte';
	const browserLang = navigator.language || navigator.userLanguage;

	const weeks: Week[] = [{
		day: 1,
		dates: [new Date(2024, 0, 4)]
	}, {
		day: 2,
		dates: [new Date(2024, 0, 11), new Date(2024, 0, 12) , new Date(2024, 0, 13)]
	}, 
	{
		day: 3,
		dates: [new Date(2024, 0, 30), new Date(2024, 1, 2), new Date(2024, 1, 3)]
	}]
	onMount(() => {
		// Any onMount logic can go here
	});
</script>

<div>
	<h1>Mes semaines</h1>
	<!-- Services Section -->
	<p>Your browser language is: {browserLang}</p>
	<section id="services" class="py-20 bg-white">
		{#each weeks as week}
			<AWeek week={week} />
		{/each}
	</section>
</div>
