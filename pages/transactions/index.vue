<template>
    <div>
        <div class="main">
            <v-card flat>
                <v-card-title>
                    <h3>Transactions</h3>
                </v-card-title>
                <v-card-text>
                    <v-data-table :headers="headers" :items="items">
                        <template slot="items" slot-scope="props">
                            <td style="text-align: left">{{props.item.transactionId}}</td>
                            <td>{{props.item.date}}</td>
                            <td>{{props.item.artwork.title}}</td>
                            <td><money-conversion currency="$" :value="props.item.amount"/></td>
                            <td>{{props.item.action}}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import GET_TRANSACTION_BY_USER_QUERY from '@/graphql/query/gettransactionbyuser'
import moneyconversion from '@/components/helpers/moneyconversion'
import footerComp from '@/components/footer/footercomp'

export default {
    apollo: {
        gettransactionbyuser: {
            query: GET_TRANSACTION_BY_USER_QUERY
        }
    },
    data: () => ({
        headers: [
            {
                text: 'ID',
                value: 'transactionId'
            },
            {
                text: 'Date',
                value: 'date'
            },
            {
                text: 'Artwork',
                value: 'artwork.title'
            },
            {
                text: 'Amount',
                value: 'amount'
            },
            {
                text: 'Type',
                value: 'action'
            }
        ],
        items: []
    }),
    watch: {
        gettransactionbyuser: function(val) {
            if(val) {
                val.forEach(x => {
                    this.items.push(x)
                })
                console.log(this.items)
            }
        }
    },
    components: {
        'money-conversion' : moneyconversion,
        'footer-comp': footerComp
    }   
}
</script>

<style scoped>
    .main {
        padding: 20px 20% 20px 20%;
    }
    @media screen and (max-width: 770px) {
        .main {
            padding: 10px 5px 10px 5px;
        }
    }
</style>

