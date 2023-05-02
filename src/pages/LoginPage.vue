<template>
    <div class="login-page">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title text-center mb-4">Connexion</h2>
                <form>
                  <div class="form-group">
                    <label for="email">Adresse email</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                  </div>
                  <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                  </div>
                  <button type="submit" class="btn btn-primary btn-block" @click.prevent="login">Se connecter</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Envoyer la demande de connexion au serveur ici
        console.log(`Connexion avec email: ${this.email} et mot de passe: ${this.password}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
  }
  
  .card {
    border: none;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
  }
  
  .card-title {
    font-weight: 700;
  }
  
  .btn-block {
    margin-top: 1.5rem;
  }
  </style>
  