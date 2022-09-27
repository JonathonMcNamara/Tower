<template>

<div class="container-fluid">
  <div class="row text-white mb-5">
    <div class="col-12">
      <div class="row">
        <div class="col-6 p-0">
          <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-6 mt-5">
          <div class="row">
            <div class="col-12">
              <h1><b>{{event.name}}</b></h1><button @click="cancelEvent" v-if="event.creator?.id == account.id && !event.isCanceled" class="btn btn-outline-light">Cancel this Event</button>
            </div>
            <div class="row" v-if="!event.isCanceled">
              <div class="col-12 mt-5">
                <h2><i>{{new Date(event.startDate).toLocaleDateString('en-us')}}</i></h2>
                <h2><i>{{new Date(event.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}}</i></h2>
              </div>
            </div>
            <div class="row" v-if="!event.isCanceled">
              <div class="col-12 mt-5">
                <p>{{event.description}}</p>
              </div>
            </div>
            <div class="row" v-if="!event.isCanceled && event.capacity > 0">
              <div class="col-6"> <b>{{event.capacity}}</b> spots left</div>
              <div v-if="!isTicketHolder" class="col-6"><button @click="attendEvent" class="btn btn-outline-light">Reserve Seat</button></div>
              <div v-if="isTicketHolder">YOUR SEAT IS RESERVED</div>
            </div>
            <div class="row" v-if="event.capacity <= 0">
              <div class="col-12" >
                <h1>NO SEATS AVAILABLE FOR THIS EVENT</h1>
              </div>
            </div>
            <div class="row" v-if="event.isCanceled">
              <div class="col-12">
                <h1>THIS EVENT HAS BEEN CANCELLED</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container">

  <div class="row text-white mt-5" v-if="!event.isCanceled">
      <div class="col-12 text-center">
        <h4>People Attending This Event: </h4>
        <div class="row">
          <div class="col-1" v-for="t in ticketHolders" :key="t.id">
            <TicketPicture :ticket="t"/>
          </div>
        </div>
      </div>
  </div>

  <div class="row mt-5 text-white" v-if="!event.isCanceled">
    <div class="col-12 text-center">
      <form class="row" @submit.prevent="handleSubmit">
      <h4>Leave A Comment Below: </h4>
          <div class="col-12 px-0" >
            <input class="form-control" type="text" v-model="editable.body">
            <button class="btn btn-outline-light" type="submit">Add Comment</button>
          </div>
        </form>
      <div class="row mt-5 ">
        <div class="col-12" v-for="c in comments" :key="c.id">
          <Comment :comment="c"/>
        </div>
      </div>
    </div>

  </div>
</div>













</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import TicketPicture from '../components/TicketPicture.vue';
import Comment from '../components/Comment.vue';

export default {
    setup() {
        const route = useRoute();
        const editable = ref({eventId: route.params.eventId})
        async function getEvent() {
            try {
                await eventsService.getEventById(route.params.eventId);
            }
            catch (error) {
                logger.log("[Getting Events]", error);
                Pop.error(error);
            }
        }
        async function getComments() {
            try {
                await commentsService.getCommentsByEventId(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }
        async function getTicketHolders() {
            try {
                await ticketsService.getTicketHoldersByEvent(route.params.eventId);
            }
            catch (error) {
                Pop.error(error);
            }
        }

        onMounted(() => {
            getEvent();
            getComments();
            getTicketHolders();
        });
        return {
            editable,
            event: computed(() => AppState.activeEvent),
            account: computed(()=> AppState.account),
            comments: computed(() => AppState.comments),
            ticketHolders: computed(() => AppState.ticketHolders),
            isTicketHolder: computed(() => {
            if (AppState.ticketHolders.find(t => t.accountId == AppState.account.id)) {
              return true
              }
            return false
            }),
            async handleSubmit(){
              try {
              logger.log('Creating Comment', editable.value) 
              await commentsService.createComment(editable.value)
              Pop.toast('Comment Created')
              } catch (error) {
              Pop.error(error)
            }
            },
            async attendEvent(){
              try {
              let newTicket = {eventId: AppState.activeEvent.id}
              logger.log('Creating Ticket', newTicket)
              await ticketsService.create(newTicket)
              } catch (error) {
              Pop.error(error) 
            }
            },
            async cancelEvent(){
              try {
              let eventId = AppState.activeEvent.id
              await eventsService.cancelEvent(eventId)  
              } catch (error) {
              Pop.error(error)  
              }
            }
        };
    },
    components: { TicketPicture, Comment }
}
</script>
<style>

</style>