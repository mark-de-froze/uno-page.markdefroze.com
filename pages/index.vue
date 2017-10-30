<template>
  <section>
    <navbar/>
    <div v-for="widget in widgets.hero">
      <div v-html="widget.content"></div>
    </div>
    <div uk-height-viewport="expand: true">
      <div class="uk-margin-top uk-margin-bottom uk-container">
        <div uk-grid>
          <div class="uk-width-expand">
            <div v-for="widget in widgets.top">
              <div v-html="widget.content"></div>
            </div>
            <div class="uk-margin-large" v-html="page.content"></div>
            <div v-for="widget in widgets.bottom">
              <div v-html="widget.content"></div>
            </div>
          </div>
          <div class="uk-width-medium">
            <div v-for="widget in widgets.sidebar">
              <div v-html="widget.content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerbar/>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Navbar from '~/components/Navbar'
  import Footerbar from '~/components/Footerbar'

  export default {
    computed: {
      widgets () { return this.$store.state.widgets }
    },
    components: {
      Navbar, Footerbar
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    asyncData ({ params, error }) {
      return axios.get('/site/pages/' + process.env.apiKey, {params: {api_key: process.env.apiKey}})
        .then((res) => {
          return { page: res.data }
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Page not found' })
        })
    },
    head () {
      return {
        title: this.page.metatitle,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.page.metakeywords },
          { hid: 'description', name: 'description', content: this.page.metadescription }
        ]
      }
    }
  }
</script>

<style>
</style>
