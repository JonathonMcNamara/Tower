<template>

  <div class="modal fade" id="create-event" tabindex="-1" role="dialog" aria-labelledby="createEventLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content bg-dark">

            <div class="modal-body bg-dark">
            <slot></slot>
            </div>
        </div>
    </div>
</div>

</template>
<script>
export default {
setup() {
  return {}
}
}
</script>
<style>
</style>