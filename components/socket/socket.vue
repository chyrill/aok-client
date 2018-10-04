<template>
    <div></div>
</template>

<script>
/* eslint-disable */
import io from 'socket.io-client'
import { API_ROUTE } from '@/config/routes'
import eventBus from '@/plugins/eventbus'
import { TRANSFROM_DATA_TO_NOTIFICATION_PLACE_ORDER } from './methods'

const socket = io(API_ROUTE);

export default {
  mounted() {
    this.$store.watch(
        state => {
            if (state.profile) {
                 if(state.profile.profile) {
                    this.profileId = state.profile.profile._id
                }
            }
        }
    )
    eventBus.$on('bidNotify', (data) => {
        socket.emit('bidNotification', {
            bidderId: data.bidderId,
            artworkId : data.artworkId,
            fullName: this.getFullName(),
            amount: data.amount
        })
    })
    socket.on('notification', (data) => {
        if(data.recipientId === this.profileId) {
            var audio = new Audio('/ding.mp3')
            eventBus.$emit('notification', { show: true, title: 'AOK-CLIENT', message: data.message})
            this.$store.dispatch('addNotification', data)
            audio.play()
        }
    })

    eventBus.$on('buyNotify', (data) => {
        socket.emit('buyNotification', {
            orderId: data._id,
            fullName: this.getFullName()
        })
    })

    eventBus.$on('placeorder', data => {
        socket.emit('placeorder', TRANSFROM_DATA_TO_NOTIFICATION_PLACE_ORDER(data))
    })
 },
 methods: {
     getFullName () {
         return this.$store.state.profile.profile.fullName
     }
 },
 data: () => ({
    profileId: null
 })
}
</script>
