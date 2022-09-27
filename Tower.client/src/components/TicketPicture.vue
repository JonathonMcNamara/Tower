<template>

    <img class="img-fluid" :src="ticket.profile.picture" alt="" :title="ticket.profile.name">


</template>
<script>
export default {
props: { ticket :{type: Object, required: true}},
setup() {
  return {}
}
}
</script>
<style lang="scss" scoped>

img{
  border-radius: 50%;
}

</style>