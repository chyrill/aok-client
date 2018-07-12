<template>
    <div>
        <div id="title">
            <divider title="all artworks" />
        </div>
        <div id="filter_sort" class="pt-4   ">
            <div id="filter">
                <div class="hidden-sm-and-down">
                    <v-container fluid fill-height grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs1>
                                <br>
                                Filter:
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="Price Range" solo id="selectItem" flat/>
                            </v-flex>
                            <v-flex xs5>
                                <v-select label="Acrylic on Canvass" solo id="selectItem" flat></v-select>
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="Year Made" solo id="selectItem" flat></v-select>
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
                                            <v-select label="Price Range" solo flat id="selectItem"/>
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-select label="Acrylic on Canvass" solo flat id="selectItem" />
                                        </v-flex>
                                        <v-flex xs12>
                                            <v-select label="Year Made" solo flat id="selectItem" />
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
                    <v-layout>
                        <v-flex xs12>
                            <v-select solo flat label="Sort By" id="selectItem"></v-select>
                        </v-flex>
                    </v-layout>
                </div>
                <div class="hidden-md-and-up">
                    <v-card :flat="!sortDisplay">
                        <div style="width: 100%;">
                            <v-btn block flat id="btn" @click="sortDisplay = !sortDisplay">Sort By</v-btn>
                        </div>
                        <v-slide-y-transition>
                            <v-card-text v-show="sortDisplay">
                                <v-btn block flat id="btnSort">Title</v-btn>
                                <v-btn block flat id="btnSort">Year</v-btn>
                                <v-btn block flat id="btnSort">Price</v-btn>
                            </v-card-text>
                        </v-slide-y-transition>
                    </v-card>   
                </div>
            </div>
        </div>
        <div class="wrapper pt-3">
            <div v-for="(item, index) in artworks" :key="index">
                <artwork-comp heightCard="420" :artwork="item"/>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import divider from '@/components/reusables/dividers'
import artworkComp from '@/components/reusables/artworkcardcompwithcharity'
import response from '@/src/data/recently_sold_data'

export default {
    components: {
        divider,
        'artwork-comp': artworkComp
    },
    data () {
        return {
            displayFilter: false,
            sortDisplay: false,
            artworks: []
        }
    },
    mounted () {
        this.artworks = response.RecentlySoldData
    }
}
</script>

<style scoped>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-template-rows: auto;
        grid-gap: 10px;
    }
    #filter_sort {
        display: grid;
        grid-template-columns: 60% 20% 20%;
        grid-template-rows: auto;
        grid-template-areas: 
            "f . s";
    }
    #filter{
        grid-area: f;
    }
    #sort {
        grid-area: s;
    }
    #selectItem {
        border: 1px solid grey;
    }
    #btn {
        border-bottom: 1px solid grey;  
        text-transform: none;
        height: 45px;
    }
    #btnSort {
        border: 1px solid black;
        text-transform: none;
    }
    @media screen and (max-width: 768px) {
        #filter_sort {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas: 
                "f"
                "s"
        }
        .wrapper {
            height: 1500px;
            grid-template-columns: 92vw;
            overflow-y: auto;
        }
    }
</style>