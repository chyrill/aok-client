<template>
    <v-card :style="{height: mobileDevice}">
        <v-toolbar color="black" flat>
            <v-toolbar-title class="layout justify-center">
                <img src="/artgallery2.png" height="100px" width="100px" style="padding-top:10px;"/>
            </v-toolbar-title>
        </v-toolbar>    
        <v-card-text>
            <div class="pt-3 pb-4">
                <divider title="Login"/>
            </div>
            <div>
                <v-btn block id="fbBtn" dark><v-icon left>fab fa-facebook</v-icon>Login using Facebook</v-btn>
            </div>
             <div class="pt-3 pb-4">
                <divider title="or"/>
            </div>
            <div id="wrapper">
                <login-comp />
            </div>
        </v-card-text>  
        <v-divider></v-divider>
        <div style="text-align:center" class="pt-3 pb-3">
            <p style="color: grey">Don't have an account? <span style="color: black; font-weight: 600;">Sign Up Now</span></p>
        </div>
    </v-card>
</template>


<script>
/* eslint-disable */
import divider from '../reusables/dividers'
import loginForm from './form/loginform'

export default {
    data () {
        return {
            mobileDevice: false
        }
    },
    mounted () {
        this.$nextTick( function () {
            window.addEventListener('resize', this.getDeviceWidth)

            this.getDeviceWidth()
        })
    },
    methods: {
        getDeviceWidth (event) {
            var width = document.documentElement.clientWidth

            if (width < 600) 
                this.mobileDevice = '736px'
            
            else 
                this.mobileDevice = 'auto'
        } 
    },
    components: {
        divider,
        'login-comp': loginForm
    }
}
</script>

<style scoped>
    #fbBtn {
        height: 50px;
        text-transform: none;
        background-color: #27448B;
        font-weight: 600;
    }
    #wrapper {
        padding: 0 10px 0 10px;
    }
</style>


