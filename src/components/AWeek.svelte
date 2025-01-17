<script lang="ts">
	import type { Week } from '../types/Week';
	import ADate from './ADate.svelte';

	let { week }: { week: Week } = $props();
  
	const displayMonth = (date, index) => {
		if (week.dates.length === 1) return true;
		if (index + 1 === week.dates.length) return true;
		if (week.dates[index + 1].getMonth() !== date.getMonth()) return true;
		return false
	};

  const displayComa = (index) => {
    if (displayMonth(week.dates[index], index))
      return false;
    return week.dates.length > 1 && index < week.dates.length - 1;
  }

  const displayAnd = (index) => {
    return displayMonth(week.dates[index], index) && index < week.dates.length - 1
  }
</script>

<div>
  <p>
    Semaine {week.day}
    {#each week.dates as date, index}
			<ADate {date} displayMonth={displayMonth(date, index)} />
			{#if displayComa(index)}
				-
      {:else if displayAnd(index)}
        et
			{/if}
		{/each}
	</p>
</div>
