<template>

  <div class="row text-white">
    <div class="col-12">
      <div class="row">
        <div class="col-6 p-0">
          <img class="img-fluid" :src="event.coverImg" alt="">
        </div>
        <div class="col-6">
          <div class="row">
            <div class="col-12">
              <h1>{{event.name}}</h1>
            </div>
               <div class="col-12">
              <h1>{{event.startDate}}</h1>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>








</template>
<script>
export default {
setup() {
  return {
    event: computed(()=> AppState.activeEvent)
  }
}
}
</script>
<style>
</style>