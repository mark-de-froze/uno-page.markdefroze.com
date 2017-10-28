<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-top uk-margin-bottom uk-container" v-html="page.content"></div>
    <footerbar/>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'
  import Navbar from '~/components/Navbar'
  import Footerbar from '~/components/Footerbar'

  export default {
    components: {
      Navbar, Footerbar
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    asyncData ({ params, error }) {
      return axios.get('/site/pages/' + params.id, {params: {api_key: process.env.apiKey}})
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
