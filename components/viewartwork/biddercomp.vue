<template>
    <div>
        <v-card id="main">
            <v-card-title>
                <h1>Bidders</h1>
            </v-card-title>
            <div class="pt-2 pl-2 pr-2" id="bids">
                <v-list v-for="(item, index) in bids.items" :key="index" two-line subheader>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="item.bidder.displayPicture ? item.bidder.displayPicture : '/icon_avatar.png'" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.bidder.fullName}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{item.bidder.country}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <span style="font-weight: 600"><money-comp currency="$" :value="item.amount" /></span> 
                            <v-list-tile-sub-title><elapsed-time-comp :dateVal="item.dateCreated" /></v-list-tile-sub-title>
                        </v-list-tile-action>
                    </v-list-tile>
                    <v-divider></v-divider>
                </v-list>
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import moneyConversionComp from '@/components/helpers/moneyconversion'
import elapsedTimeComp from '@/components/helpers/elapsedtime'

export default {
    props: {
        bids: {
            type: [Object]
        }
    },
    mounted () {
        console.log(this.bids)
    },
    components: {
        'money-comp' : moneyConversionComp,
        'elapsed-time-comp' : elapsedTimeComp
    }
}
</script>



<style scoped>
    #main {
        height: 620px !important;
    }
    @media screen and (max-width: 768px) {
        #main {
            min-height: 620px;
            height: 100%;
        }
    }
    #bids {
        overflow-y: auto;
        height: 80%;
    }
</style>

