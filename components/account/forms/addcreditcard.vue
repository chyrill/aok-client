<template>
    <div>
        <v-card flat>
            <v-container fluid fill-height justify-center grid-list-lg class="pa-3">
                <v-layout row wrap>
                    <v-flex xs12>
                        <label for="card-element">
                            <h4>Credit or Debit Card</h4> 
                        </label>
                    </v-flex>
                    <v-flex xs12>
                        <span style="color: grey; font-weight: 700">Account Name</span> <br>
                        <v-text-field solo flat style='border: 1px solid grey' v-model="accountName" :error-messages="accountNameErrors" @input="$v.accountName.$touch()" @blur="$v.accountName.$touch()"/>
                    </v-flex>
                    <v-flex xs12>
                        <div id="card-element"></div>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-card-text>
                <v-btn id="submit" class="_btn green ligthen-2"  :dark="!$v.$invalid" block :disabled="$v.$invalid">
                    Save
                </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import eventbus from '@/plugins/eventbus'
import ADD_PAYMENT_METHOD from '@/graphql/paymentmethod/addpaymentmethod'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [ validationMixin ],
    validations: {
        accountName: { required }
    },
    data: () => ({
        loading: false,
        accountName: null
    }),
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

        var button = document.getElementById('submit')
        button.addEventListener('click', (event) => {
            this.triggerLoading()
            stripe.createToken(card)
                .then(result => {
                    this.add(result.token)
                })
        })
    },
    methods: {
        async add (data) {
            this.$apollo.mutate({
                mutation: ADD_PAYMENT_METHOD,
                variables: this.transformData(data)
            })
            .then(res => {
                const { Successful, Message, Model } = res.data.addpaymentmethod
                if(!Successful) {
                    this.triggerAlert(Message, 'red', 'close')
                    this.triggerLoading()
                } else {
                    this.triggerAlert(Message, 'green', 'check')
                    this.$store.commit('paymentmethods/add', Model)
                    this.triggerLoading()
                    this.$emit('submitted')
                }
            })
            .catch(err => {
                alert(err)
            })
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {message: message, color: color, action: action})
        },
        triggerLoading () {
            eventbus.$emit('loading')
        },
        transformData(data) {
            return {
                token: data.id,
                cardType: data.card.brand,
                paymentType: data.type,
                cardNumber: data.card.last4,
                accountName: this.accountName
            }
        }
    },
    computed: {
        accountNameErrors () {
            const errors = []
            if(!this.$v.accountName.$dirty) return errors 
            !this.$v.accountName.required && errors.push('Account Name is required.')
            return errors
        }
    }
}
</script>

<style scoped>
    .StripeElement {
    background-color: white;
    height: 40px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
    border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
    }
    ._btn {
        height: 70px;
        font-weight: 700;
    }
</style>


