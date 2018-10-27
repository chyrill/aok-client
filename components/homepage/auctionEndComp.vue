<template>
    <div>
        <div class="pt-3 pb-5">
            <divider title="Auctions ending today" />
        </div>
        <div id="wrapper" v-if="show">
            <div v-for="(item, index) in getartworks.SearchItems" :key="index" id="grid-item">
                <auction-card :artwork="item"/>
            </div>
        </div>
    </div>
</template>


<script>
/* eslint-disable */

import divider from '../reusables/dividers'
import auctionCard from '../reusables/auctionCard'
import data from '@/src/data/sample-auction-data'
import ENDING_ARTWORK_QUERY from '@/graphql/artwork/getartworks'

const filter = {
    auctionEndDate : { $gt : new Date() },
    status: 'ON-GOING'
}
const sort = {
    auctionEndDate: 1
}

export default {
    components: {
        divider,
        'auction-card' : auctionCard
    },
    apollo: {
        getartworks: {
            query: ENDING_ARTWORK_QUERY,
            variables () {
                return {
                    filter: JSON.stringify(filter),
                    sort: JSON.stringify(sort),
                    limit: 4,
                    skip: 0
                }
            }
        }
    },
    data: () => ({
        show: false
    }),
    watch: {
        getartworks: function (val) {
            if(val) {
                this.show = true
            }
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


