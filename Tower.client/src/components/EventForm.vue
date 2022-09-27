<template>


          <form @submit.prevent="handleSubmit" class="row bg-dark p-4 elevation-2">
            <h4 class="col-12 my-2">Create Event</h4>
            <div class="col-6 my-2">
              <label for="" class="form-label">Name</label>
              <input type="text" v-model="editable.name" class="form-control" name="title" id="title">
            </div>
            <div class="col-6 my-2">
              <label for="" class="form-label">Cover Image</label>
              <input type="url" v-model="editable.coverImg" class="form-control" name="title" id="title"
                aria-describedby="helpId" placeholder="">
            </div>
            <div class="col-6 my-2">
              <label for="" class="form-label ">Event Type</label>
              <select v-model="editable.type" name="type" id="type" class="form-control">
                <option value="concert">Concert</option>
                <option value="convention">Convention</option>
                <option value="sport">Sport</option>
                <option value="digital">Digital</option>
              </select>
            </div>
            <div class="col-6 my-2">
              <label for="" class="form-label">Date</label>
              <input type="date" class="form-control" v-model="editable.startDate">
            </div>
            <div class="col-6">
              <label for="" class="form-label">Location</label>
              <input type="text" v-model="editable.location" class="form-control">
            </div>
            <div class="col-6">
              <label for="" class="form-label">Capacity</label>
              <input type="number" v-model="editable.capacity" class="form-control">
            </div>
            <div class="col-12 my-2">
              <label for="" class="form-label">Event Description</label>
              <input type="text" class="form-control" v-model="editable.description">
            </div>
            <div class="col-12 my-2">
            <button class="col-12 btn btn-success">Submit</button>
            </div>
          </form>








</template>
<script>
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
setup() {
const editable = ref({})
const router = useRouter()
  return {
    editable,
    async handleSubmit(){
    try {
    logger.log('Creating event', editable.value)
    const event =  await eventsService.createEvent(editable.value)
    router.push({name: 'EventDetails', params: {eventId: event.id}})
    Pop.toast('Your event has been created') 
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