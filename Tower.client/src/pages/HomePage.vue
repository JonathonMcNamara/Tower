<template>

<div class="container">
    <div class="row">
        <div class="col-3" v-for="e in events" :key="e.id">
            <EventCard :event="e" />
        </div>
    </div>
</div>




</template>
<script>
import { computed } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
setup() {
  
async function getEvents(){
    try {
    await eventsService.getEvents()     
    } catch (error) {
    logger.error('[Getting Events]',error)  
    Pop.error(error)  
    }
}

    onMounted(()=>{
        getEvents()
    })

return {
    events: computed(()=> AppState.events)
    }
}
}
</script>
<style>
</style>