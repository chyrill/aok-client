<template>
    <div>
        <v-card style="height: 990px;">
            <v-card-title>
                <h2>Artworks</h2>
            </v-card-title>
                <div id="wrapper">
                    <div v-for="(item, index) in artworks" :key="index">
                        <price-artwork-comp v-if="show" :artwork="item"/>
                    </div>
                </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import response from '@/src/data/recently_sold_data'
import pricedArtworkComp from '../reusables/pricedartworks'

export default {
    components: {
        'price-artwork-comp': pricedArtworkComp
    },
    props: ['artworks'],
    data: () => ({
        show: false
    }),
    mounted () {
        this.show = this.artworks.length <= 0 ? false : true
    }
}
</script>

<style scoped>
    #wrapper {
        padding: 10px 10px 10px 10px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 5px;
    }
    @media screen and (max-width: 768px) {
        #wrapper {
            grid-template-columns: repeat(3, 225px);
            overflow-x: auto !important;
        }
       
    }
</style>

