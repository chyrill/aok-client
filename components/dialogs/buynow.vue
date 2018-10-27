<template>
    <div>
        <v-card>
            <v-toolbar class="black" dark>
                <v-container fluid fill-height justify-center>
                    <img src="/client-title.png" width="200px;" />
                </v-container>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="close"><v-icon>close</v-icon></v-btn>
            </v-toolbar>
            <div v-if="isAuthenticated">
                <v-card-text>
                    <v-container fluid fill-height grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 md6 justify-center>
                                <v-container justify-center fill-height fluid style="padding: 0 !important;">
                                    <v-card height="200px" width="150px" class="grey ligthen-3">
                                        <v-container fluid fill-height justify-center id="gallery">
                                            <img :src="artwork.pictures[0]" class="_artwork_pic"/>
                                        </v-container>
                                    </v-card>
                                </v-container>
                            </v-flex>
                            <v-flex xs12 md6>
                                <div>
                                    <h3>{{artwork.title}}, {{artwork.year}}</h3>
                                    {{artwork.artist.fullName}} <br>
                                    <br>
                                    {{artwork.medium}} <br>
                                    {{artwork.height}} x {{artwork.width}} {{artwork.measurement}} <br><br>
                                    <h4>Buy Now Price:</h4> 
                                    <money-comp currency="$" :value="artwork.sellingPrice" />
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-btn class="black _btn" block :disabled="loading" :dark="!loading" @click="buy"><span v-if="!loading">Buy Now</span><span v-else><v-progress-circular indeterminate color="black" :size="50" /></span></v-btn> 
                </v-card-actions>
            </div>
            <div v-else>
                <v-card-text>
                    <div style="text-align: center;">
                        You need to be logged in to buy this product!
                    </div>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import EventBus from '@/plugins/eventbus'
import moneyconversionComp from '@/components/helpers/moneyconversion'
import BUY_NOW_MUTATION from '@/graphql/mutation/buynow'

export default {
    props: {
        artwork: {
            type: Object
        }
    },
    methods: {
        close () {
            EventBus.$emit('closeBuy')
        },
        async buy () {
            this.triggerLoading()
            var data = this.loadStateToSubmitData()
            this.$apollo.mutate({
                mutation: BUY_NOW_MUTATION,
                variables: data
            }).then( res => {
                this.triggerAlert('Successful transaction', 'green', 'check')
                EventBus.$emit('buyNotify', { _id : res.data.buynow._id })
                this.close()
                this.$router.push('/order/' + res.data.buynow._id)

            }).catch( err => {
                this.triggerAlert('Error on purchasing product','red','close')
            })

            this.triggerLoading()
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        triggerAlert(message, color, action) {
            EventBus.$emit('error',{message : message, color: color, action: action})
        },
        loadStateToSubmitData () {
            return {
                artworkId: this.artwork._id,
                buyNow: true
            }
        }
    },
    mounted() {
        this.$store.watch(
            (state) => {
                if(state.authentication) {
                    this.isAuthenticated = state.authentication.isAuthenticated
                }
            }
        )
    },
    data: () => ({
        loading: false,
        isAuthenticated: false
    }),
    components: {
        'money-comp': moneyconversionComp
    }
}
</script>


<style scoped>
    ._artwork_pic {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #gallery {
        padding: 0 !important;
    }
    ._btn {
        height: 70px;
        font-weight: 700;
    }
</style>

