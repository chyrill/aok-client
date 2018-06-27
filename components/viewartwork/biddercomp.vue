<template>
    <div>
        <v-card id="main">
            <v-card-title>
                <h1>Bidders</h1>
            </v-card-title>
            <div class="pt-2 pl-2 pr-2">
                <v-list v-for="item in bidders" :key="item.name" two-line subheader>
                    <v-list-tile avatar>
                        <v-list-tile-avatar>
                            <img :src="item.avatar" />
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                            <v-list-tile-title>{{item.name}}</v-list-tile-title>
                            <v-list-tile-sub-title>{{item.country}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                        <v-list-tile-action>
                            <span style="font-weight: 600">{{item.amount}}</span> 
                            <v-list-tile-sub-title>{{item.timeElapsed}}</v-list-tile-sub-title>
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
import response from '@/src/data/bidders_data'

export default {
    methods : {
        getBidders() {
            this.bidders = response.data
        }
    },
    data () {
        return {
            bidders : []
        }
    },
    mounted () {
        this.getBidders()
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
</style>

