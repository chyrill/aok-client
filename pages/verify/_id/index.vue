<template>
    <div>
        <v-container fill-height fluid justify-center id="main">
            <v-flex md6 xs12>
                <div style="text-align: center">
                    <v-icon size="150px">far fa-check-circle</v-icon><br> <br>
                    <h3 style="color: grey;">You email is verified. Please click the button below to start browsing.</h3> <br>
                    <v-btn block color="black" dark class="_btn" to="/">Start Browsing</v-btn>
                </div>
            </v-flex>
        </v-container>
        <footer-comp/>
    </div>
</template>


<script>
/* eslint-disable */
import FooterComp from '@/components/footer/footercomp'
import eventbus from '@/plugins/eventbus'
import VERIFY_USER from '@/graphql/user/verifyuser'
import {PushManager} from '@/helpers/push'
import { CREATOR_ROUTE } from '@/config/routes'

export default {
    components: {
        'footer-comp' : FooterComp
    },
    methods: {
        loading() {
            eventbus.$emit('loading')
        },
        alertmessage(message, color, action) {
            eventbus.$emit('error', {message, color, action})
        },
        async verify() {
            this.$apollo.mutate({
                mutation: VERIFY_USER,
                variables: { id: this.$route.params.id }
            })
            .then(res => {
                let { Successful, Model, Message } = res.data.verifyuser
                this.loading()
                if(!Successful) {
                    this.alertmessage(Message, 'red', 'close')
                    this.$router.push('/')
                } else {
                    this.alertmessage(Message, 'green', 'check')
                    if(Model.role === 'CLIENT') {
                        this.$apolloHelpers.onLogin(Model.token)
                        this.$store.commit('authentication/set', Model.token)
                        PushManager(true)
                        this.loading()
                        this.$router.push('/onboarding')
                    } else {
                        window.location.replace(CREATOR_ROUTE+'/profile?auth=' + Model.token)
                    }
                }
            })
            .catch(err => {
                alert(err)
            }) 
        }
    },
    mounted () {
        this.loading()
        this.verify()
    }
}
</script>

<style scoped>
    #main {
        height: 50vh;
    }
    ._btn {
        height: 70px;
        font-weight: 700;
    }
</style>

