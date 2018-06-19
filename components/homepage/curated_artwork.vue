<template> 
    <div>
        <div class="pt-5 pb-5">
            <divider title="curated artwork" />
        </div>
        <div id="wrapper">
            <div v-for="item in CuratedArtworkList" :key="item.title" id="grid_item_list">
                <v-card>
                    <v-card-media>
                        <img :src="item.image" height="200px"/>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span><b> {{item.title}}, {{item.year}} </b> </span> <br>
                            <span style="color: grey">{{item.artist}} </span>
                        </div>
                    </v-card-title>
                </v-card>
            </div>
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import data from '@/src/data/artworkdata.json'
import divider from '../reusables/dividers';

export default {
    data () {
        return {
            CuratedArtworkList : []
        }
    },
    mounted () {
        this.getCuratedArtwork()
    },
    methods: {
        getCuratedArtwork () {
            this.CuratedArtworkList = data.data
        }
    },
    components: {
        divider
    }
}
</script>

<style scoped>
    #wrapper {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: 300px;
        grid-gap: 10px;
    }
    #grid_item_list {
        grid-column: auto;
    }

    @media only screen and (max-width: 600px)  {
        #wrapper {
            display: grid;
            grid-template-columns: repeat(4, 80vw);
            grid-template-rows:300px;
            grid-gap: 15px;
            overflow-x:auto;
        }
        #grid_item_list {
            grid-column: auto;
        }
    }
     * {
        font-family: 'Nunito Sans', sans-serif;
    }
</style>