<template>
    <div>
        <div id="filtersort">
            <div id="filter">
                <div class="hidden-sm-and-down">
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs1>
                                <br>
                                Filter:
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="Country" solo flat id="selectItem"></v-select>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
                <div class="hidden-md-and-up">
                    <v-card :flat="!displayFilter">                
                        <div style="width:100%">
                            <v-btn block flat id="btn" @click="displayFilter = !displayFilter">Filter</v-btn>
                        </div>                        
                        <v-slide-y-transition>
                            <v-card-text v-show="displayFilter">
                                <v-container fill-height fluid grid-list-sm>
                                    <v-layout row wrap> 
                                        <v-flex xs12>
                                            <v-select label="Country" solo flat id="selectItem"/>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>  
                        </v-slide-y-transition>                   
                    </v-card>
                </div>
            </div>
            <div id="sort">
                <div class="hidden-sm-and-down">
                    <v-container fluid fill-height>
                        <v-layout row wrap>
                            <v-flex xs12>
                                <v-select label="Sort By" flat solo id="selectItem"></v-select>
                            </v-flex>
                        </v-layout>                        
                    </v-container>                    
                </div>
            </div>
            <div class="hidden-md-and-up">
                <v-card :flat="!sortDisplay">
                    <div style="width: 100%;">
                        <v-btn block flat id="btn" @click="sortDisplay = !sortDisplay">Sort By</v-btn>
                    </div>
                    <v-slide-y-transition>
                        <v-card-text v-show="sortDisplay">
                            <v-btn block flat id="btnSort">Name</v-btn>
                            <v-btn block flat id="btnSort">Year Joined</v-btn>
                            <v-btn block flat id="btnSort">Country</v-btn>
                        </v-card-text>
                    </v-slide-y-transition>
                </v-card>                   
            </div>
        </div>
        <div class="wrapper pt-3">
            <div v-for="(item,index) in artists" :key="index">
                <artist-comp :artist="item" />
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import artistComp from '../artist_card_follow'

export default {
    props: {
        artists: {
            type: Array
        }
    },
    data () {
        return {
            displayFilter: false,
            sortDisplay: false
        }
    },
    components: {
        'artist-comp': artistComp
    }
}
</script>

<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-gap:20px;
        grid-template-rows: auto;
    }
    #filtersort {
        display: grid;
        grid-template-columns: 60% 20% 20%;
        grid-template-rows: auto;
        grid-template-areas: 
            "f . s";
    }
    #filter {
        grid-area: f;
    }
    #sort {
        grid-area: s;
    }
    #selectItem {
        border: 1px solid grey;
    }
    #btn {
        text-transform: none;
        border-bottom: 1px solid grey;
    }
    #btnSort {
         border: 1px solid grey;
        text-transform: none;
    }
    
    @media screen and (max-width: 768px) {
        #filtersort{
            grid-template-columns: 100%;
            grid-template-areas: 
                "f"
                "s";
        }
        .wrapper {
            height: 1000px;
            display: grid;
            grid-template-columns: 100%;
            grid-gap:10px;
            grid-template-rows: auto;
            overflow-y: auto;
        }
    }
</style>