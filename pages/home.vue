<template>
  <div class="container">
    <div class="tile is-ancestor">
      <div class="tile is-vertical is-parent">
        <div class="tile is-child">
          <Newthread />
          <Threadarticle />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Newthread from '~/components/Newthread.vue'
import Threadarticle from '~/components/Threadarticle.vue'

export default {
  middleware: 'authenticated',

  layout: 'homelayout',

  components: {
    Newthread,
    Threadarticle
  },

  data () {
    return {
      checkboxGroup: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  mounted () {
    this.$store.dispatch('thread/initThreads')
  }

}
</script>
