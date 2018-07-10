<template>
    <div>
        <v-card :height="heightCard">
           <div class="pa-2">
               <v-card height="250" class="grey lighten-3">
                   <v-container fluid fill-height justify-center>                                          
                        <img :src="artwork.image" />                               
                   </v-container>
               </v-card>
           </div>
           <v-card-title>
                <div style="width: 100%;">
                    <span style="float: left; font-weight: 700;">{{artwork.title}}, {{artwork.year }}</span><span style="float: right;">{{artwork.price}}</span> <br>
                    <span style="color:grey">{{artwork.category}}  {{artwork.size}}</span> <br><br>
                    <span style="font-weight: 700;" >{{artwork.artist}}</span>
                </div>
           </v-card-title>
           <v-divider></v-divider>
           <div style="text-align: center" class="pt-2 pb-1">
               <a href="/charity/1"><span style="font-weight:700">{{artwork.charity}}</span></a>
           </div>
        </v-card>
    </div>     
</template>


<script>
/* eslint-disable */

export default {
    props: {
        heightCard: {
            type: String
        },
        artwork: {
            type: Object
        }
    }
}
</script>

<style scoped>
    img {
        object-fit:contain;
    
        max-width: 100%;
        max-height: 100%;
    }
    .container {
        padding: 0;
    }
    a {
        text-decoration: none;
        color: black;
    }
</style>

