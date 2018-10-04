<template>
    <div style="width: 100%;">
        <div id="main">
            <div id="payment">
                <payment-form @shippingrate="setshippingrate"/>
            </div>
            <div id="artwork">
                <artwork-comp v-if="show" :order="orderbyid" :shippingrate="shiprate"/>
            </div>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import paymentForm from '@/components/order/paymentv2'
import FooterComp from '@/components/footer/footercomp'
import ArtworkComp from '@/components/order/artwork'
import ORDER_BY_ID_QUERY from '@/graphql/query/getorderbyid'

export default {
    components: {
        'payment-form' : paymentForm,
        'footer-comp' : FooterComp,
        'artwork-comp' : ArtworkComp
    },
    apollo: {
        orderbyid: {
            query: ORDER_BY_ID_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    watch: {
        orderbyid: function(val) {
            if(val) {
                this.show = true
            }
        }
    },
    data: () => ({
        show: false,
        shiprate: null
    }),
    methods: {
        setshippingrate (val) {
            this.shiprate = val
        }
    }
}
</script>


<style scoped>
    #main {
        padding: 20px 10% 20px 10%;
        width: 100%;
        display: grid;
        grid-template-columns: 60% 40%;
        grid-template-rows: auto;
        grid-gap: 10px;
        grid-template-areas: 
        "p a";
    }
    @media screen and (max-width: 770px) {
        #main {
            display: grid;
            padding: 20px 5px 20px 5px;
            grid-template-columns: 100%;
            grid-template-areas: "a" "p";
          
        }
    }
    #payment {
        grid-area: p;
    }
    #artwork {
        grid-area: a;
    }
</style>

