<template>
    <div>
        <v-navigation-drawer class="grey darken-3" app v-model="sideDrawer">
            <v-toolbar class="transparent pa-4" flat dark>
                <v-toolbar-items class="layout justify-center">
                    <v-btn flat @click="signUp=!signUp">Sign Up</v-btn>
                    <v-btn flat>Log In</v-btn>
                </v-toolbar-items>
                <v-spacer></v-spacer>
                <v-btn icon flat dark @click.stop="sideDrawer = !sideDrawer">
                    <v-icon>keyboard_arrow_left</v-icon>
                </v-btn>
            </v-toolbar>
            <!-- <v-btn absolute right fab dark>
                <v-icon>close</v-icon>
            </v-btn> -->
            <v-divider class="grey darken-2"></v-divider>
            <v-list dark class="pa-2" dense>
                <v-list-tile v-for="item in navigationLinks" :key="item.title" class="pa-2" @click="item.link">
                    <v-list-tile-action>
                        <v-icon dark>{{item.action}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{item.title}}</v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider class="grey darken-2"></v-divider>
            <v-list dark class="pa-2" dense>
                <v-list-tile v-for="item in bottomNavigationLinks" :key="item">
                    <v-list-tile-title>{{item}}</v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider class="grey darken-2"></v-divider>
        </v-navigation-drawer>
        <v-toolbar app color="black" dark flat scroll-off-screen
>
            <v-toolbar-side-icon class="layout justify-start hidden-md-and-up " @click.stop="sideDrawer = !sideDrawer"></v-toolbar-side-icon>
            <v-toolbar-title class="pl-5 pr-5 hidden-md-and-down " style="padding-top:28px"><img src="/artgallery2.png" /></v-toolbar-title>
            <img src="/artgallery2.png" style="padding-top:7%" class="hidden-sm-and-up"/>
            <img src="/artgallery2.png" style="padding-top:28px" class="layout justify-center hidden-xs-only hidden-md-and-up"/>
            <v-spacer class="hidden-xs-and-up"></v-spacer>
            <v-toolbar-items class="layout justify-end hidden-md-and-up"> 
                <v-btn icon flat @click.stop="searchOpen = !searchOpen">
                    <v-icon>search</v-icon>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="layout justify-start hidden-sm-and-down">
                <v-btn flat>Artworks</v-btn>
                <v-btn flat>Artists</v-btn>
                <v-btn flat>Charities</v-btn>
                <v-btn flat>Blog</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="layout justify-end pr-5 pl-5 hidden-sm-and-down">
                <v-btn fab icon flat>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn flat class="hidden-sm-and-down" @click="signUp =!signUp">Sign Up</v-btn>
                <v-btn flat class="hidden-sm-and-down" @click="login =!login">Log In</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-card v-if="searchOpen">
                <v-card-text class="pa-2">
                    <v-text-field solo class="elevation-0" label="search" prepend-icon="search"></v-text-field>
                </v-card-text>
            </v-card>
            <nuxt/>
        </v-content>
        <v-dialog v-model="signUp" max-width="500" :fullscreen="mobileDevice" hide-overlay transition="dialog-bottom-transition">
            <sign-up-comp @nextRegister="nextRegister" v-if="!nextSection"/>
            <next-section-comp v-if="nextSection"/>
        </v-dialog>
        <v-dialog v-model="login" max-width="500" :fullscreen="mobileDevice" hide-overlay transition="dialog-top-transition">
            <login-comp />
        </v-dialog>
    </div>
</template>
<style scoped>
* {
    text-transform: none;
}
</style>
<script>
import SignUpComp from '../signup/signup'
import NextSectionForm from '../signup/nextsection'
import LoginComp from '../login/login'
/* eslint-disable */
export default {
    data() {
        return {
            login: false,
            nextSection: false,
            signUp: false,
            sideDrawer: false,
            sideDrawerColor: '#292929',
            navigationLinks: [{
                    link: '#',
                    action: 'fas fa-home',
                    title: 'Home'
                }, {
                    link: '#',
                    action: 'fas fa-images',
                    title: 'Artworks'
                },
                {
                    link: '#',
                    action: 'fas fa-paint-brush',
                    title: 'Artists'
                },
                {
                    link: '#',
                    action: 'favorite',
                    title: 'Charities'
                },
                {
                    link: '#',
                    action: 'receipt',
                    title: 'Blog'
                }
            ],
            bottomNavigationLinks: ['Curated Artworks', 'Browse by Categories', 'Browse by Price', 'Auctions Ending Today', 'Recently Sold Artworks'],
            searchOpen: false,
            mobileDevice: false
        }
    },
    methods: {
        getWindowWidth(event) {
            var width = document.documentElement.clientWidth
            if (width < 600) {
                this.mobileDevice = true
            }
            else {
                this.mobileDevice = false
            }
        },
        nextRegister(value) {
            this.nextSection=value;
        }
    },
    components: {
        'sign-up-comp': SignUpComp,
        'next-section-comp': NextSectionForm,
        'login-comp' : LoginComp
    },
    mounted () {
        this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        
        this.getWindowWidth()
        })
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    }
}
</script>