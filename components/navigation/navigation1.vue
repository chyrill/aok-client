<template>
    <div>
        <v-navigation-drawer class="grey darken-3" app v-model="sideDrawer">
            <v-toolbar class="transparent pa-4" flat dark>
                <v-toolbar-items v-if="!isAuthenticated" class="layout justify-center">
                    <v-btn flat @click="signUp=!signUp">Sign Up</v-btn>
                    <v-btn flat @click="login=!login">Log In</v-btn>
                </v-toolbar-items>
                <v-toolbar-items v-else class="layout justify-center">
                    <v-btn flat @click="signout">Log out</v-btn>
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
                <v-list-tile v-for="item in navigationLinks" :key="item.title" class="pa-2" :to="item.link">
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
        <v-navigation-drawer class="grey darken-3" dark app v-model="sideDrawerRight" right>
            <v-toolbar class="grey darken-3 pa-2 elevation-0"  dark>
                <v-text-field solo class="grey" flat label="Search" append-icon="search" />
            </v-toolbar>
            <v-list>
                <v-list-tile avatar to="/accountsettings">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Account Settings
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar to="/notifications">
                    <v-list-tile-action>
                        <v-badge v-model="newNotif" color="red" overlap>
                            <span slot="badge">{{noNotif}}</span>
                            <v-icon>notifications</v-icon>
                        </v-badge>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Notifications
                    </v-list-tile-content>
                </v-list-tile> 
                <v-list-tile avatar>
                    <v-list-tile-action>
                        <v-icon>visibility</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Watchlist
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile avatar to="/transactions">
                    <v-list-tile-action>
                        <v-icon>access_time</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Transaction History
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app color="black" dark flat scroll-off-screen>
            <v-toolbar-side-icon class="layout justify-start hidden-md-and-up " @click.stop="sideDrawer = !sideDrawer"></v-toolbar-side-icon>
            <v-toolbar-title class="pl-5 pr-5 hidden-md-and-down " style="padding-top:28px"><a href="/"><img src="/artgallery2.png" /></a></v-toolbar-title>
            <a href="/" style="padding-top:7%" ><img src="/artgallery2.png" class="hidden-sm-and-up"/></a>
            <img src="/artgallery2.png" style="padding-top:28px" class="layout justify-center hidden-xs-only hidden-md-and-up"/>
            <v-spacer class="hidden-xs-and-up"></v-spacer>
            <v-toolbar-items class="layout justify-end hidden-md-and-up"> 
                <v-btn v-if="!isAuthenticated" icon flat @click.stop="searchOpen = !searchOpen">
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn flat v-else @click="sideDrawerRight = !sideDrawerRight">
                    <v-avatar size="25px;"><img :src="profileData ? profileData.displayPicture ? profileData.displayPicture : '/icon_avatar.png' : '/icon_avatar.png'"/></v-avatar>
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="layout justify-start hidden-sm-and-down">
                <v-btn flat to="/artworks">Artworks</v-btn>
                <v-btn flat to="/artists">Artists</v-btn>
                <v-btn flat to="/charities">Charities</v-btn>
                <v-btn flat>Blog</v-btn>
            </v-toolbar-items>
            <v-spacer></v-spacer>
            <v-toolbar-items class="layout justify-end pr-5 pl-5 hidden-sm-and-down" v-if="!isAuthenticated">
                <v-btn fab icon flat>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn flat class="hidden-sm-and-down" @click="signUp =!signUp">Sign Up</v-btn>
                <v-btn flat class="hidden-sm-and-down" @click="login =!login">Log In</v-btn>
            </v-toolbar-items>
            <v-toolbar-items class="layout justify-end pr-5 pl-5 hidden-sm-and-down" v-else>
                <v-btn fab icon flat>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-menu offset-y max-width="700px" full-width>
                    <v-btn slot="activator" flat>
                        <v-badge color="red" v-model="newNotif" left overlap>
                            <span slot="badge">{{noNotif}}</span>
                            <v-icon>notifications</v-icon>
                        </v-badge>
                    </v-btn>
                    <v-list three-line dark>
                        <v-list-tile v-for="(item, index) in notifications.slice(0,3)" :key="index" :to="item.link" :class="item.new ? 'grey ligthen-5    ': ''">
                            <v-list-tile-action>
                                <img :src="item.tumbnail" width="50px" height="50px">
                            </v-list-tile-action>
                            <v-list-tile-content class="pl-2 pr-2" style="font-size: 14px;">
                                {{item.message}}
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <elapsed-time-comp :dateVal="item.dateCreated" style="font-size: 14px;"/>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile style="height: auto important!;">
                            <v-list-tile-content style="align-items: center;">
                                <div style="text-align: center; font-size: 14px;">
                                    <a href="/notifications">View all notifications</a>
                                </div>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu offset-y min-width="290px" dark >
                    <v-btn icon small slot="activator" flat><v-avatar size="25" v-if="show"><img :src="profileData ? profileData.displayPicture ? profileData.displayPicture : '/icon_avatar.png' : '/icon_avatar.png'" /></v-avatar></v-btn>
                    <v-list>
                        <v-list-tile avatar to="/accountsettings">
                            <v-list-tile-avatar>
                                    <v-icon dark>settings</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Account Settings
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar to="/watchlist">
                            <v-list-tile-avatar>
                                <v-icon>visibility</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Watchlist
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar to="/transactions">
                            <v-list-tile-avatar>
                                <v-icon>history</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Transactions History
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile avatar @click="signout">
                            <v-list-tile-avatar>
                                <v-icon>exit_to_app</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title>
                                    Log Out
                                </v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-menu>
                <div v-if="profileData"><v-container justify-center fill-height>{{profileData.fullName}}</v-container></div>
            </v-toolbar-items>
        </v-toolbar>
        <v-content>
            <v-card v-if="searchOpen">
                <v-card-text class="pa-2">
                    <v-text-field solo class="elevation-0" label="search" prepend-icon="search"></v-text-field>
                </v-card-text>
            </v-card>
            <nuxt/>
            <div v-for="(item, index) in alert" :key="index">
                <alert-comp :alert="item" @del="alert.splice(index,1)"/>
            </div>
        </v-content>
        <v-dialog v-model="signUp" max-width="500" :fullscreen="mobileDevice" hide-overlay transition="dialog-bottom-transition">
            <sign-up-comp v-if="!nextSection"/>
            <next-section-comp v-if="nextSection" :signupData="signupData"/>
        </v-dialog>
        <v-dialog v-model="login" max-width="500" :fullscreen="mobileDevice" hide-overlay transition="dialog-bottom-transition">
            <login-comp />
        </v-dialog>
        <div>
            <v-snackbar :timeout="6000" v-model="snackbar" :color="error.color" top right>
                {{error.message}}
                <v-spacer></v-spacer>
                <v-btn icon dark @click.native="snackbar =!snackbar"><v-icon>{{error.action}}</v-icon></v-btn>
            </v-snackbar>
        </div>
        <v-dialog v-model="showBid" width="600px" :fullscreen="mobileDevice" transition="dialog-bottom-transition" persistent><bid-comp :artwork="artwork"/></v-dialog>
        <v-dialog v-model="buyNow" width="500px" :fullscreen="mobileDevice" transition="dialog-bottom-transition" persistent><buy-now-comp v-if="buyNow" :artwork="artwork"/></v-dialog>
        <v-dialog persistent v-model="loading" width="300px">
            <v-card>
                <v-container fluid fill-height justify-center>
                    <div style="text-align: center">
                        <v-progress-circular indeterminate size="150" color="black"></v-progress-circular><br>
                        <h4 style="color: grey;">Please wait for a moment ....</h4>
                    </div>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped>
    * {
        text-transform: none;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
</style>
<script>
/* eslint-disable */
import SignUpComp from '../signup/signup'
import NextSectionForm from '../signup/nextsection'
import LoginComp from '../login/login'
import eventBus from '@/plugins/eventbus'
import bidComp from '@/components/dialogs/bid'
import ENDING_ARTWORK_QUERY from '@/graphql/endingartwork'
import { GetLengthArrayWithCondition } from '@/helpers/helpers'
import elapsedTimeComp from '@/components/helpers/elapsedtime'
import buyNowComp from '@/components/dialogs/buynow'
import AlertComp from './alert'
import { API_ROUTE } from '@/config/routes'

export default {
    data() {
        return {
            sideDrawerRight: false,
            login: false,
            nextSection: false,
            signUp: false,
            sideDrawer: false,
            sideDrawerColor: '#292929',
            navigationLinks: [{
                    link: '/',
                    action: 'fas fa-home',
                    title: 'Home'
                }, {
                    link: '/artworks',
                    action: 'fas fa-images',
                    title: 'Artworks'
                },
                {
                    link: '/artist',
                    action: 'fas fa-paint-brush',
                    title: 'Artists'
                },
                {
                    link: '/charities',
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
            mobileDevice: false,
            signupData: {},
            error: {},
            snackbar: false,
            profileData: null,
            artwork: null,
            showBid: false,
            notifications: [],
            newNotif: false,
            noNotif: 0,
            show: false,
            buyNow: false,
            alert: [],
            loading: false
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
        close() {
            this.error.visible = false
        },
        async signout () {
            let registration = await navigator.serviceWorker.getRegistration('/push_service.js')
            let subscription = await registration.pushManager.getSubscription()
            await subscription.unsubscribe()
            this.unsubscribe(subscription)
        },
        unsubscribe(subscription) {
            console.log(subscription)
            fetch(API_ROUTE + '/unsubscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                subscription.unsubscribe()
                this.$store.commit('authentication/remove')
                this.$store.commit('profile/remove')
                this.$router.push('/')
            })
        }
    },
    components: {
        'sign-up-comp': SignUpComp,
        'next-section-comp': NextSectionForm,
        'login-comp' : LoginComp,
        'bid-comp': bidComp,
        'elapsed-time-comp': elapsedTimeComp,
        'buy-now-comp': buyNowComp,
        'alert-comp': AlertComp
    },
    mounted () {
        this.$nextTick(function() {
        window.addEventListener('resize', this.getWindowWidth);
        
        this.getWindowWidth()
        })

        eventBus.$on('nextRegister', ()=>{
            this.nextSection = !this.nextSection
        })
        eventBus.$on('backToSignUp', () => {
            this.nextSection = !this.nextSection
        })
        eventBus.$on('error', (value)=> {
            this.error.message = value.message
            this.error.color = value.color
            this.error.action = value.action
            this.snackbar = true
        })
        if(!localStorage.getItem('token')) {
            this.$store.commit('getToken')
        }
        eventBus.$on('closeLogin',() => {
            this.login = !this.login
        })
        eventBus.$on('closeSignUp', () =>{
            this.signUp = !this.signUp
        })
        eventBus.$on('placeBid', (data) => {
            this.artwork = data
            this.showBid = !this.showBid
        })
        eventBus.$on('closeBid', () => {
            this.showBid = !this.showBid
            this.$apollo.queries.endingartwork.refetch()
        })
        eventBus.$on('buyNow',(data) => {
            this.buyNow = true
            this.artwork = data
        })
        eventBus.$on('closeBuy', () => {
            this.buyNow = false
        })
        eventBus.$on('notification', (data) => {
            this.alert.push(data)
        })
        eventBus.$on('loading', () => {
            this.loading = !this.loading
        })
        this.$store.watch(
            (state) => {
                if(state.notifications) {
                    this.notifications = state.notifications.list
                }
                if(state.profile) {
                    this.profileData = state.profile.data
                    this.show = true
                }
            }
        )
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.getWindowWidth);
    },
    computed: {
        isAuthenticated () {
            return this.$store.state.authentication.isAuthenticated
        },
        profile () {
            return this.$store.state.profile.data
        },
        token () {
            return this.$store.state.authentication.token
        }
    },
    watch: {
        token: function(val) {
            if(!val) {
                this.$store.commit('getToken')
            }
        },
        profile: function (val) {
            if(val) {
                this.profileData = val.profile
            }
            else {
                this.show = false
            }
        },
        endingartwork: function (val) {
            if(val) {
                this.$store.dispatch('addEndingArtwork',val)
            }
        },
        notifications: function(val) {
            if(val) {
                this.noNotif = GetLengthArrayWithCondition(val, 'new', true)
                if(this.noNotif > 0) {
                    this.newNotif = true
                }
            }
        }
    },
    apollo: {
        endingartwork: {
            query: ENDING_ARTWORK_QUERY
        }
    }
}
</script>


