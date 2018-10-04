<template>
    <div>
        <v-card>
            <v-card-text>
                <h4> Credit/Debit Card Information</h4> <br>
                 <v-container fill-height fluid>
                    <v-layout>
                        <v-flex xs12>
                            <div id="card-element"></div>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <h4>Shipping Information</h4><br>
                <v-container fill-height fluid grid-list-lg>
                    <v-layout row wrap>
                        <v-flex xs12 md6>
                            <span class="label">Address 1</span>
                            <v-text-field label="Address 1" style="border: 1px solid grey" flat solo v-model="address1" :error-messages="address1Errors" @input="$v.address1.$touch()" @blur="$v.address1.$touch()"/>
                        </v-flex>
                        <v-flex xs12 md6>
                            <span class="label">Address 2</span>
                            <v-text-field label="Address 2" style="border: 1px solid grey" flat solo v-model="address2"/>
                        </v-flex>  
                        <v-flex xs12 md6>
                            <span class="label">City</span>
                            <v-text-field label="City" style="border: 1px solid grey" flat solo v-model="city" :error-messages="cityErrors" @blur="$v.city.$touch()" @input="$v.city.$touch()"/>
                        </v-flex>
                        <v-flex xs12 md6>
                            <span class="label">State</span>
                            <v-text-field solo flat style='border: 1px solid grey' label="State" v-model="state" :error-messages="stateErrors" @input="$v.state.$touch()" @blur="$v.state.$touch()"/>
                        </v-flex>
                        <v-flex xs12 md6>
                            <span class="label">Postal Code</span>
                            <v-text-field solo flat style='border: 1px solid grey' label="Postal Code" v-model="postalCode" :error-messages="postalCodeErrors" @blur="$v.postalCode.$touch()" @input="$v.postalCode.$touch()"/>
                        </v-flex>
                        <v-flex xs12 md6>
                            <span class="label">Country</span>
                            <v-select solo autocomplete flat style="border: 1px solid grey" :items="countryList" append-icon="keyboard_arrow_down" label="Country" v-model="country" :error-messages="countryErrors" @change="$v.country.$touch()" @input="$v.country.$touch()"></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center">
                    <v-btn class="_btn green ligthen-3" :dark="btnEnable && !loading" :disabled="!btnEnable || loading" id="sbt">
                        <span v-if="loading">
                            <v-progress-circular indeterminate size="30" color="black"></v-progress-circular>
                        </span>
                        <span v-else>
                            Proceed to order review
                        </span>
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { GET_COUNTRY_LIST } from '@/helpers/helpers'
import GET_SHIPPING_RATE from '@/graphql/shipping/getshippingrates'
import PROCEED_PAYMENT from '@/graphql/order/proceedpayment2'

export default {
    mixins: [ validationMixin ],
    validations: {
        address1: {
            required
        },
        city: {
            required
        },
        state: {
            required
        },
        postalCode: {
            required
        },
        country: {
            required
        }
    },
    mounted() {
        const stripe = Stripe('pk_test_2VHCkC9nBNuGDzaaGHhvbjPp')

        const elements = stripe.elements()

         const style = {
            base: {
                color: '#32325d',
                lineHeight: '18px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                color: '#aab7c4'
                }
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
            }
        }
        const card = elements.create('card',{ style: style })
        
        card.mount("#card-element")

        let btn = document.getElementById('sbt')

        btn.addEventListener('click', () => {
            this.triggerLoading()
            stripe.createToken(card)
                .then(res => {
                    this.processPaymentMethod(res.token)
                })
                .catch(err => {
                    this.triggerLoading()
                })
        })
    },
    data: () => ({
        shippingRate: null,
        address1: null,
        address2: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        countryList:  GET_COUNTRY_LIST(),
        loading: false,
        btnEnable: false
    }),
    computed: {
        address1Errors () {
            const errors = []
            if(!this.$v.address1.$dirty) return errors
            !this.$v.address1.required && errors.push('Address 1 is required')
            return errors
        },
        cityErrors () {
            const errors = []
            if(!this.$v.city.$dirty) return errors
            !this.$v.city.required && errors.push('City is required')
            return errors
        },
        stateErrors () {
            const errors = []
            if(!this.$v.state.$dirty) return errors
            !this.$v.state.required && errors.push('State is required')
            return errors
        },
        postalCodeErrors () {
            const  errors = []
            if(!this.$v.postalCode.$dirty) return errors
            !this.$v.postalCode.required && errors.push('Postal Code is required')
            return errors
        },
        countryErrors () {
            const errors = []
            if(!this.$v.country.$dirty) return errors
            !this.$v.country.required && errors.push('Country is required')
            return  errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    watch: {
        invalidForm: function(val) {
            if(!val) {
                this.getShippingRate()
            }
        },
        shippingRate: function(val) {
            if(val) {
                this.$emit('shippingRate', val)
                if(!this.invalidForm) {
                    this.btnEnable = true
                }
            }
        }
    },
    methods: {
        loadStateToShippingData () {
            return {
                orderId: this.$route.params.id,
                address1 :this.address1,
                address2: this.address2,
                city: this.city,
                state: this.state,
                postalCode: this.postalCode,
                country: this.country
            }
        },
        async getShippingRate () {
            setTimeout(() => {
                this.triggerLoading()
                this.$apollo.mutate({
                mutation: GET_SHIPPING_RATE,
                variables: this.loadStateToShippingData()
                })
                .then(res => {
                    this.shippingRate = res.data.getshippingrates
                    this.triggerLoading()
                })
                .catch(err => {
                    alert(err)
                    this.triggerLoading()
                })
            }, 10000)
        },
        triggerLoading() {
            this.loading = !this.loading
        },
        async processPaymentMethod(data) {
            this.$apollo.mutate({
                mutation: PROCEED_PAYMENT,
                variables: {
                    paymentType: 'card',
                    cardNumber: data.card.last4,
                    cardType: data.card.brand,
                    token: data.id,
                    address1: this.address1,
                    address2: this.address2,
                    city: this.city,
                    state: this.state,
                    postalCode: this.postalCode,
                    country: this.country,
                    shippingProviderId: this.shippingRate.shippingId,
                    shippingRate: this.shippingRate.rate,
                    orderId: this.$route.params.id
                }
            })
            .then(res => {
                this.$router.push('/order/confirmorder/' + res.data.proceedpayment2._id)
            }) 
            .catch(err => {
                console.log(err)
                alert(err)
            })
        }
    } 
}

</script>



<style scoped>
    .label {
        font-weight: 700;
        color: gray;
    }
    ._btn {
        font-weight: 700;
        height: 70px;
        width: 70%;
    }
    @media screen and (max-width: 770px) {
        ._btn {
            width: 95%;
        }
    }
</style>
