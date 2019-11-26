<template>
  <div class="content box">
    <b-field label="新規スレッド">
      <b-input v-model="text" maxlength="30" type="textarea" />
    </b-field>
    <div class="level is-mobile columns">
      <div class="level-left column">
        <div class="block">
          <b-checkbox v-model="checkboxGroup" native-value="一般">
            一般
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup" native-value="学問">
            学問
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup" native-value="文化">
            文化
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup" native-value="ゲーム">
            ゲーム
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup" native-value="音楽">
            音楽
          </b-checkbox>
          <b-checkbox v-model="checkboxGroup" native-value="雑談">
            雑談
          </b-checkbox>
        </div>
      </div>
      <div class="level-right">
        <b-button @click="addThread">
          新規作成
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      text: '',
      release: '公開',
      checkboxGroup: ['一般']
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user
    }),
    ...mapGetters({
      threadnumber: 'thread/threadnumber'
    })
  },

  created () {
    this.$store.dispatch('thread/initThreads')
  },

  methods: {
    async addThread () {
      try {
        dayjs.locale('ja')
        await this.$store.dispatch('thread/addThread', { documentId: this.threadnumber, text: this.text, createdAt: dayjs().format('YYYY/MM/DD/HH:mm:ss'), tag: this.checkboxGroup })
        alert('投稿しました')
        this.text = ''
      } catch (e) {
        alert(e)
      }
    }

  }
}
</script>
