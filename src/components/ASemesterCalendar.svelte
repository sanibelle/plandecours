<script lang="ts">
	import { Calendar } from '@fullcalendar/core';
	import multiMonthPlugin from '@fullcalendar/multimonth';
	import interactionPlugin from '@fullcalendar/interaction';
	import { onMount } from 'svelte';
	import { SemesterEnum } from '../enum/SemesterEnum.js';
	import frLocale from '@fullcalendar/core/locales/fr';
	type Props = {
		duration: number;
		semester: SemesterEnum;
		year: number;
	};
	let { duration, semester, year }: Props = $props();
	let calendarEl: HTMLElement | null = null;
	const month = semester === SemesterEnum.Winter ? 0 : 7;

	let events = $state([
		// prevoir quand on va dragger un event de mettre à jour le numéro selon le jour
		{
			id: 'a',
			title: '1 - jour 1',
			start: new Date('2025-01-01'),
			extendedProps: {
				type: ''
			}
		},
		{
			id: 'a',
			title: '2 - jour 1',
			start: new Date('2025-01-08'),
			extendedProps: {
				type: ''
			}
		},
		{
			id: 'b',
			title: 'Semaine detude',
			start: new Date('2025-01-20'),
			end: new Date('2025-01-25'),
			editabe: false,
			extendedProps: {
				type: 'Semaine detude'
			}
		}
	]);

	new Date(year, month, 1);
	onMount(async () => {
		if (calendarEl) {
			const calendar = new Calendar(calendarEl, {
				plugins: [multiMonthPlugin, interactionPlugin],
				editable: true,
				initialView: 'multiMonthFourMonth',
				multiMonthMaxColumns: 1,
				multiMonthMinWidth: 350,
				navLinks: true,
				headerToolbar: false,
				locale: frLocale,
				weekends: false,
				eventDrop: function (info) {
					events = events.map((x) => (x.id === info.event.id ? info.event : x));
					console.log(events.map((x) => x.start));

                    const relache = events.find(x => x.extendedProps.type === 'Semaine detude');
                    if (relache) 
                        if (info.event.start > relache.start && info.event.start < relache.end) {
                        alert("pas pendant la relache")
                        info.revert()
                    }
				},
				views: {
					multiMonthFourMonth: {
						type: 'multiMonth',
						duration: { months: duration }
					}
				},
				events
			});
			calendar.render();
		}
	});
</script>

<span>
	<div bind:this={calendarEl} class="w-100" style="width: 500px;"></div>
</span>
