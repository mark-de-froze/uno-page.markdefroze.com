<template>
  <section>
    <navbar/>
    <div uk-height-viewport="expand: true">
      <div class="uk-margin-top uk-margin-bottom uk-container">

        <form v-on:submit.prevent="sendMail()" uk-grid>
          <div class="uk-width-1-2">
            <input class="uk-input" type="text" placeholder="Your name" required v-model="mail.from_name" name="mail_name">
          </div>
          <div class="uk-width-1-2">
            <input class="uk-input" type="email" placeholder="Your e-mail" required v-model="mail.from_email" name="mail_email">
          </div>
          <div class="uk-margin uk-width-1-1">
            <input class="uk-input" type="text" placeholder="Subject mail" required v-model="mail.subject" name="mail_subject">
          </div>
          <div class="uk-margin uk-width-1-1">
            <textarea class="uk-input uk-height-small" name="mail_message" v-model="mail.message"></textarea>
          </div>
          <div class="uk-margin">
            <button type="submit" class="uk-button uk-width-1-1 uk-button-default uk-button-large uk-button-danger" uk-scrollspy="cls: uk-animation-shake; repeat: true">Send mail</button>
          </div>
        </form>

      </div>
    </div>
    <footerbar/>
  </section>
</template>

<script>
  import Navbar from '~/components/Navbar'
  import Footerbar from '~/components/Footerbar'

  export default {
    computed: {
      mail () { return this.$store.state.mail }
    },
    components: {
      Navbar, Footerbar
    },
    fetch ({store}) {
      return store.dispatch('run')
    },
    methods: {
      sendMail () {
        this.$store.dispatch('sendMail')
      }
    },
    head () {
      return {
        title: 'Contacts'
      }
    }
  }
</script>

<style>
</style>
