<template>
    <div>
        <div>
            <carousel-comp />
        </div>
        <div class="wrapper pa-5">
            <div id="browseCategory">
                <browse-category-comp />
            </div>
            <div id="browsePrice">
                <browse-price-comp />
            </div>
            <div>
                <artworks-comp />
            </div>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import footerComp from '@/components/footer/footercomp'
import carouselComp from '@/components/carousel/carousel_homepage'
import browseCategoryComp from '@/components/homepage/browse_category'
import browsePriceComp from '@/components/homepage/browse_price'
import artworkListingComp from '@/components/artworklisting/all_artwork_with_filter'

export default {
    components: {
        'footer-comp': footerComp,
        'carousel-comp': carouselComp,
        'browse-category-comp': browseCategoryComp,
        'browse-price-comp': browsePriceComp,
        'artworks-comp': artworkListingComp
    }    
}
</script>


<style scoped>
    .wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 100%;
        grid-gap: 50px;
    }
    @media screen and (max-width: 768px) {
        .wrapper {
            padding: 40px 3% 40px 3% !important;
        }
    }
</style>

