<template>
    <div>
        <v-card>
            <v-card-title>
                <h3>Complete your</h3>
            </v-card-title>
            <div v-if="paymentMethods.length >= 1">
                <v-card-text>
                    <h4>Payment Methods</h4>
                    <v-list two-line>
                        <div v-for="(item, index) in paymentMethods" :key="index">
                            <v-list-tile avatar @click="paymentMethod = index">
                                <v-list-tile-action>
                                    <img :src="item.cardType === 'MasterCard' ? '/mastercard.png' : '/visa_logo.png'" width="70px"/>
                                </v-list-tile-action>
                                <v-list-tile-content class="pl-2">
                                    <v-list-tile-sub-title>
                                        xxxx - xxxx - xxxx - {{item.cardNumber}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon :color="paymentMethod === index ? 'green': 'red'">{{ paymentMethod === index ? 'check' : 'close'}}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </div>
                    </v-list>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <h4>Shipping Address</h4>
                    <v-list two-line>
                        <div v-for="(item, index) in shippingAddressList" :key="index">
                            <v-list-tile @click="shippingAddress = index">
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{item.address1}} {{item.city}}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{item.postalCode}} {{item.state}} {{item.country.split(' ')[1]}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                    <v-icon :color="shippingAddress === index ? 'green': 'red'">{{ shippingAddress === index ? 'check' : 'close'}}</v-icon>
                                </v-list-tile-action>
                            </v-list-tile>
                        </div>
                    </v-list>
                    <i style="color: grey">*Delivery time will vary depending on country of origin and destination</i>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div style="text-align:center">
                        <v-btn :dark="!disableProceed && !loading" class="green ligthen-3 _btn" :disabled="disableProceed || loading" @click="proceed">
                            <span v-if="loading"><v-progress-circular indeterminate color="black" size="50"></v-progress-circular></span>
                            <span v-else>Proceed to order review</span>
                        </v-btn>
                    </div>
                </v-card-text>
            </div>
            <div v-else>
                <new-payment @shippingRate="emitShipping"/>
            </div>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import { TRANSFORM_DATA, OBFUSCATE_CREDITCARD} from '@/helpers/helpers'
import GET_RATE_BY_ID from '@/graphql/mutation/shipping/getratebyid'
import PROCEED_PAYMENT_MUTATION from '@/graphql/mutation/order/proceedpayment'
import NewPaymentForm from './forms/newpayment'

export default {
    data: () => ({
        paymentMethodList : [],
        paymentMethod: null,
        shippingAddress: null,
        loading: false,
        shipping: null
    }),
    computed: {
        paymentMethods () {
            return this.$store.state.paymentMethods
        },
        shippingAddressList () {
            return this.$store.state.profile.shippingAddress
        },
        disableProceed () {
            return this.shippingAddress != null && this.paymentMethods != null ? false : true
        }
    },
    watch: {
        shippingAddress: async function (val) {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: GET_RATE_BY_ID,
                variables: {
                    orderId : this.$route.params.id,
                    shippingId: this.shippingAddressList[this.shippingAddress]._id
                }
            }).then( res => {
                this.shipping = res.data.getshippingratebyid
                this.$emit('shippingrate', res.data.getshippingratebyid)
                this.triggerLoading()
            }).catch(err => {
                this.triggerLoading()
            })
        }
    },
    methods: {
        async proceed () {
            this.triggerLoading()
            console.log(this.loadStateToSubmitData())
            this.$apollo.mutate({
                mutation: PROCEED_PAYMENT_MUTATION,
                variables: this.loadStateToSubmitData()
            }).then(res => {
                this.$router.push('/order/confirmorder/' + this.$route.params.id)
            }).catch(err => {
                console.log(err)
            })

            this.triggerLoading()
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        loadStateToSubmitData () {
            return LOAD_STATE(this.$route.params.id, this.paymentMethods[this.paymentMethod]._id, this.shippingAddressList[this.shippingAddress]._id, this.shipping.rate, this.shipping.shippingId)
        },
        emitShipping(val) {
            this.$emit('shippingrate', val)
        }
    },
    components: {
        'new-payment' : NewPaymentForm
    }
}

const LOAD_STATE = (orderId, paymentMethodId, shippingId, shippingRate, shippingProviderId) => {
    return {
        orderId : orderId,
        paymentMethodId: paymentMethodId,
        shippingId: shippingId,
        shippingRate: shippingRate,
        shippingProviderId: shippingProviderId
    }
}
</script>

<style scoped>
    ._btn {
        font-weight: 700;
        height: 70px;
        width: 70%;
    }
</style>
