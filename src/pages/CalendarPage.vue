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
          <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#deleteEventModal">
            Supprimer un événement
          </button>
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
                <!-- Sélecteur RGB -->
                <div class="mb-3">
                  <label for="event-color" class="form-label">Couleur</label>
                  <input type="color" class="form-control" id="event-color" value="#ff0000" />
                </div>
              </form>
              <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
      <div class="modal fade" id="deleteEventModal" tabindex="-1" aria-labelledby="deleteEventModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteEventModalLabel">Supprimer un événement</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul>
                <li v-for="event in events" :key="event.id" class="d-flex align-items-center justify-content-between mb-2">
                  <div>
                    <span class="me-2">{{ event.title }}</span>
                  </div>
                  <div>
                    <button class="btn btn-danger btn-sm" @click="deleteEvent(event.id)">{{ 'Supprimer' }}</button>
                  </div>
                </li>
              </ul>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Calendar from '../components/CalendarComponent.vue';
import { Modal } from 'bootstrap';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, getDoc, deleteDoc, getDocs } from 'firebase/firestore';

export default {
  components: {
    Calendar,
  },
  data() {
    return {
      firstname: '',
      authLoaded: false, // Track the authentication state
      events: [],
      errorMessage: '',
    };
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.getFirstNameAsync();
      } else {
        this.firstname = '';
        this.authLoaded = true;
      }
    });
  },

  methods: {
    async getFirstName() {
    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const userDocRef = doc(db, 'users', userUid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        this.firstname = userDocSnapshot.data().firstname;

        // Récupérer les événements de l'utilisateur
        const eventsCollectionRef = collection(db, 'users', userUid, 'events');
        const eventsSnapshot = await getDocs(eventsCollectionRef);

        // Mettre à jour le tableau d'événements
        this.events = eventsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return;
      }
    }

    this.firstname = '';
    this.events = []; // Netttoyer le tableau d'événements
    return;
  },

    async getFirstNameAsync() {
      await this.getFirstName();
      this.firstname = this.firstname ? this.firstname : 'Unknown User';
    },

    async deleteEvent(eventId) {
      if (auth.currentUser) {
        try {
          const userUid = auth.currentUser.uid;
          const eventDocRef = doc(db, 'users', userUid, 'events', eventId);
          
          // Supprimer l'événement
          await deleteDoc(eventDocRef);
          console.log('Event deleted with ID:', eventId);
          
          // Refresh la page
          this.$router.go();
        } catch (e) {
          console.error('Error deleting event:', e);
        }
      } else {
        console.log('User not authenticated');
      }
    },

    async createEvent() {
      if (auth.currentUser) {
        const title = document.getElementById('event-title').value;
        const start = document.getElementById('event-start').value;
        const end = document.getElementById('event-end').value;
        const color = document.getElementById('event-color').value;

        if (!title || !start || !end || !color) {
          this.errorMessage = 'Vous devez remplir les champs suivants: ' + (title ? '' : 'Titre ') + (start ? '' : 'Début ') + (end ? '' : 'Fin ') + (color ? '' : 'Couleur ');
          return;
        }

        try {
          const userUid = auth.currentUser.uid;
          const eventsCollectionRef = collection(db, 'users', userUid, 'events');

          // Ajouter l'événement
          const docRef = await addDoc(eventsCollectionRef, {
            title: title,
            start: start,
            end: end,
            color: color,
          });
          console.log('Event created with ID:', docRef.id);

          // Refresh la page
          this.$router.go()
        } catch (e) {
          console.error('Error adding event:', e);
        }

        const modalEl = document.getElementById('createEventModal');
        const modalInstance = new Modal(modalEl);
        modalInstance.hide();
      } else {
        console.log('User not authenticated');
      }
    },
  },
};
</script>

<style scoped>

  .error-message {
      color: red;
    }
    .calendar {
        padding: 40px;
        display: flex;
        height: 85vh;
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