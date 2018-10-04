<template>
    <div>
        <div class="pt-3 pb-5">
            <divider title="recently sold artworks" />
        </div>
        <div id="wrapper">
            <div v-for="(item, id) in getrecentlysold" :key="id" id="grid-item">
                <sold-item-comp :title="item.artwork.title" :year="item.artwork.year" :price="item.price" :image="item.artwork.pictures[0]" :artist="item.artwork.artist.fullName" />
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
import SoldItemLoad from '@/components/reusables/loading/solditemload'
import GET_RECENTLY_SOLD from '@/graphql/order/getrecentlysold'

export default {
    components: {
        divider,
        'sold-item-comp' : soldItemCard,
        'sold-item-load' : SoldItemLoad
    },
    data: () => ({
        show: false
    }),
    apollo: {
        getrecentlysold: {
            query: GET_RECENTLY_SOLD
        }
    }
}
</script>


