<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import fr from '@fullcalendar/core/locales/fr'
import { db, auth } from '../firebase'; // adjust the path to firebase.js
import { collection, query, getDocs } from 'firebase/firestore';

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
        events: [],
      }
    }
  },
  methods: {
    handleDateClick(arg) {
      alert('date click! ' + arg.dateStr)
    },
    hideTooltip(e) {
      if (this.eventTooltip && !this.eventTooltip.contains(e.target)) {
        document.body.removeChild(this.eventTooltip);
        this.eventTooltip = null;
        document.removeEventListener('click', this.hideTooltip);
      }
    },
    async loadEvents() {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        const eventsCollectionRef = collection(db, 'users', userUid, 'events');
        const eventsQuery = query(eventsCollectionRef);

        try {
          const snapshot = await getDocs(eventsQuery);
          const events = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          this.calendarOptions.events = events;
        } catch (error) {
          console.error('Error loading events:', error);
        }
      }
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loadEvents();
      }
      else {
        // Send user to login page
        this.$router.push('/login');
      }
    });
  },
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