<template>
  <v-app>
    <Navigation1/>
    <socket-comp v-if="isAuthenticated"/>
   
  </v-app>
</template>

<script>
/* eslint-disable */
import Navigation1 from '@/components/navigation/navigation1'
import GET_PROFILE_QUERY from '@/graphql/getprofile'
import { mapValuesLimit } from 'async';
import bidComp from '@/components/dialogs/bid'
import EventBus from '@/plugins/eventbus'
import socketComp from '@/components/socket/socket'
import eventbus from '@/plugins/eventbus'

export default {
  components: {
    Navigation1,
    'bid-comp': bidComp,
    'socket-comp': socketComp
  },
  mounted() {
    if(localStorage.getItem('token')) {
      this.$apolloHelpers.onLogin(localStorage.getItem('token'))
      this.$store.dispatch('setToken', localStorage.getItem('token'))
    }

    this.$store.watch(
      (state) => {
        if(state.isAuthenticated) {
          this.isAuthenticated = true
          if(state.pendingOrders.length >= 1 ) {
            console.log(this.$route)
            if(this.$route.name !== 'order-id') {
              if(this.$route.name != 'order-confirmorder-id') {
                if(this.$route.name != 'order-purchase-id') {
                  this.$router.push('/order/' + state.pendingOrders[0]._id)
                }
              }
            }
          }
        }
      }
    )
  },
  apollo: {
    userprofile: {
      query: GET_PROFILE_QUERY
    }
  },
  watch: {
    userprofile: function(val) {
      if(val) {
        this.$store.dispatch('setProfile', val)
      }
    },
    token: function(val) {
      if(val){
        this.$store.dispatch('setAuthenticated')
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.token
    }
  },
  data: () => ({
    isAuthenticated: false,
    alert: false
  })
}
</script>

<style>
  body {
    background-color: grey;
    font-family: 'Nunito', sans-serif;
  }
  ._btn {
    text-transform: none;
  }
</style>
