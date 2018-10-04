<template>
    <div>
        <div class="banner" :style="{backgroundImage: 'url('+banner.image+')'}">
            <v-container fluid fill-height>
                <v-layout fill-height />
                <v-flex xs12>
                    <div style="text-align: center;">
                        <span style="font-size: 24px; text-transform: uppercase;">
                            <h2>{{banner.title}}</h2>
                        </span><br>
                        <div style="padding: 0 10% 0 10%;">
                            {{banner.description}}
                        </div>
                    </div>
                </v-flex>
            </v-container>
        </div>
        <div class="wrapper pl-5 pr-5 pt-3">
            <div id="filter">
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
                <div class="hidden-sm-and-down">
                    <v-container fill-height fluid grid-list-sm>
                        <v-layout row wrap> 
                            <v-flex xs1>
                                <br>
                                Filter:
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="Price Range" solo flat id="selectItem"/>
                            </v-flex>
                            <v-flex xs5>
                                <v-select label="Acrylic on Canvass" solo flat id="selectItem" />
                            </v-flex>
                            <v-flex xs3>
                                <v-select label="Year Made" solo flat id="selectItem" />
                            </v-flex>
                        </v-layout>
                    </v-container>
                </div>
            </div>
            <div id="sort">
                <div class="hidden-sm-and-down">
                    <v-select label="Sort By" solo flat id="selectItem" /> 
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
        <div class="artworklisting pt-3 pl-5 pr-5 pb-5">
            <div v-for="(item,index) in artworks" :key="index">
                <artwork-comp heightCard="420" :artwork="item"/>
            </div>
        </div>
        <footerComp />
    </div>
</template>

<script>
/* eslint-disable */
import footerComp  from '@/components/footer/footercomp'
import artworkComp from '@/components/reusables/artworkcardcompwithcharity'
import response from '@/src/data/recently_sold_data'

export default {
    mounted () {
        var deviceWidth = document.documentElement.clientWidth

        if (deviceWidth <= 768) 
            this.mobileDevice = true 

        this.$nextTick( () => {
            window.addEventListener('resize',function (){
                var width = document.documentElement.clientWidth
               
                if (width <= 768) {
                    this.mobileDevice = true
                }
                else 
                    this.mobileDevice = false
            })
        })

        var category = this.$route.params.category

        this.banner = this.categoryListing.find(x=> x.route === category)
        this.getArtwork()

        
    },
    data () {
        return {
            categoryListing: [
                {  
                    route: 'abstract',
                    title: 'abstract',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/abstract.jpg'
                },
                {  
                    route: 'photography',
                    title: 'photography',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/photo.jpg'
                },
                {
                    route: 'streetart',
                    title: 'street art',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/streetart.jpg'
                },
                {
                    route: 'modern',
                    title: 'modern',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/modern.jpg'
                },
                {
                    route: 'contemporary',
                    title: 'contemporary',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/contemporary.jpg'
                },
                {
                    route: 'digital',
                    title: 'digital',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/digital.jpg'
                },
                {
                    route: 'papercut',
                    title: 'papercut',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel sem sit amet augue vestibulum sodales eu eget massa. Morbi enim dolor, accumsan quis magna egestas, bibendum finibus mauris. Proin rutrum nunc quis erat viverra lacinia. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
                    image: '/category/papercut.jpg'
                }
            ],
            banner: {},
            mobileDevice: false,
            artworks: [],
            displayFilter: false,
            sortDisplay: false
        }   
    },
    components: {
        footerComp,
        'artwork-comp': artworkComp
    },
    methods: {
        getArtwork () {
            this.artworks = response.RecentlySoldData
        },
        getDisplayWidth () {
            return document.documentElement.clientWidth
        }
    }
}
</script>


<style scoped>
    .banner {
        width: 100%;
        height: 340px;
        color: whitesmoke;
    }
    .wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows:  auto;
        grid-template-areas: 
            "f f . s"
    }
    #filter {
        grid-area: f;
    }
    #sort {
        grid-area: s;
    }
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    #selectItem {
        height: 45px;
        border: 1px solid grey;
    }
    .artworklisting {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    @media screen and (max-width: 768px) {
        .wrapper {
            padding: 5px 15px 5px 15px !important;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-gap: 1px;
            grid-template-areas:
                "f"
                "s"
        }
        .artworklisting {
            padding: 5px 15px 30px 15px !important;
            display: grid;
            grid-template-columns: repeat(4, 90vw);
            grid-template-rows: auto;
            grid-gap: 10px;
            overflow-y: auto;
        }
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
</style>
