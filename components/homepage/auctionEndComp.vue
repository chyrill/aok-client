<template>
    <div>
        <div class="pt-3 pb-5">
            <divider title="Auctions ending today" />
        </div>
        <div id="wrapper">
            <div v-for="item in AuctionList" :key="item.title" id="grid-item">
                <auction-card :title="item.title" :image="item.image" :size="item.size" :price="item.price" :artist="item.artist" :year="item.year" :meduim="item.meduim"/>
            </div>
        </div>
    </div>
</template>


<script>
/* eslint-disable */

import divider from '../reusables/dividers'
import auctionCard from '../reusables/auctionCard'
import data from '@/src/data/sample-auction-data'

export default {
    components: {
        divider,
        'auction-card' : auctionCard
    },
    data () {
        return {
            AuctionList : []
        }
    },
    mounted () {
        this.getAuctionList();
    },
    methods : {
        getAuctionList () {
            this.AuctionList = data.AuctionList
        }
    }
}
</script>

<style scoped>
    #wrapper {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: auto;
    }
    #grid-item {
        grid-column: 1fr;
    }
    @media only screen and (max-width: 768px)  {
        #wrapper {
            display: grid;
            grid-template-columns: repeat(3,90vw);
            grid-template-rows: auto;
            grid-gap: 15px;
            overflow-x:auto;
        }
    }
</style>


