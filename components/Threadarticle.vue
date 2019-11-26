<template>
  <section>
    <article v-for="thread in threads" :key="thread.uId" class="media">
      <div class="media-content">
        <div class="content" @click="isImageModalActive(thread)">
          <p>
            <strong>{{ thread.text }}</strong>
            <br>
            <small>{{ thread.createdAt }}</small> <small>{{ thread.tag }}</small>
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user,
      threads: state => state.thread.threads
    }),
    ...mapGetters({ releasethreads: 'thread/releasethreads' })
  },

  mounted () {
    this.$store.dispatch('thread/initThreads')
  },

  methods: {
    async isImageModalActive (thread) {
      await this.$store.dispatch('thread/setThreaddata', thread)
      await this.$router.push('/thread')
    }
  }
}
</script>
