import { firestoreAction } from 'vuexfire'
import { db } from '~/plugins/firebase'

const threadsRef = db.collection('Threads')
const commentsRef = db.collection('Comments')

export const state = () => ({
  thread: null,
  threads: [],
  comments: []
})

export const mutations = {
  setThread (state, thread) {
    state.thread = thread
  },
  setComment (state, comment) {
    state.Comment = comment
  }
}

export const getters = {
  thread: state => state.thread,
  threads: state => state.threads,
  threadnumber: state => (state.threads).length + 1,
  commentnumber: state => (state.comments).length + 1,
  commentfilter: state => (id) => {
    return state.comments.filter(comment => comment.threadId === id)
  }
}

export const actions = {
  initThreads: firestoreAction((context) => {
    return context.bindFirestoreRef('threads', threadsRef.orderBy('createdAt', 'desc'))
  }),
  initComments: firestoreAction((context) => {
    return context.bindFirestoreRef('comments', commentsRef.orderBy('createdAt', 'asc'))
  }),
  addThread: firestoreAction(async (context, threaddata) => {
    try {
      await threadsRef.doc(String(threaddata.documentId)).set({

        documentId: threaddata.documentId,
        text: threaddata.text,
        createdAt: threaddata.createdAt,
        tag: threaddata.tag

      })
    } catch (e) {
      alert(e)
    }
  }),

  addComment: firestoreAction(async (context, commentdata) => {
    try {
      await commentsRef.doc(String(commentdata.id)).set({

        commentId: commentdata.id,
        threadId: commentdata.threadId,
        user: commentdata.user,
        text: commentdata.text,
        createdAt: commentdata.createdAt

      })
    } catch (e) {
      alert(e)
    }
  }),

  setThreaddata: async ({ commit }, data) => {
    try {
      await commit('setThread', {
        Id: data.documentId,
        text: data.text,
        tag: data.tag,
        createdAt: data.createdAt
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }
}
