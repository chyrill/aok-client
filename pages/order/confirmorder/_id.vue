<template>
    <div>
        <div class="_main">
            <v-card v-if="show">
                <v-card-title>
                    <h3>Review Order</h3> 
                    <div id="subtitle">
                        <br>
                        <b>You're almost finished! Please review and submit your order.</b>
                    </div>
                </v-card-title>
                <v-card-text v-if="show">
                    <h4>Payment</h4>
                    <v-list two-line class="pt-2" style="border: 1px solid rgba(0,0,0,.2)">
                        <v-list-tile avatar>
                            <v-list-tile-action>
                                <img :src="orderbyid.paymentMethod.cardType === 'MasterCard'? '/mastercard.png': '/visa_logo.png'" width="75px;">
                            </v-list-tile-action>
                            <v-list-tile-content class="pl-2">
                                <v-list-tile-sub-title>
                                    xxxx - xxxx - xxxx - {{orderbyid.paymentMethod.cardNumber}}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
                <v-card-text v-if="show">
                    <h4>Shipping</h4>
                    <v-list two-line class="pt-2" style="border: 1px solid rgba(0,0,0,.2)">
                        <v-list-tile avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    {{orderbyid.shipping.address1}} {{orderbyid.shipping.city}} 
                                </v-list-tile-title>
                                <v-list-tile-sub-title>
                                    {{orderbyid.shipping.state}} {{orderbyid.shipping.postalCode}} {{orderbyid.shipping.country.split(' ')[orderbyid.shipping.country.split(' ').length - 1]}}
                                </v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <artwork-comp :order="orderbyid" :flat="true"/>
                <v-card-text>
                    <i>*Delivery time will vary depending on country of origin and destination</i>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div style="text-align: center">
                        <v-btn :dark="!loading" :disabled="loading" class="_btn green ligthen-3" @click="submit">
                            <span v-if="loading">
                                <v-progress-circular indeterminate size="50" color="black"></v-progress-circular>
                            </span>
                            <span v-else>
                                Place Order
                            </span>
                        </v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <footer-comp />
    </div>
</template>


<script>
/* eslint-disable */
import ArtworkComp from '@/components/order/artwork'
import FooterComp from '@/components/footer/footercomp'
import GET_ORDER_QUERY from '@/graphql/query/getorderbyid'
import eventbus from '@/plugins/eventbus'
import PLACE_ORDER_MUTATION from '@/graphql/receipt/paywithpaymentmethod'

export default {
    apollo: {
        orderbyid: {
            query: GET_ORDER_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    components: {
        'artwork-comp' : ArtworkComp,
        'footer-comp' : FooterComp
    },
    watch: {
        orderbyid: function (val) {
            if(val) {
                this.show = true
            }
            else {
                window.location.reload(true)
            }
        }
    },
    data: () => ({
        show: false,
        loading: false
    }),
    methods: {
        async submit() {
            this.$apollo.mutate({
                mutation: PLACE_ORDER_MUTATION,
                variables: {
                    orderId: this.$route.params.id
                }
            })
                .then(res => {
                    this.triggerAlert('Successfully place an order', 'green', 'check')
                    this.triggerNotify(res.data.paywithpaymentmethod)
                    this.$store.dispatch('removePendingOrderById', this.$route.params.id)
                    this.$router.push('/order/purchase/' + res.data.paywithpaymentmethod._id)
                    this.triggerLoading()
                })
                .catch(err => {
                    this.triggerAlert('Error on placing order', 'red', 'close')
                    this.triggerLoading()
                })
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {
                message :message,
                color: color,
                action: action
            })
        },
        triggerNotify (data) {
            eventbus.$emit('placeorder', data)
        }
    }
}
</script>



<style scoped>
    ._main {
        padding: 20px 20% 20px 20%;
    }
    ._btn {
        height: 70px;
        width: 70%;
        font-weight: 700;
    }
    #subtitle {
        padding-top: 50px;
        text-align: left;
    }
    @media screen and (max-width: 770px){
        ._main {
        padding: 5px;
        }
        #subtitle {
            padding-top: 0px;
            width: 100%;
            text-align: center;
        }
        ._btn {
            width: 95%;
        }
    }
</style>

