<template>

<div class="event-card card-img-top my-2 elevation-2 rounded selectable">
    <div>
      <router-link :to="{name: 'EventDetails', params: {eventId: event.id} }">
      <img class="img-fluid rounded-top" :src="event.coverImg" alt="">
      </router-link>
    </div>
    <div class="card-body text-white">
        <h6 class="card-title text-start my-2" ><b>{{event.name}}</b></h6>
        <div v-if="event.capacity > 0 && !event.isCanceled" class="text-end my-2"><b>{{event.capacity}}</b> spots left</div>
        <div class="mx-0 text-center bg-danger rounded my-2 text-dark" v-if="event.capacity <= 0"><b>Event is full</b></div>
        <div class="mx-0 text-center bg-white rounded my-2 text-dark" v-if="event.isCanceled"><b>Event Cancelled</b></div>
    </div>
</div>



</template>
<script>

export default {
props:{ event: {type: Object, required: true}},
setup() {
  return {}
}
}
</script>
<style>
.event-card{
  border: none;
}
</style>