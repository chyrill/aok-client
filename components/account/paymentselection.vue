<template>
    <div>
        <div class="pl-3 pr-3 pt-3">
            <v-container fluid fill-height style="padding: 0">
                <v-layout row wrap>
                    <v-flex xs7>
                        <h3 class="pt-2">Payment Methods</h3>
                    </v-flex>
                    <v-flex xs5>
                        <div style="text-align: right">
                            <v-btn left flat :color="addPayment? 'red':'cyan'" class="_btn" @click="addPayment = !addPayment"><span v-if="!addPayment"><v-icon>add</v-icon>Add</span><span v-else><v-icon>close</v-icon>Cancel</span></v-btn> 
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        <div v-if="addPayment">
            <add-credit-card @submitted="addPayment = !addPayment"/>
        </div>
        <div v-else class="pb-5 pr-3 pt-3 pl-3">
            <div v-if="PaymentMethods.length <= 0">
                <v-container fill-height fluid justify-center>
                    <div style="text-align: center">
                        <v-icon size="150px">monetization_on</v-icon> <br>
                        <i>You don't have saved payment methods</i>
                    </div>
                </v-container>
            </div>
            <div v-else>
                <v-list two-line>
                    <div v-for="(item, index) in PaymentMethods" :key="index" class="pa-2">
                       <v-list-tile avatar>
                           <v-list-tile-action>
                               <img :src="item.cardType === 'Visa'? '/visa_logo.png' : '/mastercard.png'" width="70px" />
                           </v-list-tile-action>
                           <v-list-tile-content>
                               <v-list-tile-sub-title class="pl-3">
                                   xxxx-xxxx-xxxx-{{item.cardNumber}}
                               </v-list-tile-sub-title>
                           </v-list-tile-content>
                            <v-list-tile-action>
                                   <v-btn icon color="red" flat @click="deleteItem(item._id)"><v-icon>close</v-icon></v-btn>
                            </v-list-tile-action>
                       </v-list-tile>
                    </div>
                </v-list>
            </div>
        </div>
        <v-dialog width="500px" v-model="deleteForm">
            <v-card>
                <v-toolbar dark color="black">
                    <v-container fluid fill-height justify-center>
                        <img src="/client-title.png" width="150px" />
                    </v-container>
                    <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                    <div style="text-align: center">
                        <i>Are you sure to delete this item?</i>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="_btn black" dark @click="deleteData">Ok</v-btn>
                    <v-btn class="_btn black" outline @click="deleteForm = !deleteForm">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import addCreditCardForm from './forms/addcreditcard'
import REMOVE_PAYMENT_METHOD from '@/graphql/paymentmethod/remove'
import eventbus from '@/plugins/eventbus'

export default {
    data: () => ({
        addPayment: false,
        show: false,
        deleteForm: false,
        deleteId: null
    }),
    components: {
        'add-credit-card' : addCreditCardForm
    },
    computed: {
        PaymentMethods () {
            return this.$store.state.paymentMethods
        }
    },
    methods: {
        deleteItem(id) {
            this.deleteForm = !this.deleteForm
            this.deleteId = id
        },
        async deleteData() {
            this.$apollo.mutate({
                mutation: REMOVE_PAYMENT_METHOD,
                variables: { id: this.deleteId }
            })
                .then(res => {
                    this.deleteForm = !this.deleteForm
                    this.$store.dispatch('removePaymentMethod', this.deleteId)
                    this.triggerAlert('Successfully deleted item', 'green','check')
                })
                .catch(err => {
                    console.log(err)
                    this.triggerAlert('Error on deleting','red','close')
                })
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {
                message: message,
                color: color,
                action: action
            })
        }
    },
    watch: {
        PaymentMethods: function(val) {
            if(!val) {
                this.show = !this.show
            }
        }
    }
}
</script>



