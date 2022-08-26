<template>

<div class="container">
    <div class="justify-content-between row my-5">
        <div class="col-12 btn-group">
            <div class="focus btn btn-outline-light" @click="filterTerm = ''">All</div>
            <div class="focus btn btn-outline-light" @click="filterTerm = 'concert'">Concert</div>
            <div class="focus btn btn-outline-light" @click="filterTerm = 'convention'">Convention</div>
            <div class="focus btn btn-outline-light" @click="filterTerm = 'sport'">Sport</div>
            <div class="focus btn btn-outline-light" @click="filterTerm = 'digital'">Digital</div>
        </div>
    </div>
    <div class="row">
        <div class="col-3" v-for="e in events" :key="e.id">
            <EventCard :event="e" />
        </div>
    </div>
</div>




</template>
<script>
import { computed, ref } from '@vue/reactivity';
import { onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
setup() {
const filterTerm = ref('')
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
    filterTerm,
    events: computed(()=> AppState.events.filter(e => filterTerm.value ? e.type == filterTerm.value : true))
    }
}
}
</script>
<style>
.focus:focus {
    border: 0 solid #ffffff;
    -webkit-box-shadow: 0px 0px 1px #ffffff;
    -moz-box-shadow: 0px 0px 1px #ffffff;
    box-shadow: 0px 0px 1px #ffffff;
}
</style>