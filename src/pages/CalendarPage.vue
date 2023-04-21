<script>
import Calendar from '../components/CalendarComponent.vue';
// Import bootstrap for the modal
import bootstrap from 'bootstrap';

export default {
  components: {
    Calendar, // make the <FullCalendar> tag available
  },
  methods: {
    createEvent() {
      const title = document.getElementById('event-title').value;
      const start = document.getElementById('event-start').value;
      const end = document.getElementById('event-end').value;

      console.log('Creating event:', {
        title,
        start,
        end,
      });

      const modalEl = document.getElementById('createEventModal');
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    },
  },
};
</script>

<template>
    <div class="calendar">
      <div class="left text-center">
        <h1 style="max-width: 200px; margin: 0 auto;">Calendrier de Tom</h1>
        <div class="d-grid gap-2" style="padding-top: 30px">
          <button
            type="button"
            class="btn btn-success w-100"
            data-bs-toggle="modal"
            data-bs-target="#createEventModal"
          >
            Créer un événement
          </button>
          <button type="button" class="btn btn-primary w-100">Supprimer un événement</button>
        </div>
      </div>
  
      <div class="right">
        <Calendar />
      </div>
  
      <div
        class="modal fade"
        id="createEventModal"
        tabindex="-1"
        aria-labelledby="createEventModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createEventModalLabel">Créer un événement</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="event-title" class="form-label">Titre de l'événement</label>
                  <input type="text" class="form-control" id="event-title" />
                </div>
                <div class="mb-3">
                  <label for="event-start" class="form-label">Date de début</label>
                  <input type="datetime-local" class="form-control" id="event-start" />
                </div>
                <div class="mb-3">
                  <label for="event-end" class="form-label">Date de fin</label>
                  <input type="datetime-local" class="form-control" id="event-end" />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Annuler
              </button>
              <button type="button" class="btn btn-primary" @click="createEvent">
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<style scoped>
    .calendar {
        padding: 40px;
        display: flex;
        /* Center */
        justify-content: center;
        gap: 50px;
    }

    .left {
        width: 30%;
    }

    .right {
        width: 70%;
    }


</style>