<template>
    <div>
        <v-card>
            <v-toolbar dark class="black">
                <v-container fluid fill-height justify-center>
                    <img src="/client-title.png" width="150px" alt="">
                </v-container>
                <v-spacer></v-spacer>
                <v-btn flat dark icon @click="close"><v-icon>close</v-icon></v-btn>
            </v-toolbar>
            <v-card-text>
                <v-container fluid fill-height justify-center>
                    <div style="text-align: center">
                        <i>Please click <span style="font-weight: 900">OK</span> to continue on purchasing the product</i>
                    </div>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn block style="font-weight: 700" class="black _btn" :dark="!loading" :disabled="loading" @click="buynow">
                    <span v-if="loading">
                        <v-progress-circular indeterminate color="black" size="20"></v-progress-circular>
                    </span> 
                    <span v-else>
                        OK
                    </span>
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>



<script>
/* eslint-disable */
import eventbus from '@/plugins/eventbus'
import BUY_NOW_MUTATION from '@/graphql/mutation/buynow'

export default {
    data: () => ({
        loading: false
    }),
    methods: {
        close () {
            this.$emit('close')
        },
        async buynow () {
            this.triggerLoading()
            
            this.$apollo.mutate({
                mutation: BUY_NOW_MUTATION,
                variables: this.loadToSubmitData()
            }).then(res => {
                this.triggerSnackbar('Successfully bought artwork', 'green', 'check')
                eventbus.$emit('buyNotify', { _id: res.data.buynow._id})
                this.close()
                this.$router.push('/order/'+ res.data.buynow._id)
            }).catch(err => {
                this.triggerSnackbar('Error on purchasing product', 'red', 'close')
            })

            this.triggerLoading()
        },
        loadToSubmitData () {
            return SUBMIT_DATA(this.$route.params.id, true)
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        triggerSnackbar(message, color, action) {
            eventbus.$emit('error', { message: message, color: color, action: action})
        }
    }
}

const SUBMIT_DATA = (artworkId, buyNow) => {
    return {
        artworkId : artworkId,
        buyNow: buyNow
    }
}
</script>

<style scoped>
    ._btn {
        height: 70px;
    }
</style>
