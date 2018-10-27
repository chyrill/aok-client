<template>
    <div>
        <v-container fluid fill-height>
            <v-layout row wrap>
                <v-flex xs7 md6 class="pt-3">
                    <h3>Shipping Address</h3>
                </v-flex>
                <v-flex xs5 md6 style="text-align: right">
                    <v-btn flat :color="add ? 'red' : 'cyan'" class="_btn" left @click="add = !add">
                        <span v-if="!add">
                            <v-icon>add</v-icon>Add
                        </span>
                        <span v-else>
                            <v-icon>close</v-icon>Cancel
                        </span>
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <div class="pa-2">
            <div v-if="add">
                <shipment-comp @submitted="add = !add"/>
            </div>
            <div v-else-if="!add">
                <div v-if="shipmentList.length >= 1">
                    <v-list two-line>
                        <div v-for="(item, index) in shipmentList" :key="index">
                            <v-list-tile avatar>
                                <v-list-tile-action></v-list-tile-action>
                                <v-list-tile-content>
                                    <v-list-tile-title>
                                        {{item.address1}} {{item.city}}
                                    </v-list-tile-title>
                                    <v-list-tile-sub-title>
                                        {{item.state}} {{item.postalCode}} {{item.country.split(' ')[1]}}
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>
                                <v-list-tile-action>
                                   <v-btn icon color="red" flat @click="delData(item._id)"><v-icon>far fa-trash-alt</v-icon></v-btn>
                                </v-list-tile-action>
                            </v-list-tile>
                        </div>
                    </v-list>
                </div>
                <div v-else>
                    <v-container fluid fill-height justify-center>
                        <div style="text-align: center">
                            <v-icon size="150px">place</v-icon> <br>
                            <i>You don't have saved shipping address.</i>
                        </div>
                    </v-container>
                </div>
            </div>
        </div>
        <v-dialog v-model="delform" width="350px" persistent>
            <v-card>
                <v-toolbar color="black" dark>
                    <v-container fill-height fluid justify-center>
                        <img src="/client-title.png" width="150px"/>
                    </v-container>
                </v-toolbar>
                <v-card-text>
                    <v-container fluid fill-height justify-center>
                        <i>Are you sure to delete this data?</i>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="black" dark class="_btn" @click="remove">Ok</v-btn>
                    <v-btn class="_btn" outline @click="delform = !delform">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import shipment_form from '@/components/account/forms/shipment'
import REMOVE_ONE_SHIPMENT_MUTATION from '@/graphql/shippingaddress/removeshippingaddress'
import eventbus from '@/plugins/eventbus'

export default {
    data: () => ({
        add: false,
        shipmentList: [],
        delform: false,
        delItemId: null
    }),
    components: {
        'shipment-comp' : shipment_form
    },
    methods: {
        async remove() {
            this.triggerloading()
            this.$apollo.mutate({
                mutation: REMOVE_ONE_SHIPMENT_MUTATION,
                variables: { id : this.delItemId} 
            }).then( res => {
               const { Successful, Message } = res.data.removeshippingaddress
               if(!Successful) {
                   this.triggerAlert(Message, 'red', 'close')
                   this.triggerloading()
               } else {
                   this.triggerAlert(Message, 'green', 'check')
                   this.$store.commit('shippingaddress/remove', this.delItemId)
                   this.delform = false
                   this.delItemId = null
                   this.triggerloading()
               }
            }).catch( err => {
                alert(err)
                this.triggerloading()
            })
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {message: message, color : color, action: action})
        },
        triggerloading () {
            eventbus.$emit('loading')
        },
        delData (val){
            this.delItemId = val
            this.delform = !this.delform
        }
    },
    mounted() {
        this.$store.watch(
            state => {
                if(state.shippingaddress.list) {
                    this.shipmentList = state.shippingaddress.list
                }
            }
        )
    }
}
</script>

