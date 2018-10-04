<template>
    <div>
        <div class="_main">
            <v-card>
                <v-card-text>
                    <v-container fill-height fluid justify-center grid-list-lg>
                        <v-layout row wrap>
                            <v-flex xs12 justify-center>
                                <div style="text-align: center">
                                    <v-icon size="150px">fa fa-shipping-fast</v-icon>
                                </div>
                            </v-flex>
                            <v-flex xs12>
                                <div style="text-align: center">
                                    <h3>Thank you for puchasing an artwork!</h3><br>
                                    <span class="subtitle">We have sent you an email for the receipt of purchase. Please wait for the next email that include the tracking number.</span><br>
                                    <span class="subtitle">If you have any questions, please contact us at </span> <a href="#">support@aoklife.com</a>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div style="text-align: center;">
                        <v-btn class="_btn black" dark to="/" >Back to home</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </div>
        <footer-comp />
    </div>
</template>


<script>
/* eslint-disable */
import FooterComp from '@/components/footer/footercomp'
import eventbus from '@/plugins/eventbus'

export default {
    components: {
        'footer-comp' : FooterComp
    }
}
</script>



<style scoped>
    ._main {
        padding: 20px 20% 20px 20%;
    }
    @media screen  and (max-width: 770px){
        ._main {
            padding: 10px 5px 10px 5px;
        }
        ._btn {
            width: 95%;
        }
    }
    .subtitle {
        color: grey;
    }
    a {
        color: cyan;
        text-decoration: none;
    }
    ._btn {
        height: 70px;
        width: 70%;
        font-weight: 700;
    }
</style>

