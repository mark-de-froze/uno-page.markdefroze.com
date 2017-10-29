import Vue from 'vue'
import Vuex from 'vuex'
import axios from '~/plugins/axios'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    mail: {
      from_name: '',
      from_email: '',
      subject: '',
      message: ''
    },
    settings: [],
    links: [],
    widgets: []
  },
  mutations: {
    set (state, {type, data}) {
      state[type] = data
    }
  },
  actions: {
    run ({commit}) {
      return Promise.all([
        axios.get('/site/settings', {params: {api_key: process.env.apiKey}}),
        axios.get('/site/widgets', {params: {api_key: process.env.apiKey}}),
        axios.get('/site/links', {params: {api_key: process.env.apiKey}})
      ]).then((res) => {
        commit('set', { type: 'settings', data: res[0].data })
        commit('set', { type: 'widgets', data: res[1].data })
        commit('set', { type: 'links', data: res[2].data })
      })
    },
    sendMail ({state}) {
      axios.post('/site/mails', Object.assign(state.mail, {api_key: process.env.apiKey}))
        .then((response) => {
          if (response.status === 201) {
            state.mail = {
              from_name: '', subject: '', message: '', from_email: ''
            }

            alert('Your email was successfully sent.')
          }
        })
    }
  }
})

export default store
