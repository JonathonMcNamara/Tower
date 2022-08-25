<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';

export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

main{
  background-color: #2a2d3a;
  font-family: 'Aboreto', cursive;
}

header{
  font-family: 'Aboreto', cursive;
}

</style>
