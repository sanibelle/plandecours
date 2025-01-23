
<script lang="ts">
	import { ClientTelemetry } from '$lib/tracer.js';
    import '../styles/app.css';
	import { onMount } from 'svelte';
    let { children } = $props();

	onMount(async () => {
		// const telemetry = ClientTelemetry.getInstance();
		// await telemetry.start();
		// await telemetry.trackSpan('TEST-ACM', async () => {});
	});
	
</script>

<div class="min-h-screen bg-gray-100">
	<!-- Header -->
	<header class="bg-white shadow-md">
		POC semaines plan de cours
	</header>

	{@render children()}

	<footer class="bg-gray-900 text-white py-8">
		POC semaines plan de cours
	</footer>
</div>
