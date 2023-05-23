<template>
  <NavBar/>
  <router-view></router-view>
  <FooterBar/>
</template>

<script>
import NavBar from './components/Navbar.vue'
import FooterBar from './components/FooterBar.vue'
import { auth } from './firebase'  // adjust the path to firebase.js

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('User signed in')
      } else {
        console.log('No user signed in')
      }
    })
  }
}
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap');

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #12181f;
}

.bg-primary {
  background-color: #15222f !important;
}

.text-primary {
  color: #d5d5d5 !important;
}

body {
  font-family: 'Maven Pro', sans-serif;
}

</style>
