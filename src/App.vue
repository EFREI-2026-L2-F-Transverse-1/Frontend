<template>
  <NavBar/>
  <router-view></router-view>
  <FooterBar/>
</template>

<script>
import NavBar from './components/Navbar.vue'
import FooterBar from './components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    FooterBar
  },
  mounted() {
    console.log(this.$refs.navbar) // affiche le composant NavBar
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
