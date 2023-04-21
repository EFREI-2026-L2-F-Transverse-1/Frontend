<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import fr from '@fullcalendar/core/locales/fr'

export default {
  name: 'CalendarComponent',
  components: {
    FullCalendar
  },
  data() {
    return {
      eventTooltip: null,
      calendarOptions: {
        nowIndicator: true,
        editable: true,
        height: 500,
        scrollTime: '08:00:00',
        slotMinTime: '08:00:00',
        slotMaxTime: '20:00:00',
        weekNumbers: true,
        weekText: 'S',
        allDayText: 'Journée',
        plugins: [ timeGridPlugin, dayGridPlugin, interactionPlugin ],
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'timeGridDay timeGridWeek dayGridMonth'
        },
        locale: fr,
        dateClick: this.handleDateClick,

        eventClick: (info) => {
            // If there's an existing tooltip, remove it
            if (this.eventTooltip) {
                document.body.removeChild(this.eventTooltip);
                this.eventTooltip = null;
            }

            // Create a new tooltip div element
            this.eventTooltip = document.createElement('div');
            this.eventTooltip.classList.add('event-tooltip');

            // Add the event information to the tooltip
            this.eventTooltip.innerHTML = `
                <strong>${info.event.title}</strong><br>
                Début: ${info.event.start.toLocaleString()}<br>
                Fin: ${info.event.end ? info.event.end.toLocaleString() : 'Aucune'}
            `;

            // Position the tooltip to the right of the event and centered relative to its height
            const eventRect = info.el.getBoundingClientRect();
            this.eventTooltip.style.position = 'absolute';
            this.eventTooltip.style.left = (eventRect.right + 10) + 'px'; // 10px margin to the right of the event
            this.eventTooltip.style.top = (eventRect.top + (eventRect.height / 2)) + 'px';
            this.eventTooltip.style.transform = 'translateY(-50%)';

            // Add the tooltip to the body
            document.body.appendChild(this.eventTooltip);
            },




        events: [
            // Today course examples (4 per day with a color per subject, not at the same time) (21/04/2023) : { title: 'event 1', date: '2023-04-20', color: 'red', start: '2023-04-20T10:00:00', end: '2023-04-20T12:00:00'}
            { title: 'Mathématiques', date: '2023-04-20', color: 'red', start: '2023-04-20T10:00:00', end: '2023-04-20T12:00:00'},
            { title: 'Français', date: '2023-04-20', color: 'blue', start: '2023-04-20T12:00:00', end: '2023-04-20T14:00:00'},
            { title: 'Anglais', date: '2023-04-20', color: 'orange', start: '2023-04-20T16:00:00', end: '2023-04-20T18:00:00'},
            { title: 'Mathématiques', date: '2023-04-21', color: 'red', start: '2023-04-21T12:00:00', end: '2023-04-21T14:00:00'},
            { title: 'Anglais', date: '2023-04-21', color: 'orange', start: '2023-04-21T10:00:00', end: '2023-04-21T12:00:00'},
            { title: 'Mathématiques', date: '2023-04-22', color: 'red', start: '2023-04-22T10:00:00', end: '2023-04-22T12:00'},
            { title: 'Révisions', date: '2023-04-22', color: 'purple', start: '2023-04-22T14:00:00', end: '2023-04-22T15:00'}
        ]
      }
    }
  },
  methods: {
    handleDateClick: function(arg) {
      alert('date click! ' + arg.dateStr)
    },

    

    hideTooltip(e) {
        if (this.eventTooltip && !this.eventTooltip.contains(e.target)) {
        document.body.removeChild(this.eventTooltip);
        this.eventTooltip = null;
        document.removeEventListener("click", this.hideTooltip);
        }
    },
  }
}
</script>
<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style>
    .fc .fc-col-header-cell-cushion {
        color: inherit;
        text-decoration: none;
    }

    .fc .fc-timegrid-axis-cushion {
        color: inherit;
        text-decoration: none;
        max-width: 100px;
    }

    .fc .fc-daygrid-day-number {
        color: inherit;
        text-decoration: none;
    }

    /* .fc-day-today {
    background: #e9faff !important;
    }  */

    .fc-timegrid-slot-label {
        width: 300px;
    }

    .event-tooltip {
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        z-index: 3; /* Added to bring the tooltip to the forefront */
    }

</style>