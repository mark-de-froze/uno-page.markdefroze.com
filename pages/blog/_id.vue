<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true" class="uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-container uk-container-small">
        <article class="uk-article">
          <div v-show="post.image" class="uk-cover-container uk-height-large">
            <img :src="post.image" :alt="post.title" uk-cover>
          </div>
          <h1 class="uk-article-title">
            <nuxt-link class="uk-link-reset" :to="{ name: 'blog-id', params: { id: post.slug }}">{{post.title}}</nuxt-link>
          </h1>
          <p class="uk-article-meta">Written by {{author.email}} on {{post.created_at | moment("MMMM D, YYYY") }}. Posted in <nuxt-link :to="{ name: 'blog' }">Blog</nuxt-link></p>
          <div v-html="post.content"></div>
        </article>

        <div class="uk-margin-top" v-if="comments">
          <h2>{{count}} Comments</h2>
          <article class="uk-comment uk-margin-bottom" v-for="comment in comments">
            <header class="uk-comment-header uk-grid-medium uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                <img class="uk-comment-avatar uk-border-circle" :src="comment.gravatar_url" width="50" height="50" alt="">
              </div>
              <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove">{{comment.from_name}}</h4>
                <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                  <li>{{comment.created_at | moment("from", true) }}</li>
                </ul>
              </div>
            </header>
            <div class="uk-comment-body">
              <p>{{comment.comment}}</p>
            </div>
          </article>
        </div>
        <pagination
          :current="currentPage"
          :total-pages="totalPages"
          :per-page="perPage"
          @page-changed="fetchPost"
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
      return { currentPage: 1, totalPages: 0, perPage: 5, post: [], author: [], comments: [], count: 0 }
    },
    components: {
      Navbar, Footerbar, Pagination
    },
    fetch ({ store, params }) {
      return store.dispatch('run')
    },
    methods: {
      fetchPost: function (page) {
        return axios.get('/blog/posts/' + this.$route.params.id, {params: {per_page: this.perPage, page: page, api_key: process.env.apiKey}})
          .then((res) => {
            this.post = res.data
            this.author = res.data.user
            this.comments = res.data.comments.data
            this.totalPages = res.data.comments.page.total_pages
            this.currentPage = res.data.comments.page.current_page
            this.count = res.data.comments.count
          })
      }
    },
    created: function () {
      this.fetchPost(this.currentPage)
    },
    head () {
      return {
        title: this.$store.state.post.metatitle,
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.$store.state.post.metakeywords },
          { hid: 'description', name: 'description', content: this.$store.state.post.metadescription }
        ]
      }
    }
  }
</script>

<style>
</style>
