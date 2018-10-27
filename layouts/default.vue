<template>
  <v-app>
    <Navigation1/>
    <socket-comp v-if="isAuthenticated"/>
  </v-app>
</template>

<script>
/* eslint-disable */
import Navigation1 from '@/components/navigation/navigation1'
import GET_PROFILE_QUERY from '@/graphql/user/getmyprofile'
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
      this.$store.commit('authentication/set', localStorage.getItem('token'))
    }

    this.$store.watch(
      (state) => {
        if(state.authentication) {
          this.isAuthenticated = state.authentication.isAuthenticated
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
    getmyprofile: {
      query: GET_PROFILE_QUERY
    }
  },
  watch: {
    getmyprofile: function(val) {
      if(val) {
        this.$store.commit('profile/set', val.Model.profile)
        this.$store.commit('authentication/setId', val.Model._id)
        this.$store.commit('notifications/set', val.Model.notifications)
        this.$store.commit('paymentmethods/set', val.Model.paymentMethods)
        this.$store.commit('shippingaddress/set', val.Model.shippingAddress)
      }
    },
    token: function(val) {
      if(val){
        this.$store.commit('authentication/set', val)
      }
    }
  },
  computed: {
    token() {
      return this.$store.state.authentication.token
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
