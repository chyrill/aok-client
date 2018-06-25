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
                        <v-layout fill-height />
                        <v-layout row wrap fill-height>
                            <v-flex xs12 flexbox>
                                <v-btn block outline>I am a collector (Buyer)</v-btn>
                            </v-flex>
                            <v-flex xs12 flexbox>
                                <v-btn block outline>I am a artist (Seller)</v-btn> 
                            </v-flex>
                        </v-layout>
                    </v-container>
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

export default {
    data () {
        return {
            mobileDevice : false,
            paddingMobile: 0
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
                this.paddingMobile = 0
            }
        },
        onRegister (value) {
            this.$emit('nextRegister', true)
        }
    },
    mounted () {
        this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowWidth);
        
            this.getWindowWidth()
        })
    },
    components: {
        divider
    }
}
</script>

<style scoped>

</style>

