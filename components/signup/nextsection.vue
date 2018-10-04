<template>
    <div>
        <v-card :style="{height: mobileDevice}">
            <v-toolbar color="black" flat>
                <v-toolbar-title class="layout justify-center">
                    <img src="/artgallery2.png" height="100px" width="100px" style="padding-top:10px;"/>
                </v-toolbar-title>
            </v-toolbar>      
                <v-card-text>
                    <div class="pt-2 pb-5">
                        <divider title="sign up" />
                    </div>
                    <v-container fill-height fluid>
                        <v-layout row wrap fill-height>
                            <v-flex xs12>
                                <v-btn block :outline="!buyer" @click="clickBuyer" :dark="buyer" color="black" class="btn_select">I am a collector (Buyer)</v-btn>
                            </v-flex>
                            <v-flex xs12>
                                <v-btn block :outline="!seller" @click="clickSeller" :dark="seller" class="btn_select">I am a artist (Seller)</v-btn> 
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <div class="pt-5">
                        <v-btn block color="black" :dark="enabledBtn" @click="signup" :disabled="!enabledBtn">Next</v-btn>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                   
                </v-card-actions>
                 <div style="text-align:center;" class="pt-2 pb-1">
                    <p>Already have an account? <a id="loginHref">Login</a></p>
                </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */

import divider from '../reusables/dividers'
import SIGNUP_MUTATION from '@/graphql/signup.gql'
import EventBus from '@/plugins/eventbus'
import {CREATOR_ROUTE } from '@/config/routes'

export default {
    props: {
        signupData: {
            type: Object
        }
    },
    data () {
        return {
            mobileDevice : false,
            roleId: '',
            enabledBtn: false,
            buyer: false,
            seller: false,
            loading: false
        }
    },
    methods: {
        getWindowWidth(event) {
            var width = document.documentElement.clientWidth
            if (width < 600) {
                this.mobileDevice = '736px'
            }
            else {
                this.mobileDevice = 'auto'
            }
        },
        onRegister (value) {
            this.$emit('nextRegister', true)
        },
        clickBuyer () {
            this.buyer = !this.buyer
            this.enabledBtn = true
            this.roleId = 'buyer'
            if (this.seller) 
                this.seller = false
        },
        clickSeller () {
            this.seller = !this.seller
            this.enabledBtn = true
            this.roleId = 'artist'
            if (this.buyer) 
                this.buyer = false
        },
        async signup () {
            this.loading = true
            this.enabledBtn = false
            this.signupData['roleId'] = this.roleId
            try {
                this.$apollo.mutate({
                    mutation: SIGNUP_MUTATION,
                    variables: this.signupData
                }).then(response=> {    
                    this.triggerSnackbar('Successfully created account', 'green','check')
                    if(this.roleId === 'artist') {
                        window.location.replace(CREATOR_ROUTE + '/profile?auth='+response.data.signup)
                    }
                    else {
                        this.loading = false
                        this.enabledBtn = true
                        localStorage.setItem('token', response.data.signup)
                        this.$store.dispatch('setToken', response.data.signup)
                        this.$apolloHelpers.onLogin(response.data.signup)
                        EventBus.$emit('closeSignUp')
                        this.$router.push('/onboarding')
                    }
                }).catch(err => {
                    this.loading = false
                    this.enabledBtn = true
                    if(err.graphQLErrors[0].state){
                        var keys = (err.graphQLErrors[0].state)
                        this.triggerSnackbar(err.graphQLErrors[0].state[keys[0]][0],'red', 'close')
                    }
                    this.triggerSnackbar(err.graphQLErrors[0].message,'red', 'close')
                })
            }
            catch (e) {
                this.triggerSnackbar(e.message, 'red','close')
            }
        },
        triggerSnackbar(message, color,action) {
            EventBus.$emit('error', {
                message: message,
                color: color,
                action: action
            });
        }
    },
    mounted () {
        this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowWidth);
        
            this.getWindowWidth()
        })
        console.log(this.signupData)
    },
    components: {
        divider
    }
}
</script>

<style scoped>
    * {
        text-transform: none;
    }
    .btn_select {
        height: 50px;
    }
</style>

