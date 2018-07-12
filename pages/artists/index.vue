<template>
    <div>
        <carousel-comp />
        <div class="wrapper">
            <div v-for="item in categories" :key="item">
                <category-comp :title="item" :artists="artists" />
            </div>
        </div>
        <footer-comp />
    </div>
    
</template>

<script>
/* eslint-disable */
import carouselComp from '@/components/carousel/artist_carousel'
import footerComp from '@/components/footer/footercomp'
import categoryComp from '@/components/artist/artist_listing/list_by_category'
import response from '@/src/data/featured_artist'

export default {
    components: {
        'carousel-comp': carouselComp,
        'footer-comp': footerComp,
        'category-comp': categoryComp
    },
    data () {
        return {
            categories: ['street art', 'contemporary', 'modern','digital','photography','abstract', 'papercut'],
            artists: response.data
        }
    }
}
</script>

<style scoped>
    .wrapper {
        padding: 5%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    @media screen and (max-width: 768px){
        .wrapper {
            grid-template-columns: 100%;
        }
    }
</style>