<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-container uk-container-small">
        <article class="uk-article" v-for="post in posts">
          <div v-show="post.image" class="uk-cover-container uk-height-large">
            <img :src="post.image" :alt="post.title" uk-cover>
          </div>
          <h1 class="uk-article-title">
            <nuxt-link class="uk-link-reset" :to="{ name: 'blog-id', params: { id: post.slug }}">{{post.title}}</nuxt-link>
          </h1>
          <p class="uk-article-meta">Written by <a href="#">Super User</a> on 12 April 2012. Posted in <a href="#">Blog</a></p>
          <p v-html="post.content"></p>
          <div class="uk-grid-small uk-child-width-auto" uk-grid>
            <div>
                <nuxt-link class="uk-button uk-button-text" :to="{ name: 'blog-id', params: { id: post.slug }}">Read more</nuxt-link>
            </div>
            <div>
              <nuxt-link class="uk-button uk-button-text" :to="{ name: 'blog-id', params: { id: post.slug }}">Comments</nuxt-link>
            </div>
          </div>
          <hr class="uk-margin-large-top">
        </article>
        <pagination
          :current="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          @page-changed="fetchPosts"
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
    computed: {
    },
    data (context) {
      return { currentPage: 1, totalPages: 0, perPage: 5, posts: [] }
    },
    components: {
      Navbar, Footerbar, Pagination
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    head () {
      return {
        title: 'Blog'
      }
    },
    methods: {
      fetchPosts: function (page) {
        return axios.get('/blog/posts', {params: {per_page: this.perPage, page: page, api_key: process.env.apiKey}})
          .then((res) => {
            this.totalPages = res.data.page.total_pages
            this.currentPage = res.data.page.current_page
            this.posts = res.data.data
          })
      }
    },
    created: function () {
      this.fetchPosts(this.currentPage)
    }
  }
</script>

<style>
</style>
