<template>
    <div>
        <div class="pt-3 pb-5">
            <divider :title= "title" />
        </div>
        <div id="wrapper">
            <div v-for="(item, index) in artworks" :key="index">
                <priced-artwork-comp :artwork="item" />
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import pricedArtwork from '../reusables/pricedartworks'

export default {
    props : {
        title : {
            type: String
        },
        artworks : {
            type: Array
        }
    },
    components : {
        divider,
        'priced-artwork-comp': pricedArtwork
    },
    watch: {
        artworks: function (val) {
            if(val) {
                this.show = true
            }
        }
    },
    data: () => ({
        show: false
    }),
    mounted () {
        console.log(this.artworks)
    }    
}
</script>


<style scoped>
    #wrapper {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: 300px;
        grid-gap: 15px;
    }
    @media screen and (max-width: 768px) {
        #wrapper {
            display: grid;
            grid-template-columns: repeat(4,225px);
            grid-template-rows: 300px;
            grid-gap: 15px;
            overflow-x: auto;
        }
    }
</style>

