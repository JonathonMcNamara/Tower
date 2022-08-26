<template>
  <div class="about text-center text-white">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container">
    <div class="row">
      <h1 class="text-white text-center">EVENTS I HAVE TICKETS FOR</h1>
      <div class="my-3 col-3" v-for="t in tickets" :key="t.id">
        <AccountTicketCard class="selectable" :ticket="t"/>
      </div>
    </div>
  </div>

</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
export default {
  name: 'Account',
  setup() {
     async function getTicketEvents(){
      try {
      await ticketsService.getEventsByTickets() 
      } catch (error) {
      Pop.error(error) 
      }
      }
      onMounted(()=>{
        getTicketEvents()
      })
    return {
      account: computed(() => AppState.account),
      tickets: computed(()=> AppState.accountTickets),
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
