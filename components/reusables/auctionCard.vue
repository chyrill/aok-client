<template>
    <div>
        <v-card height="600" class="pa-1">
            <v-card class="grey lighten-4" >
                <v-card-media height="350">
                    <img :src="image" /> 
                </v-card-media>
            </v-card>
            <v-card-title>
                <div style="width:100%">
                    <span style="text-transform: uppercase; float:left"><b>{{title}}, {{year}}</b></span> <span style="float: right"><b>{{price}}</b></span> <br>
                    <span style="color:grey;">{{artist}}</span> <br>
                    <span style="color:grey;">{{meduim}}</span> <br>
                    <span style="color:grey;">{{size}}</span>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text style="text-align:center">
                with the purchase of this artwork,
                <b>Red Cross Germany</b> will receive $200
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-layout row wrap>
                    <v-btn block color="black" outline style="text-transform: none">Place a bid</v-btn><v-btn block color="black"  style="text-transform: none" dark>Buy Now</v-btn>
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
export default {
    props: [ 'title', 'artist' , 'year', 'size', 'meduim', 'price', 'image']
}
</script>
