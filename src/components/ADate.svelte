<script lang="ts">
	type Props = {
		date: Date;
		displayMonth: boolean;
	};
	let { date, displayMonth }: Props = $props();
</script>

<span>
	{#if displayMonth}
		{date.toLocaleDateString(navigator.language, { day: 'numeric', month: 'long' })}
	{:else}
		{date.toLocaleDateString(navigator.language, { day: 'numeric' })}
	{/if}
</span>
