<template>
    <div>
        <v-card :flat="flat">
            <v-layout row wrap>
                <v-flex xs6 md4>
                    <v-container fluid fill-height justify-center>
                        <v-card class="grey ligthen-3" height="150px" width="150px">
                            <v-container fill-height fluid justify-center style="padding: 0">
                                <img :src="order.artwork.pictures[0]" id="pic"/>
                            </v-container>
                        </v-card>
                    </v-container>
                </v-flex>
                <v-flex xs6 md8>
                    <div class="pt-3">
                        <h3>{{order.artwork.title}}, {{order.artwork.year}}</h3>
                        {{order.artwork.artist.fullName}} <br> <br>
                    </div> 
                    <v-layout row wrap class="pr-3">
                        <v-flex xs6 class="gry">
                            Initail Price:
                        </v-flex>
                        <v-flex class="gry rgt">
                            <money-comp currency="$" :value="order.artwork.bids.items[0].amount" />
                        </v-flex>
                        <v-flex xs6 class="gry">
                            Medium:
                        </v-flex>
                        <v-flex class="gry rgt" xs6>
                            {{order.artwork.medium}}
                        </v-flex>
                        <v-flex class="gry" xs6>
                            Dimensions:
                        </v-flex>
                        <v-flex class="gry rgt" xs6>
                            {{order.artwork.height}} x {{order.artwork.width}} {{order.artwork.measurement}}
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center">
                    <span class="gry">
                        with this purchase of this artwork, <money-comp currency="$" :value="pledgeAmount" /> will be donated to <v-avatar size="10px"><img :src="order.artwork.charity.displayPicture" /></v-avatar> <span style="font-weight: 700; color: balck">{{order.artwork.charity.name}}</span>
                    </span>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-layout row wrap class="pa-3">
                <v-flex class="gry" xs6>
                    Subtotal ({{order.buyNow ? 'Buy it now price' : 'Bid price'}})
                </v-flex>
                <v-flex class="rgt" xs6>
                    <money-comp currency="$" :value="order.price" />
                </v-flex>
                <v-flex class="gry" xs6>
                    Shipping
                </v-flex>
                <v-flex class="rgt" xs6>
                    <money-comp currency="$" :value="shippingRate" />
                </v-flex>
                <v-flex class="gry" xs6>
                    Tax
                </v-flex>
                <v-flex class="rgt" xs6>
                    <money-comp currency="$" :value="order.tax" />
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs6>
                        <h3>Total</h3>
                    </v-flex>
                    <v-flex xs6 class="rgt">
                        <h3><money-comp currency="$" :value="totalAmount" /></h3>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import moneyconversionComp from '@/components/helpers/moneyconversion'

export default {
    props: {
        order: {
            type: Object
        },
        shippingrate: {
            type: Object
        },
        flat: {
            type: Boolean
        }
    },
    components: {
        'money-comp' : moneyconversionComp
    },
    computed: {
        pledgeAmount () {
            return Math.floor(this.order.price * (this.order.artwork.pledge / 100))
        },
        shipping () {
            return !this.order.shippingRate ? 0 : this.order.shippingRate 
        },
        shippingRate () {
            return this.shippingrate === null || this.shippingrate === undefined ? this.shipping : this.shippingrate.rate
        },
        totalAmount () {
            return this.shippingRate + this.order.tax + this.order.price
        }
    }
}
</script>

<style scoped>
    #pic {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
    .gry {
        color: gray;
    }
    .rgt {
        text-align: right !important;
    }
</style>
