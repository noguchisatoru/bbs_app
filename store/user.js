import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const usersRef = db.collection('Users')
const followerRef = db.collection('Followers')
const favoritesRef = db.collection('Favorites')

export const state = () => ({
  user: null,
  users: []
})

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  logoutUser (state) {
    state.user = null
  }
}

export const getters = {
  user: state => state.user,
  users: state => state.users
}

export const actions = {
  initUser: firestoreAction((context) => {
    return context.bindFirestoreRef('users', usersRef)
  }),
  addUser: firestoreAction(async (context, userdata) => {
    try {
      await usersRef.doc(userdata.uId).set({

        userName: userdata.userName,
        createdAt: userdata.createdAt

      })

      await followerRef.doc(userdata.uId).set({

        followingUserId: []

      })

      await favoritesRef.doc(userdata.uId).set({

        favoriteIds: []

      })
    } catch (e) {
      alert(e)
    }
  }),
  setUserdata: async ({ commit }, uid) => {
    try {
      const userdata = await usersRef.doc(uid).get()
      commit('setUser', {
        uId: uid,
        userName: userdata.data().userName,
        createdAt: userdata.data().createdAt
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  },
  logoutUser: ({ commit }) => {
    commit('logoutUser')
  }
}
