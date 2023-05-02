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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
