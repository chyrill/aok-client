<template>
    <div>
        <v-card> 
            <div>
                <v-container fluid fill-height justify-center>
                    <v-avatar size="170">
                        <img :src="artist.display_photo" />
                    </v-avatar>
                </v-container>
            </div>        
            <div style="text-align: center">
                <span><h2>{{artist.name}}</h2></span>
                <span style="color: grey;">{{artist.country}}</span>
            </div>   
            <v-card-actions>
                <v-btn block dark color="black" id="btn">Follow</v-btn>
            </v-card-actions>            
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    props: {
        artist: {
            type: Object
        },
        heightCard: {
            type: String
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