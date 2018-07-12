<template>
    <div>
        <div class="banner" :style="{backgroundImage: 'url('+ category.image +')'}">
            <div style="width:100%; height: 100%">
                <v-container fill-height fluid justify-center>
                    <span style="font-size:49px; font-weight: 900; text-transform: uppercase; color: whitesmoke;">{{category.title}}</span>
                </v-container>
            </div>
        </div>
        <div id="listing" class="pl-5 pr-5 pt-3 pb-5">
            <artist-list-comp :artists="artists"/>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import artistListingComp from '@/components/artist/artist_listing/list_by_category_with_filter'
import response from '@/src/data/featured_artist'
import footerComp from '@/components/footer/footercomp'

export default {
    data () {
        return {
            categories: [
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
                },
            ],
            category: {},
            artists: []
        }
    },
    mounted () {
        var category = this.$route.params.category

        this.category = this.categories.find(x=>x.route === category)
        this.artists = response.data
    },
    components: {
        'artist-list-comp': artistListingComp,
        'footer-comp': footerComp
    }
}
</script>

<style scoped>
    .banner {
        height: 330px;
    }
    @media screen and (max-width: 768px) {
        .listing {
            padding: 20px 2% 20px 2% !important;
        }
        
    }
</style>