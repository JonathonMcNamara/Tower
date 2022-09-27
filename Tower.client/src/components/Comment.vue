<template>


<p><img class="px-2" :src="comment.creator?.picture" alt="" :title="comment.creator?.name">
<i>{{comment.creator?.name}} says:</i>  "{{comment.body}}"
<i @click="deleteComment" v-if="comment.creator?.id == account.id" class="mdi mdi-delete-forever selectable"></i>
</p>



</template>
<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { commentsService } from '../services/CommentsService.js';
import Pop from '../utils/Pop.js';



export default {
props: {comment: {type: Object, required: true}},
setup(props) {
  return {
    account: computed(()=> AppState.account),
    async deleteComment(){
    try {
    await commentsService.deleteComment(props.comment.id)  
    } catch (error) {
    Pop.error(error) 
    }
    }
  }
}
}
</script>
<style lang="scss" scoped>

img{
  max-height: 45px;
  border-radius: 50%;
}


</style>