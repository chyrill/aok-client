<template>
    <div>
        <v-card height="600px">
            <v-card-text >
                <div style="padding-bottom: 25px; height: 24px;" v-if="artwork.status === 'ON-GOING'">
                    <span  style="float: left; font-size: 16px; color: grey">Auction will end in</span> <span style="float: right; font-size: 24px"><count-down-comp :dateEnd="artwork.auctionEndDate"/></span>
                </div>
                <div v-if="artwork.status === 'SOLD' || artwork.status === 'PAID' || artwork.delivered === 'COMPLETE'">
                    <span>This artworks has been sold.</span>
                </div>
                 <div v-else-if="artwork.status === 'EXPIRED'">
                    <span>This Auction has ended.</span>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div class="pt-1" style="width:100%; line-height: 1.6">
                    <span style="font-size:20px; font-weight: 700; float: left; height: 24px;">{{artwork.title}}, {{artwork.year}}</span> <span style="float:right"><v-btn icon fab small :disabled="!isAuthenticated" :flat="follow" :color="follow? 'pink': 'white'" @click="like"><v-icon>{{ follow ? 'favorite' : 'favorite_border'}}</v-icon></v-btn><v-btn icon fab small style="background-color: #3b5bdb" dark><v-icon>fab fa-facebook-f</v-icon></v-btn></span><br>
                </div>
                <div class="pt-2">
                  <span style="font-size: 16px;">  <a :href="'/artists/' + artwork.artist._id"  style="text-decoration: none; color: black;">{{artwork.artist.fullName}}</a></span>
                </div>
                <div class="pt-5 pb-3" style="font-size: 16px;">
                    <span id="left_item" style="color: grey">Initial Price</span> <span id="right_item" style="font-weight:600"><money-comp currency="$" :value="initialPrice"/></span> <br>
                    <span id="left_item" style="color: grey">Medium</span> <span id="right_item" style="color: grey">{{artwork.medium}}</span> <br>
                    <span id="left_item" style="color: grey">Dimensions</span> <span id="right_item" style="color: grey">{{artwork.length}} x {{artwork.width}} x {{artwork.height}} {{artwork.distanceUnit}}</span> <br>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center" class="pt-2 pb-2">
                    with the purchase of this artwork, <b><span><money-comp currency="$" :value="pledgeAmount" /></span></b> will be donated to <v-avatar size="15px"><img :src="artwork.charity.displayPicture"></v-avatar><b>{{artwork.charity.name}}</b>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div id="wrapper">
                    <div>
                        <v-text-field prefix="$" solo class="txt_fld" v-model="bid" flat type="number" :disabled="artwork.status==='3'|| artwork.status === '4' || artwork.status === '5' || artwork.status === '6' || !isAuthenticated"></v-text-field>
                    </div>
                    <div>
                        <v-btn block :disabled="bid === null || bid <= initialPrice || loading || artwork.status === '3' || artwork.status == 6" outline style="text-transform: none; height: 50px;margin-top: 0; font-weight: 600; border: 2px solid" @click="submitBid">Place bid</v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center">
                    <v-btn block :dark="artwork.status != 'SOLD' && !disableBuyNow && artwork.status != 'PAID' && artwork.status != 'COMPLETE' && isAuthenticated" color="black" :disabled="artwork.status === 'SOLD' || disableBuyNow || artwork.status === 'PAID' || artwork.status === 'COMPLETE' || !isAuthenticated" style="height: 80px; text-transform: none;font-size: 16px; font-weight: 700;" @click="buyNow">Buy now -  <money-comp currency="$" :value="artwork.sellingPrice"/></v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>




<script>
/* eslint-disable */
import countdownComp from '@/components/helpers/countdown'
import moneyConversionComp from '@/components/helpers/moneyconversion'
import ADD_BID_MUTATION from '@/graphql/bid/addbid'
import eventBus from '@/plugins/eventbus'
import FOLLOW_MUTATION from '@/graphql/follow/follow'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    data () {
        return {
            isActive : false,
            bid: null,
            loading: false,
            follow: false,
            isAuthenticated: false
        }
    },
    mounted () {
        this.follow = this.artwork.liked
        this.$store.watch(
            state => {
                if(state.authentication) {
                    this.isAuthenticated = state.authentication.isAuthenticated
                }
            }
        )
    },
    components: {
        'count-down-comp' : countdownComp,
        'money-comp': moneyConversionComp
    },
    computed: {
        initialPrice () {
            return this.artwork.bids.totalCount > 0 ? this.artwork.bids.items[0].amount : 0
        },
        pledgeAmount () {
            return this.artwork.bids.totalCount > 0 ? Math.trunc((this.artwork.bids.items[0].amount * (this.artwork.pledge / 100))) : Math.trunc((this.artwork.sellingPrice * (this.artwork.pledge / 100)))
        },
        auctionEnded () {
            return new Date(this.artwork.auctionEndDate) <= new Date () ? true : false
        },
        disableBuyNow () {
            return this.artwork.sellingPrice < this.initialPrice
        }
    },
    methods: {
        async submitBid () {
            this.triggerLoading ()
            var data = this.loadDataToSumitDataBid() 
            try {
                this.$apollo.mutate({
                    mutation: ADD_BID_MUTATION,
                    variables: data
                }).then(response => {
                    const { Message, Successful, Model } = response.data.addbid
                    if(!Successful) {
                        this.triggerAlert(Message, 'red', 'close')
                        this.triggerLoading()
                    } else {
                        this.triggerAlert(Message, 'green', 'check')
                        eventBus.$emit('bidnotification', { artworkId: this.$route.params.id, bidderId: Model.bidderId })
                        this.triggerLoading()
                        window.location.reload()
                    }
                }).catch(errors => {
                    alert(errors)
                })
            }
            catch(err) {
                console.log(err)
            }
        },
        loadDataToSumitDataBid () {
            return {
                artworkId: this.artwork._id,
                amount: this.bid 
            }
        },
        triggerAlert(message, color, action) {
            eventBus.$emit('error', {message: message, color: color, action: action})
        },
        triggerNotify(data) {
            eventBus.$emit('bidNotify', data)
        },
        triggerLoading () {
            eventBus.$emit('loading')
        },
        buyNow () {
            this.$emit('buynow')
        },
        async like() {
            this.$apollo.mutate({
                mutation: FOLLOW_MUTATION,
                variables: {
                    id: this.$route.params.id,
                    type: 'Artwork'
                }
            })
            .then(res => {
                this.follow = res.data.follow
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>


<style scoped>
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    .material-icons {
        font-family: 'Material Icons' !important;
    }
    .fab {
        font-family: Font Awesome\ 5 Brands !important;
    }
    #left_item {
        float: left;
    }
    #right_item {
        float: right;
    }
    .txt_fld {
        border: 1px solid grey;
    }
    #wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 70% 20%;
        grid-gap: 10px;
    }
</style>


