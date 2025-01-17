
<script lang="ts">
    import '../styles/app.css';
    let { children } = $props();
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
