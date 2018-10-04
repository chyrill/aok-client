<template>
    <div>
        <v-card> 
            <div>
                <v-container fluid fill-height justify-center>
                    <v-avatar size="170">
                        <img :src="artist.displayPicture" />
                    </v-avatar>
                </v-container>
            </div>        
            <div style="text-align: center">
                <span><h2>{{artist.name}}</h2></span>
                <span style="color: grey;">{{artist.country}}</span>
            </div>   
            <v-card-actions>
                <v-btn block :dark="isAuthenticated" color="black" id="btn" @click="submit" :disabled="!isAuthenticated">
                    <span v-if="!follow">Follow</span>
                    <span v-else>Unfollow</span>
                </v-btn>
            </v-card-actions>            
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import FOLLOW_MUTATION from '@/graphql/follow/follow'

export default {
    props: {
        artist: {
            type: Object
        },
        heightCard: {
            type: String
        },
        type: {
            type: String
        }
    },
    data: () => ({
        follow: false
    }),
    mounted () {
        this.follow = this.artist.follow
    },
    methods: {
        async submit () {
           this.$apollo.mutate({
               mutation: FOLLOW_MUTATION,
               variables: {
                   id: this.artist._id,
                   type: 'Charity'
               }
           })
           .then(res => {
               this.follow = res.data.follow
           })
           .catch(err => {
               alert(err)
           })
        }
    },
    computed: {
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        }
    }
}
</script>

<style scoped>
    #btn {
        text-transform: none;
        height: 60px;
    }
</style>