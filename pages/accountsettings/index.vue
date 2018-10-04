<template>
    <div>
        <div id="main">
            <v-card>
                <v-tabs v-model="tab" slider-color="black">
                    <v-tab v-for="(i,index) in tabs" :key="index" style="text-transform: none;" @click="tab = index">
                        {{i}}
                    </v-tab>
                </v-tabs>
                <v-divider></v-divider>
                <v-tabs-items v-model="tab">
                    <v-tab-item id="0">
                        <profile-form />
                    </v-tab-item>
                    <v-tab-item id="1">
                        <payment-form />
                    </v-tab-item>
                    <v-tab-item id="2">
                        <shipping-comp />
                    </v-tab-item>
                    <v-tab-item id="3">
                        <credentials-form />
                    </v-tab-item>
                    <v-tab-item id="4">
                        <notification-form />
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import ProfileForm from '@/components/account/forms/profile'
import PaymentForm from '@/components/account/paymentselection'
import FooterComp from '@/components/footer/footercomp'
import CredentialsForm from '@/components/account/forms/credentials'
import NotificationsForm from '@/components/account/forms/notification'
import ShipmentComp from '@/components/account/shipment'

export default {
    data: () => ({
        tabs: ['Personal', 'Payments', 'Shipping Address', 'Credentials', 'Notifications'],
        tab: null
    }),
    components: {
        'profile-form' : ProfileForm,
        'payment-form' : PaymentForm,
        'credentials-form': CredentialsForm,
        'notification-form': NotificationsForm,
        'footer-comp' : FooterComp,
        'shipping-comp': ShipmentComp
    },
    mounted() {
        this.$store.watch(
            state => {
                if(!state.isAuthenticated) {
                    // this.$router.push('/')
                }
            }
        )
    }
}
</script>


<style scoped>
    #main {
        padding: 10px 20% 30px 20%;
    }
    @media screen and (max-width: 780px) {
        #main {
            padding: 10px;
        }
    }
</style>




