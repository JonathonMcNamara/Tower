<template>


<div class="card text-start" @click="ticketPage" >
  <img class="card-img-top" :src="ticket.event?.coverImg" alt="Title">
  <div class="card-body">
    <h4 class=" col-12 card-title">{{ticket.event.name}} <i @click="removeTicket" class="mdi mdi-delete-forever"></i></h4>
  </div>
</div>



</template>
<script>
import { useRouter } from 'vue-router';
import { ticketsService } from '../services/TicketsService.js';
import Pop from '../utils/Pop.js';



export default {
props: { ticket: {type: Object, required: true}},
setup(props) {
    const router = useRouter()
    return {
    async removeTicket(){
    try {
    const yes = await Pop.confirm('Delete Ticket?')
    if (!yes) {return}
    await ticketsService.removeTicket(props.ticket.id)
    } catch (error) {
    Pop.error(error)   
    }
    },
    async ticketPage(){
    try {
    router.push({name: 'EventDetails', params: {eventId: props.ticket.event?.id}})
    } catch (error) {
    Pop.error(error)  
    }
    }
  }
}
}
</script>
<style>
</style>