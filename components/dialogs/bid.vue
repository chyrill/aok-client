<template>
    <div>
        <v-card v-if="artwork">
            <v-toolbar dark  class="black">
                <v-container fluid fill-height justify-center>
                    <img src="/client-title.png" width="200px;" style="width: 200px; height: 40px;" />
                </v-container>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon @click="closeDialog"><v-icon>close</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <div v-if="isAuthenticated">
                <div>
                    <v-layout row wrap>
                        <v-flex xs6 md6>
                            <div class="pa-2">
                                Auction will end in
                            </div>
                        </v-flex>
                        <v-flex xs6 md6>
                            <div style="text-align: right" class="pr-2 pt-2">
                                <b><countdown-comp :dateEnd="artwork.auctionEndDate"/></b>
                            </div>
                        </v-flex>
                    </v-layout>
                </div>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container fill-height fluid>
                        <v-layout row wrap>
                            <v-flex xs12 md5>
                                <v-container fill-height fluid justify-center style="padding: 0 !important">
                                    <v-card class="grey ligthen-3" height="200px" width="200px">
                                        <v-container fill-height  justify-center style="padding:0">
                                            <img :src="artwork.pictures[0]" />
                                        </v-container>
                                    </v-card>
                                </v-container>
                            </v-flex>
                            <v-flex xs12 md7>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <div class="pl-2 pt-2">
                                            <h3>{{artwork.title}}, {{artwork.year}}</h3>
                                            {{artwork.artist.fullName}} 
                                            {{artwork.category}} <br>
                                            {{artwork.medium}} <br>
                                            {{artwork.height}} x {{artwork.width}} {{artwork.measurement}}
                                        </div>
                                    </v-flex>
                                    <v-flex xs12>
                                        <span style="float: left">
                                            <b>Selling Price:</b>
                                        </span>
                                        <span style="float: right">
                                        <b> <money-conversion :value="artwork.sellingPrice" currency="$" /> </b>
                                        </span>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container fluid fill-height justify-center>
                        <v-flex xs10>
                            <v-layout row wrap>
                                <v-flex xs9 md9>
                                    <v-text-field v-model="amount" solo flat style="border: 1px solid grey" :label="labelAmount" type="number" :disabled="loading"></v-text-field>
                                </v-flex>
                                <v-flex xs3 md3>
                                    <v-btn style="height: 50px; margin-top: 0" outline color="black" class="_btn" @click="submit" :disabled="amount <= Number(labelAmount) || loading"><span v-if="loading"><v-progress-circular indeterminate size="25" color="black"></v-progress-circular></span><span v-else>Place Bid</span></v-btn>
                                </v-flex>
                        </v-layout>
                        </v-flex>
                    </v-container>
                </v-card-text>
            </div>
            <div v-else>
                <v-card-text>
                    <div style="text-align: center">
                        You can't place a bid if you are a guest. <br> Log In or Sign Up.
                    </div>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import countdownComp from '@/components/helpers/countdown'
import numberConversion from '@/components/helpers/moneyconversion'
import eventBus from '@/plugins/eventbus'
import ADD_BID_MUTATION from '@/graphql/addbid'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    components: {
        'countdown-comp': countdownComp,
        'money-conversion': numberConversion
    },
    mounted() {
        this.$store.watch(
            (state) => {
                this.isAuthenticated = state.isAuthenticated
            }
        )
    },
    methods: {
        closeDialog(){
            this.amount = null
            eventBus.$emit('closeBid')
        },
        async submit() {
            this.triggerLoading()
            var data = this.loadStateToSubmitData()
            try  {
                this.$apollo.mutate({
                    mutation: ADD_BID_MUTATION,
                    variables: data
                }).then(response=> {
                    this.triggerAlert('Successfully place bid', 'green', 'check')
                    eventBus.$emit('bidNotify', { artworkId: data.artworkId, amount: data.amount, bidderId: response.data.addbid.bidderId })
                    this.closeDialog()
                }).catch(error => {
                    this.triggerAlert('You are currently the highest bidder','red','close')
                })
            }
            catch(err) {
                console.log(err)
            }
           this.triggerLoading()
        },
        loadStateToSubmitData() {
            return {
                artworkId: this.artwork._id,
                amount: this.amount
            }
        },
        triggerAlert(message, color, action){
            var data = {
                message: message,
                color: color,
                action: action
            }
            eventBus.$emit('error', data)
        },
        triggerLoading() {
            this.loading = !this.loading
        }
    },
    data:() => ({
        amount: null,
        loading: false,
        isAuthenticated: false
    }),
    computed: {
        labelAmount () {
            return this.artwork.bids.totalCount > 0 ? String(this.artwork.bids.items[0].amount) : '0'
        }
    },
    beforeDestroy(){
        this.amount = null
    }
}
</script>

<style scoped>
    img {
        object-fit: fill;
        width: 100%;
        height: 100%;
    }
</style>
