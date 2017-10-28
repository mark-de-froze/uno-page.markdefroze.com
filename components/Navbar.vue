<template>
  <div>
    <div id="offcanvas" uk-offcanvas="mode: push; overlay: true">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close></button>
        <ul class="uk-nav uk-nav-primary">
          <li v-for="link in links.main" v-show="link.is_visible_offcanvas" :class="{ 'uk-active': path === link.url }">
            <a :href="link.url">{{link.title}}</a>
          </li>
        </ul>
        <div v-for="widget in widgets.offcanvas">
          <div v-html="widget.content"></div>
        </div>
      </div>
    </div>
    <nav class="uk-navbar-container">
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
              <li v-for="link in links.main" v-show="link.is_visible_main" :class="{ 'uk-active': path === link.url }">
                <a :href="link.url">{{link.title}}</a>
              </li>
            </ul>
          </div>
          <div class="uk-navbar-right">
            <a href="#offcanvas" uk-toggle class="uk-hidden@m" uk-icon="icon: menu"></a>
          </div>
        </div>
      </div>
    </nav>
    <div v-for="widget in widgets.navbar">
      <div v-html="widget.content"></div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      widgets () { return this.$store.state.widgets },
      links () { return this.$store.state.links },
      path () { return this.$route.path }
    }
  }
</script>
<style>
</style>
