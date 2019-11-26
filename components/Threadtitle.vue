<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">
            {{ thread.text }}
          </p>
          <p class="subtitle is-6">
            {{ thread.tag }}{{ thread.createdAt }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  computed: {
    ...mapState({
      thread: state => state.thread.thread
    })
  }

}
</script>
