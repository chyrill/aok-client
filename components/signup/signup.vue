<template>
    <div>
        <v-card :style="{height: mobileDevice}">
            <v-toolbar color="black" flat>
                <v-toolbar-title class="layout justify-center">
                    <img src="/artgallery2.png" height="100px" width="100px" style="padding-top:10px;"/>
                </v-toolbar-title>
            </v-toolbar>
                <v-card-text>
                    <div class="pt-2 pb-4">
                        <divider title="sign up" />
                    </div>
                    <v-btn block color="fbColor" id="fbBtn" dark><v-icon left>fab fa-facebook</v-icon>Sign Up using Facebook</v-btn>
                     <div class="pt-3 pb-4">
                        <divider title="or" />
                    </div>
                    <div id="wrapper" class="pb-2">
                        <Signform @register="onRegister"/>
                    </div>                
                </v-card-text>
                <v-divider></v-divider>
                <div style="text-align:center;" class="pt-2 pb-1">
                    <p>Already have an account? <a id="loginHref">Login</a></p>
                </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import Signform from './forms/signupform'

export default {
    data () {
        return {
            mobileDevice : false
        }
    },
    components: {
        divider,
        Signform
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
        }
    },
    mounted () {
        this.$nextTick(function() {
            window.addEventListener('resize', this.getWindowWidth);
        
            this.getWindowWidth()
        })
    }
}
</script>

<style>
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    #fbBtn {
        height: 50px;
        text-transform: none;
        background-color: #27448B;
        font-weight: 600;
    }
    #loginHref {
        color: black;
        font-weight: 600;
    }
</style>




