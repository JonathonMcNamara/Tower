<template>
  <nav class="right-bar navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="https://www.designfreelogoonline.com/wp-content/uploads/2017/08/000870-Luxury-towers-logo-maker-02.png" height="45" />
        <div>Tower</div>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <button type="button" class="btn btn-outline-light mx-5" data-bs-toggle="modal" data-bs-target="#create-event">Create Event</button>
      <Modal id="create-event">
        <EventForm/>
      </Modal>
      
      
      <Login />
    </div>

  </nav>
</template>

<script>
import EventForm from './EventForm.vue';
export default {
    setup() {
        return {};
    },
    components: { EventForm }
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

</style>
