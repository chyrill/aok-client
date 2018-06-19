<template>
    <div>
        <carousel />
        <div id="wrapper">
            <div id="grid-item">
                <curatedArtwork />
            </div>
            <div id="grid-item">
                <browseCategory/>
            </div>
            <div id="grid-item">
                <browsePrice />
            </div>
            <div id="grid-item">
                <browseAuction />
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import carousel from '@/components/carousel/carousel_homepage'
import curatedArtwork from '@/components/homepage/curated_artwork'
import browseCategory from '@/components/homepage/browse_category'
import browsePrice from '@/components/homepage/browse_price'
import browseAuction from '@/components/homepage/auctionEndComp'

export default {
    components: {
        carousel,
        curatedArtwork,
        browseCategory,
        browsePrice,
        browseAuction
    }
}
</script>


<style scoped>
    #wrapper {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 100%;
        grid-gap: 20px;
        padding: 0 5% 0 5%;
    }
    #grid_item {
        grid-column: 1;
        grid-row: auto;
    }
</style>