<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-container uk-container-small">
        <h1>Shop</h1>
        <h2>Top Categories</h2>
        <div uk-grid>
          <div class="uk-width-1-3" v-for="category in categories">
            <div class="uk-card uk-card-default">
              <div class="uk-card-media-top" v-if="category.image">
                <nuxt-link :to="{ name: 'shop-id', params: { id: category.slug }}"><img :src="category.image" alt=""></nuxt-link>
              </div>
              <div class="uk-card-body">
                <h3 class="uk-card-title">{{category.title}}</h3>
                <p>{{category.content}}</p>
              </div>
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
  import Pagination from '~/components/Pagination'

  export default {
    computed: {
    },
    data (context) {
      return { categories: [] }
    },
    components: {
      Navbar, Footerbar, Pagination
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    head () {
      return {
        title: 'Shop'
      }
    },
    methods: {
      fetchProducts: function () {
        return axios.get('/shop/categories', {params: {api_key: process.env.apiKey}})
          .then((res) => {
            this.categories = res.data
          })
      }
    },
    created: function () {
      this.fetchProducts()
    }
  }
</script>

<style>
</style>
