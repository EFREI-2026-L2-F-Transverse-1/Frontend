<script>
import Calendar from '../components/CalendarComponent.vue';
import { Modal } from 'bootstrap';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      firstname: ''
    };
  },
  created() {
    this.getFirstNameAsync();
  },
  methods: {
    async getFirstName() {
      if (auth.currentUser) {
        const userUid = auth.currentUser.uid;
        const userDocRef = doc(db, 'users', userUid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          this.firstname = userDocSnapshot.data().firstname;
          return
        }
      }
      this.firstname = '';
      return
    },
    async getFirstNameAsync() {
      await this.getFirstName();
      return this.firstname ? this.firstname : 'Unknown User';
    },

    async createEvent() {
      if (auth.currentUser) {
        const title = document.getElementById('event-title').value;
        const start = document.getElementById('event-start').value;
        const end = document.getElementById('event-end').value;
        const color = document.getElementById('event-color').value;

        try {
          const userUid = auth.currentUser.uid;
          const eventsCollectionRef = collection(db, 'users', userUid, 'events');

          // Add a new event document within the 'events' subcollection
          const docRef = await addDoc(eventsCollectionRef, {
            title: title,
            start: start,
            end: end,
            color: color,
          });
          console.log('Event created with ID:', docRef.id);

          // Add the event to the calendar's events
          this.$refs.calendar.addEvent({
            title: title,
            start: start,
            end: end,
            color: color,
          });
        } catch (e) {
          console.error('Error adding event:', e);
        }

        // Hide the modal after event creation
        const modalEl = document.getElementById('createEventModal');
        const modalInstance = new Modal(modalEl);
        modalInstance.hide();
      } else {
        console.log('User not authenticated');
        // Handle the case when the user is not authenticated
      }
    },
  },
};
</script>

<template>
    <div class="calendar">
      <div class="left text-center">
        <h1 style="max-width: 200px; margin: 0 auto;">Calendrier de {{ firstname }}</h1>
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
                <!-- Event color (RGB selector) -->
                <div class="mb-3">
                  <label for="event-color" class="form-label">Couleur</label>
                  <input type="color" class="form-control" id="event-color" />
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