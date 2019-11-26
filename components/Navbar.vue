<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item>
        <nuxt-link to="/home">
          Home
        </nuxt-link>
      </b-navbar-item>
      <b-navbar-item>
        <div class="field has-addons">
          <p class="control">
            <input class="input" type="text" placeholder="search">
          </p>
          <p class="control">
            <button class="button">
              Search
            </button>
          </p>
        </div>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <strong>{{ user.userName }} さん</strong>
        <div class="buttons">
          <a class="button is-light" @click="logout">
            Log out
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { auth } from '~/plugins/firebase'

export default {
  data () {
    return {
      radio: 'Jack'
    }
  },

  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },

  methods: {
    async logout () {
      this.$router.push('/')
      await auth().signOut()
      this.$store.dispatch('user/logoutUser')
    }
  }
}
</script>
