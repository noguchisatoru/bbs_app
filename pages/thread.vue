<template>
  <div class="container">
    <Threadtitle />
    <article v-for="comment in commentsfilter(thread.Id)" :key="comment.uId" class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ comment.text }}</strong>
            <br>
            <small>{{ comment.user }}</small> <small>{{ comment.createdAt }}</small>
          </p>
        </div>
      </div>
    </article>

    <article class="media">
        <div class="media-content">
            <div class="field">
            <p class="control">
                <textarea v-model="text" class="textarea" placeholder="Add a comment..."></textarea>
            </p>
            </div>
            <nav class="level">
            <div class="level-left">
                <div class="level-item" @click="addComment()">
                <a class="button is-info">投稿</a>
                </div>
            </div>
            </nav>
        </div>
    </article>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { mapState, mapGetters } from 'vuex'
import Threadtitle from '~/components/Threadtitle.vue'

export default {
  middleware: 'authenticated',

  layout: 'homelayout',

  components: {
    Threadtitle
  },

  data () {
    return {
      text: '',
      checkboxGroup: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      thread: state => state.thread.thread,
      threads: state => state.thread.threads
    }),
    ...mapGetters({
      commentsfilter: 'thread/commentfilter',
      commentnumber: 'thread/commentnumber'
    })
  },

  mounted () {
    this.$store.dispatch('thread/initThreads')
    this.$store.dispatch('thread/initComments')
  },

  methods: {
    async addComment () {
      try {
        dayjs.locale('ja')
        await this.$store.dispatch('thread/addComment', { id: this.commentnumber, threadId: this.thread.Id, user: this.user.userName, text: this.text, createdAt: dayjs().format('YYYY/MM/DD/HH:mm:ss') })
        alert('投稿しました')
        this.text = ''
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>
