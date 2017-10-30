<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-container">
        <h1>Shop</h1>
        <h2>{{count}} {{category.title}}</h2>
        <div uk-grid uk-height-match="target: .uk-card-title">
          <div class="uk-width-1-3" v-for="product in products">
            <div class="uk-card uk-card-default">
              <div class="uk-card-media-top" v-if="product.image">
                <nuxt-link :to="{ name: 'products-id', params: { id: product.slug }}"><img :src="product.image" alt=""></nuxt-link>
              </div>
              <div class="uk-card-body">
                <h3 class="uk-card-title">{{product.title}}</h3>
                <p>{{product.product_price | currency }}</p>
                <p>{{product.content}}</p>
                <a href="#" class="uk-button uk-button-primary">Add to Card</a>
              </div>
            </div>
          </div>
        </div>
        <pagination
          :current="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          @page-changed="fetchCategory"
        ></pagination>
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
    data () {
      return { currentPage: 1, totalPages: 0, perPage: 6, category: [], products: [], count: 0 }
    },
    components: {
      Navbar, Footerbar, Pagination
    },
    fetch ({ store, params }) {
      return store.dispatch('run')
    },
    methods: {
      fetchCategory: function (page) {
        return axios.get('/shop/categories/' + this.$route.params.id, {params: {per_page: this.perPage, page: page, api_key: process.env.apiKey}})
          .then((res) => {
            this.category = res.data
            this.products = res.data.products.data
            this.totalPages = res.data.products.page.total_pages
            this.currentPage = res.data.products.page.current_page
            this.count = res.data.products.count
          })
      }
    },
    created: function () {
      this.fetchCategory(this.currentPage)
    },
    head () {
      return {
        title: this.category.title
      }
    }
  }
</script>

<style>
</style>
