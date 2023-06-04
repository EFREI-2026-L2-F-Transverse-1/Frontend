<template>
  <div>
    <section class="py-5 bg-primary text-center landing-front" style="height: 65vh;">
      <!-- Vertically centered -->
      <div class="container custom-center-container">
        <h1 class="mb-4 text-white">Ensemble pour apprendre, collaborer et réussir.</h1>
        <p class="lead mb-4 text-white">Ce site permet aux étudiants et aux professeurs de collaborer et d'échanger des idées.</p>
        <template v-if="!loggedIn">
          <div class="button-group">
            <a class="btn btn-lg btn-light" href="#"><router-link style="text-decoration: none; color: inherit;" to="/register">Inscrivez-vous maintenant</router-link></a>
            <a class="btn btn-lg btn-outline-light mx-2" href="#"><router-link style="text-decoration: none; color: inherit;" to="/login">Se connecter</router-link></a>
          </div>
        </template>
        <template v-else>
          <div class="button-group">
            <a class="btn btn-lg btn-light" href="#"><router-link style="text-decoration: none; color: inherit;" to="/calendar">Accéder à l'agenda</router-link></a>
            <a class="btn btn-lg btn-outline-light mx-2" href="#"><router-link style="text-decoration: none; color: inherit;" @click="signOut" to='/'>Se déconnecter</router-link></a>
          </div>
        </template>
      </div>
    </section>
    <section class="py-5">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="bi bi-people h1 mb-3 text-secondary"></i>
                <h3 class="card-title mb-3 text-dark">Collaboration étudiante</h3>
                <p class="card-text">Partagez des idées, discutez de vos projets et collaborez avec d'autres étudiants de votre domaine.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="bi bi-book h1 mb-3 text-secondary"></i>
                <h3 class="card-title mb-3 text-dark">Ressources pédagogiques</h3>
                <p class="card-text">Accédez à des ressources pédagogiques utiles pour votre cursus et partagez les vôtres avec la communauté.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body text-center">
                <i class="bi bi-laptop h1 mb-3 text-secondary"></i>
                <h3 class="card-title mb-3 text-dark">Plateforme de communication en ligne</h3>
                <p class="card-text">Utilisez notre plateforme pour communiquer avec vos enseignants.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5 bg-primary text-center">
      <div class="container">
        <h2 class="mb-4 text-white">Pourquoi choisir notre site collaboratif ?</h2>
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card h-100 bg-primary">
              <div class="card-body">
                <i class="bi bi-clock-history h1 mb-3 text-white"></i>
                <h3 class="card-title mb-3 text-white">Gagnez du temps</h3>
                <p class="card-text text-white">Notre plateforme d'apprentissage en ligne vous permet de suivre des cours à votre rythme et de réviser les sujets qui vous posent problème quand vous le souhaitez.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100 bg-primary">
              <div class="card-body">
                <i class="bi bi-people h1 mb-3 text-white"></i>
                <h3 class="card-title mb-3 text-white">Rejoignez une communauté</h3>
                <p class="card-text text-white">Notre site vous permet de connecter avec des étudiants et des professeurs partageant les mêmes centres d'intérêt, et de collaborer avec eux sur des projets passionnants.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100 bg-primary">
              <div class="card-body">
                <i class="bi bi-shield-check h1 mb-3 text-white"></i>
                <h3 class="card-title mb-3 text-white">Sécurité et confidentialité</h3>
                <p class="card-text text-white">Nous attachons une grande importance à la sécurité et à la confidentialité de vos données, et nous nous engageons à les protéger à tout moment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container">
        <h2 class="mb-4 text-center">Témoignages</h2>
        <div class="row">
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <blockquote class="blockquote">
                  <p class="mb-0">Cette plateforme m'a aidé à réussir mes études. La possibilité de collaborer avec d'autres étudiants et de bénéficier de l'expérience des professeurs est inestimable.</p>
                  <footer class="blockquote-footer mt-3">Étudiant en informatique</footer>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <blockquote class="blockquote">
                  <p class="mb-0">Grâce à cette plateforme, j'ai pu partager mes connaissances et aider d'autres étudiants à progresser. C'est un excellent moyen d'échanger et d'apprendre ensemble.</p>
                  <footer class="blockquote-footer mt-3">Professeur de mathématiques</footer>
                </blockquote>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mb-4">
            <div class="card h-100">
              <div class="card-body">
                <blockquote class="blockquote">
                  <p class="mb-0">J'ai rencontré des étudiants et des professeurs qui partagent les mêmes passions que moi, et ensemble, nous avons pu travailler sur des projets innovants et stimulants.</p>
                  <footer class="blockquote-footer mt-3">Étudiante en design</footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { auth } from '../firebase'  // adjust the path to firebase.js

export default {
  name: 'HomePage',
  data() {
    return {
      loggedIn: false  // Set the initial value of loggedIn to false
    }
  },
  methods: {
    signOut() {
      auth.signOut()
      this.loggedIn = false
    }
  },
  beforeMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User signed in')
        this.loggedIn = true
      } else {
        console.log('No user signed in')
        this.loggedIn = false
      }
    })
  }
}
</script>

<style scoped>
.custom-center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-group a {
  margin: 0 5px;
}

.landing-front {
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), #15222F), url('https://maryellenstrongfoundation.org/wp-content/uploads/2017/11/Rocky-Mountains-in-Black-and-White-Silhouette-528723418_4928x3264-2.jpeg') repeat;
  background-size: cover;


}
</style>