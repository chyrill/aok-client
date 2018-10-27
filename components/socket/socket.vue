<template>
    <div></div>
</template>

<script>
/* eslint-disable */
import io from 'socket.io-client'
import { API_ROUTE } from '@/config/routes'
import eventBus from '@/plugins/eventbus'
import { TRANSFROM_DATA_TO_NOTIFICATION_PLACE_ORDER } from './methods'
import { setTimeout } from 'timers';

const socket = io(API_ROUTE);

export default {
  mounted() {
    this.$store.watch(
        state => {
            if (state.authentication.id) {
                 if(state.authentication.id) {
                    this.id = state.authentication.id
                }
            }
        }
    )
    eventBus.$on('bidnotification', (data) => {
        socket.emit('bidNotification', { artworkId: data.artworkId, userId: data.bidderId })
        setTimeout(() => {
            window.location.reload(true)
        }, 2000)
    })
    socket.on('notification', (data) => {
        if(data.recipientId === this.id) {
            var audio = new Audio('/ding.mp3')
            eventBus.$emit('notification', { show: true, title: 'AOK-CLIENT', message: data.message})
            this.$store.commit('notification/add', data)
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
    id: null
 })
}
</script>
