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
            <div id="sort">
                <v-select label="Sort By" solo flat id="selectItem" /> 
            </div>
        </div>
        <div class="artworklisting pt-3 pl-5 pr-5">

        </div>
        <footerComp />
    </div>
</template>

<script>
/* eslint-disable */
import footerComp  from '@/components/footer/footercomp'

export default {
    mounted () {
        var category = this.$route.params.category

        this.banner = this.categoryListing.find(x=> x.route === category)
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
            mobileDevice: false
        }   
    },
    components: {
        footerComp
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
        grid-gap: 10px;
    }
</style>
