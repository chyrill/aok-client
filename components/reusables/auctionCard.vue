<template>
    <div>
        <v-card height="600" class="pa-1">
            <v-card class="grey lighten-4" >
                <v-card-media height="350">
                    <img :src="artwork.pictures[0]" /> 
                </v-card-media>
            </v-card>
            <v-card-title>
                <div style="width:100%">
                    <span style="text-transform: uppercase; float:left"><b>{{artwork.title}}, {{artwork.year}}</b></span> <span style="float: right"><b><price-comp :value="artwork.sellingPrice" currency="$" /></b></span> <br>
                    <span style="color:grey;">{{artwork.artist.fullName}}</span> <br>
                    <span style="color:grey;">{{artwork.medium}}</span> <br>
                    <span style="color:grey;">{{artwork.height}}x{{artwork.width}} {{artwork.measurement}}</span>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="text-align:center">
                with the purchase of this artwork, <v-avatar size="10"><img :src="artwork.charity.displayPicture" /></v-avatar> 
                <b> {{artwork.charity.name}}</b> will receive <span> <b><price-comp :value="amount" currency="$" /></b> </span>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-layout row wrap>
                    <v-btn block color="black" outline style="text-transform: none" @click="placeBid">Place a bid</v-btn><v-btn block color="black"  style="text-transform: none" dark @click="buyNow">Buy Now</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style scoped>
    img {
        max-width: 100%;
        max-height: 100%;
    }
</style>

<script>
/* eslint-disable */
import priceComp from '@/components/helpers/moneyconversion'
import { memoize } from 'async';
import EventBus from '@/plugins/eventbus'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    components: {
        'price-comp': priceComp
    },
    computed: {
        amount () {
            return Math.floor(this.artwork.sellingPrice * (this.artwork.pledge/100))
        }
    },
    mounted() {
        
    },
    methods: {
        placeBid () {
            EventBus.$emit('placeBid', this.artwork)
        },
        buyNow () {
            EventBus.$emit('buyNow', this.artwork)
        }
    }
}
</script>
