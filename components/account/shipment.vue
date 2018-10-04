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
                <shipment-comp @submitted="addShipment"/>
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
                                    <v-speed-dial direction="left" open-on-hover transition="slide-x-reverse-transition">
                                        <v-btn fab slot="activator" flat> <v-icon>more_vert</v-icon></v-btn>
                                        <v-btn fab small icon color="red" flat @click="remove(item._id)"><v-icon>delete</v-icon></v-btn> <br>
                                        <v-btn fab small icon color="blue" flat><v-icon>edit</v-icon></v-btn>
                                    </v-speed-dial>
                                </v-list-tile-action>
                            </v-list-tile>
                        </div>
                    </v-list>
                </div>
                <div v-else>
                    <v-container fluid fill-height justify-center>
                        <div style="text-align: center">
                            <v-icon size="150px">map</v-icon> <br>
                            <i>You don't have saved shipping address.</i>
                        </div>
                    </v-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import shipment_form from '@/components/account/forms/shipment'
import GET_SHIPMENT_QUERY from '@/graphql/query/shipment/multiple'
import REMOVE_ONE_SHIPMENT_MUTATION from '@/graphql/mutation/shipment/remove'
import eventbus from '@/plugins/eventbus'

export default {
    data: () => ({
        add: false,
        shipmentList: []
    }),
    components: {
        'shipment-comp' : shipment_form
    },
    methods: {
        addShipment (val) {
            this.shipmentList.push(val)
            this.add = !this.add
        },
        async remove(val) {
            this.$apollo.mutate({
                mutation: REMOVE_ONE_SHIPMENT_MUTATION,
                variables: { id : val} 
            }).then( res => {
                this.removeDataFromList(val)
                this.triggerAlert('Successfully removed shipping address', 'green', 'check')
            }).catch( err => {
                this.triggerAlert('Error on removing shipping address', 'red', 'close')
            })
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {message: message, color : color, action: action})
        },
        removeDataFromList (val) {
            this.shipmentList.splice(this.shipmentList.findIndex( x => x._id === val), 1)
        }
    },
    apollo: {
        getshipmentbyuser: {
            query: GET_SHIPMENT_QUERY
        }
    },
    watch: {
        getshipmentbyuser: function(val) {
            if(val) {
                this.shipmentList = []
                val.forEach(x => {
                    this.shipmentList.push(x)
                })
            }
        }
    }
}
</script>

