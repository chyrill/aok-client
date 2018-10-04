<template>
    <div>
        <div id="filtersort">
            <div id="filter">
                <div class="hidden-sm-and-down">
                    <v-container fluid grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs1>
                                <br>
                                Filter:
                            </v-flex>
                            <v-flex xs3>
                                <v-select solo flat label="Country" class="selectItem"/>
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
                                            <v-select label="Country" solo flat class="selectItem"/>
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
                    <v-flex>
                        <v-select solo flat label="Sort By" class="selectItem"></v-select>
                    </v-flex>
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
        </div>
        <div class="wrapper">
            <div v-for="(item, index) in charities" :key="index">
                <card-follow-comp :artist="item" heightCard="360" type="Charity"/>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import followCard from '../artist/artist_card_follow'

export default {
    props: {
        charities : {
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
        'card-follow-comp': followCard
    }
}
</script>

<style scoped>
    #filtersort{
        width: 100%;
        display: grid;
        grid-template-columns: 60% 20% 20%;
        grid-template-rows: auto;
        grid-template-areas: 
            "f . s"
    }
    #filter {
        grid-area: f;
    }
    #sort {
        grid-area: s;
    }
    .selectItem {
        border: 1px solid grey;
    }
    #btnSort {
        text-transform: none;
        border: 1px solid grey;
    }
    #btn {
        text-transform: none;
        border-bottom: 1px solid grey;
    }
    .wrapper {
        padding-top: 2%;
        padding-bottom: 2%;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    @media screen and (max-width: 768px) {
        #filtersort {
            grid-template-columns: 100%;
            grid-template-areas: 
                "f"
                "s";
        }
        .wrapper {
            grid-template-columns: 96vw;
            grid-template-rows: auto;
            overflow-y: auto;
            height: 1000px;
        }
    }
</style>