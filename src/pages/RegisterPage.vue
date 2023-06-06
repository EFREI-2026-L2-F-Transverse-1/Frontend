<!-- Register: Page d'inscription des utilisateurs  -->
<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Inscription</h2>
              <form>
                <div class="form-group">
                  <label for="firstname">Prénom</label>
                  <input type="text" class="form-control" id="firstname" v-model="firstname" required>
                </div>
                <div class="form-group">
                  <label for="lastname">Nom</label>
                  <input type="text" class="form-control" id="lastname" v-model="lastname" required>
                </div>
                <div class="form-group">
                  <label for="birthdate">Date de naissance</label>
                  <input type="date" class="form-control" id="birthdate" v-model="birthdate" required>
                </div>
                <div class="form-group">
                  <label for="role">Rôle</label>
                  <select class="form-control" id="role" v-model="role">
                    <option value="student">Elève</option>
                    <option value="teacher">Professeur</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="email">Adresse email</label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div class="form-group">
                  <label for="confirm-password">Confirmez votre mot de passe</label>
                  <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block" @click.prevent="register">S'inscrire</button>
                <p class="text-danger" v-if="errorMessage">{{ errorMessage }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore'; 

export default {
  name: 'RegisterPage',
  data() {
    return {
      firstname: '',
      lastname: '',
      birthdate: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      const auth = getAuth();
      const db = getFirestore();

      this.errorMessage = '';

      // Validation des champs
      if (!this.firstname || !this.lastname || !this.birthdate || !this.role || !this.email || !this.password || !this.confirmPassword) {
        this.errorMessage = "Merci de remplir tous les champs !";
        return;
      }

      if(this.password !== this.confirmPassword) {
        this.errorMessage = "Les mots de passe ne correspondent pas !";
        return;
      }

      try {
        const response = await createUserWithEmailAndPassword(auth, this.email, this.password);
        
        const uid = response.user.uid;
        
        // Enregistrer les informations de l'utilisateur dans la base de données Firestore
        await setDoc(doc(db, 'users', uid), {
          firstname: this.firstname,
          lastname: this.lastname,
          birthdate: this.birthdate,
          role: this.role,
        });
        
        // Connecter l'utilisateur
        await signInWithEmailAndPassword(auth, this.email, this.password);
        
        // Rediriger l'utilisateur vers la page d'accueil
        this.$router.push('/');
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>


<style scoped>
.register-page {
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
