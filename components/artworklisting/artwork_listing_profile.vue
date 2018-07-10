<template>
    <div>
        <v-card :height="heightCard">
            <v-card-title>
                <h2>Artworks</h2>
            </v-card-title>
            <v-card-text>
                <div class="wrapper">
                    <div v-for="(item, index) in artworks" :key="index">
                        <artwork-comp artworkHeight="295" :artwork="item" />
                    </div>
                </div>
            </v-card-text>
        </v-card>
    </div>    
</template>

<script>
/* eslint-disable */
import artworkComp from '@/components/reusables/artwork_with_price'

export default {
    props: {
        heightCard: {
            type: String
        },
        artworks: {
            type: Array
        }
    },
    components: {
        'artwork-comp': artworkComp
    },
    mounted () {
        console.log(this.artworks)
    }
}
</script>

<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: auto;
        grid-gap: 10px;
    }

    @media screen and (max-width: 768px) {
        .wrapper {
            display: grid;
            width: 100%;
            height: 900px;
            grid-template-columns: repeat(2,240px);
            grid-template-rows: auto;
            grid-gap: 10px;
            overflow-x: auto;
            overflow-y: auto;
        }
    }
</style>

