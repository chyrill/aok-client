<template>
    <div>
        <div class="pt-3 pb-5">
            <divider title="recently sold artworks" />
        </div>
        <div id="wrapper">
            <div v-for="(item, id) in RecentlySoldItems" :key="id" id="grid-item">
                <sold-item-comp :title="item.title" :year="item.year" :price="item.price" :image="item.image" :artist="item.artist" />
            </div>
        </div>
        <div class="pt-4 pb-3" style="text-align:center">
            <v-btn flat class="hidden-sm-and-down">view all recently sold artworks</v-btn>
        </div>
    </div>
</template>


<style scoped>
    #wrapper {
        display: grid;
        grid-template-columns: repeat(5,1fr);
        grid-template-rows: auto;
        grid-gap: 10px;
    }
     @media only screen and (max-width: 768px)  {
        #wrapper {
            display: grid;
            grid-template-columns: repeat(10, 225px);
            grid-template-rows: auto;
            grid-gap: 20px;
            overflow-x: auto;
        }
    }
</style>

<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import data from '@/src/data/recently_sold_data'
import soldItemCard from '../reusables/solditemcard'

export default {
    components: {
        divider,
        'sold-item-comp' : soldItemCard
    },
    data () {
        return {
            RecentlySoldItems : []
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        getData () {
            this.RecentlySoldItems = data.RecentlySoldData
            console.log(this.RecentlySoldItems)
        }
    }
}
</script>


