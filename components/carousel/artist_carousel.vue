<template>
    <div>
        <v-carousel hide-delimiters>
            <v-carousel-item v-for="item in artist" :key="item.id" :src="item.featured_artwork_image">
               <div class="wrapper">
                   <div id="profile">
                      <v-container fill-height fluid justify-center class="hidden-sm-and-down">                        
                        <v-flex xs12 flexbox>
                            <v-list two-line dark style="background: transparent;">
                                <v-list-tile avatar>
                                        <v-list-tile-avatar size="100">
                                            <img :src="item.display_photo" />
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title class="pl-3" id="title_name">
                                                <span id="name">{{item.name}}</span>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title class="pl-3">
                                                <span id="subtitle">{{item.banner_title}} </span>
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>                                
                                </v-list-tile>
                            </v-list>
                            <div class="pt-3">
                                <v-divider class="white"></v-divider>
                            </div>
                            <div class="pt-2">
                                <span style="color:whitesmoke">{{item.description}}</span>
                            </div>
                            <div class="pt-2">
                                <v-btn flat dark id="btn">View Profile</v-btn>
                            </div>
                        </v-flex>                                                 
                      </v-container>
                      <v-container class="hidden-md-and-up" fill-height fluid justify-center>
                          <v-flex xs12 style="text-align: center; color: whitesmoke;">
                              <v-layout row wrap>
                                  <v-flex xs12>
                                      <v-avatar size="100">
                                          <img :src="item.display_photo" />
                                      </v-avatar>
                                  </v-flex>
                                  <v-flex xs12>
                                      <span style="text-transform: uppercase; font-size:20px; font-weight:700;"><h2>{{item.name}}</h2></span>
                                  </v-flex>
                                  <v-flex xs12>
                                      <span style="font-size:15px;">{{item.banner_title}}</span>
                                  </v-flex>
                                  <v-flex xs12>
                                      <div class="pt-2">
                                        <span>{{item.description}}</span>
                                      </div>
                                  </v-flex>
                                  <v-flex xs12>
                                      <div class="pt-2">
                                          <v-btn  id="btn" flat dark>View Profile</v-btn>
                                      </div>
                                  </v-flex>
                              </v-layout>
                          </v-flex>
                      </v-container>
                   </div>
               </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<script>
/* eslint-disable */
import response from '@/src/data/featured_artist'

export default {
    data () {
        return {
            artist: []
        }
    },
    mounted () {
        this.artist = response.data
    }
}
</script>

<style scoped>
    #profile {
        grid-area: p;
        padding-left: 10%;
    }
    .wrapper {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 100%;
        grid-template-areas: 
            "p ."
    }
    #name {
        text-transform: uppercase;
        font-weight: 900;
        font-size: 49px;
    }
    #title_name {
        height: 50px;
        line-height: 50px;
    }
    #subtitle {
        font-size: 20px;
        line-height: 20px;
    }
    #btn {
        text-transform: none;
        font-weight: 700;
        border: 1px solid whitesmoke;
    }
    @media screen and (max-width: 768px) {
        .wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            grid-template-areas: 
            "."
            "p"
        }
        #profile {
            padding-left: 2%;
            padding-right: 2%;
        }
    }
</style>