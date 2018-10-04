<template> 
    <div>
        <div class="pt-5 pb-5">
            <divider title="curated artwork" />
        </div>
        <div id="wrapper">
            <div v-if="show" v-for="(item, index) in CuratedArtworkList" :key="index" id="grid_item_list">
                <v-card :to="'/artworks/' + item._id">
                    <v-card-media>
                        <img :src="item.pictures[0]" height="200px"/>
                    </v-card-media>
                    <v-card-title>
                        <div>
                            <span><b> {{item.title}}, {{item.year}} </b> </span> <br>
                            <span style="color: grey">{{item.artist.fullName}} </span>
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
import GET_ARTWORKS_QUERY from '@/graphql/artwork/getmostfavorite'

export default {
    data () {
        return {
            CuratedArtworkList : [],
            show: false
        }
    },
    components: {
        divider
    },
    apollo: {
        getmostfavorite: {
            query: GET_ARTWORKS_QUERY
        }
    },
    watch: {
        getmostfavorite: function (val) {
            if(val) {
                this.CuratedArtworkList = val
                this.show = true
            }
        }
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

    @media only screen and (max-width: 768px)  {
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