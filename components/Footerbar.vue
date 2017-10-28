<template>
  <section class="uk-background-secondary">
    <div v-for="widget in widgets.footer">
      <div v-html="widget.content"></div>
    </div>
    <footer class="uk-height-small uk-padding">
      <div class="uk-flex uk-flex-center">
        <ul class="uk-subnav uk-margin">
          <li><a href="" uk-icon="icon: facebook"></a></li>
          <li><a href="" uk-icon="icon: instagram"></a></li>
          <li><a href="" uk-icon="icon: twitter"></a></li>
        </ul>
      </div>
      <div class="uk-flex uk-flex-center">
        <ul class="uk-subnav uk-margin">
          <li><a href="#">Street, Country</a></li>
          <li><a href="#">(123) 456-7899</a></li>
          <li><a href="#">email@example.com</a></li>
        </ul>
      </div>
    </footer>
  </section>
</template>
<script>
  export default {
    computed: {
      widgets () { return this.$store.state.widgets },
      settings () { return this.$store.state.settings }
    }
  }
</script>
<style>
</style>
