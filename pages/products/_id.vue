<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-top uk-margin-bottom uk-container">
      <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
        <div class="uk-card-media-left uk-inline">
          <div class="uk-position-top-right uk-padding-small" uk-lightbox>
            <a :href="product.image" :data-caption="product.title" class="uk-icon-button" uk-icon="icon: plus-circle"></a>
          </div>
          <img :src="product.image" alt="">
        </div>
        <div>
          <div class="uk-card-body">
            <h3 class="uk-card-title">{{product.title}}</h3>
            <div>{{product.product_price | currency}}</div>
            <p>{{product.content}}</p>
            <div>
              <strong>Categories: </strong>
              <nuxt-link :to="{ name: 'shop-id', params: { id: product.category.slug }}">{{product.category.title}}</nuxt-link>
            </div>
            <div>
              <strong>SKU: </strong>
              {{product.sku}}
            </div>
            <hr>
            <div class="uk-float-left">
              <a href="" class="uk-icon-button uk-margin-small-right" uk-icon="icon: twitter"></a>
              <a href="" class="uk-icon-button  uk-margin-small-right" uk-icon="icon: facebook"></a>
              <a href="" class="uk-icon-button" uk-icon="icon: google-plus"></a>
            </div>
            <div class="uk-float-right">
              <a href="#" class="uk-button uk-button-primary">Add to Card</a>
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
    components: {
      Navbar, Footerbar
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    asyncData ({ params, error }) {
      return axios.get('/shop/products/' + params.id, {params: {api_key: process.env.apiKey}})
        .then((res) => {
          return { product: res.data }
        })
        .catch((e) => {
          error({ statusCode: 404, message: 'Product not found' })
        })
    },
    head () {
      return {
        title: this.product.metatitle,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.product.metakeywords },
          { hid: 'description', name: 'description', content: this.product.metadescription }
        ]
      }
    }
  }
</script>

<style>
</style>
