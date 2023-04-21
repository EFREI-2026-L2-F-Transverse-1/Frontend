<template>
  <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <a class="text-primary navbar-brand" href="#">StudyBoard</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="text-primary nav-link active" aria-current="page" href="#"><router-link style="text-decoration: none; color: inherit;" to="/">Accueil</router-link></a>
          </li>
          <li class="nav-item">
            <a class="text-primary nav-link" href="#"><router-link style="text-decoration: none; color: inherit;" to="/features">Fonctionnalités</router-link></a>
          </li>
          <li class="nav-item dropdown">
            <a class="text-primary nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Compte
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Se connecter</a></li>
              <li><a class="dropdown-item" href="#">S'inscrire</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
  data() {
  },
  methods: {
  }
};
</script>

<style>
/* Underline on router-link hover */
a:hover {
  text-decoration: underline;
}
</style>
