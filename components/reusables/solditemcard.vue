<template>
    <v-card class="pa-1" height="300">
        <v-card-media height="204">
            <v-card class="grey lighten-4">
                <img :src="image" />
            </v-card>
        </v-card-media>
        <v-card-title>
            <div style="width:100%">
                <span style="float: left;"><b>{{title}}, {{year}}</b></span> <span style="float: right"><div id="redBall"></div></span> <br>
                <span style="color: grey">{{artist}}</span> <br>
                <span style="color: grey"><money-comp currency="$" :value="price" /></span>
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
import MoneyConversion from '@/components/helpers/moneyconversion'

export default {
    props: [ 'title', 'year', 'price', 'artist', 'image' ],
    components: {
        'money-comp' : MoneyConversion
    }
}
</script>


