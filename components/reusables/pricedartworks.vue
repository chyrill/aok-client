<template>
    <v-card class="pa-1" height="300" :to="'/artworks/' + artwork._id">
        <v-card-media height="204">
            <v-card class="grey lighten-4">
                <img :src="artwork.pictures[0]" />
            </v-card>
        </v-card-media>
        <v-card-title>
            <div style="width:100%">
                <span><b>{{artwork.title}}, {{artwork.year}}</b></span> <br>
                <span style="color: grey">{{artwork.artist.fullName}}</span> <br>
                <span style="color: grey"><price-comp currency="$" :value="artwork.sellingPrice" /> </span>
            </div>
        </v-card-title>
    </v-card>
</template>


<style scoped>
    #redBall {
        background-color: red;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }
    img {
        width:100%;
        height: 100%;
        object-fit: cover;
    }
</style>

<script>
/* eslint-disable */
import moneyconverion from '@/components/helpers/moneyconversion'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    components : {
        'price-comp': moneyconverion
    },
    data: () => ({
        show: false
    }),
    watch: {
        artwork: function(val) {
            if(val) {
                this.show = true
            }
        }
    },
    mounted() {
        console.log(this.artwork)
    }
}
</script>


