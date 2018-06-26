<template>
    <div>
        <div id="wrapper" class="pt-5">
            <div id="photo_gal">
                <photo-gallery-comp />
            </div>
            <div id="artwork_details">
                <artwork-details-comp />
            </div>
            <div id="art_description">
            </div>
            <div id="charity">
            </div>
            <div id="bidders">
            </div>
            <div id="more_artworks">
            </div>
            <div id="might_like">
            </div>
        </div>  
        <div class="pt-3">
            <footer-comp />
        </div>
    </div>
   
</template>


<script>
/* eslint-disable */
import footerComp from '@/components/footer/footercomp'
import photogallerycomp from '@/components/viewartwork/photogallerycomp'
import artworkdetailscomp from '@/components/viewartwork/artworkdetailscomp'

export default {
    components: {
        'footer-comp' : footerComp,
        'photo-gallery-comp': photogallerycomp,
        'artwork-details-comp' : artworkdetailscomp
    }
}
</script>


<style scoped>
    #wrapper {
        padding-left:100px !important;
        padding-right:100px !important;
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 70% 30%;
        grid-template-rows: 600px auto 620px 1fr 1fr;
        grid-gap: 20px;
        grid-template-areas: 
            "pg ad"
            "ades ades"
            "c b"
            "ma ma"
            "ml ml"
    }
    #photo_gal {
        grid-area: pg;
    }
    #artwork_details {
        grid-area: ad;
    }
    #art_description {
        grid-area: ades;
        min-height: 220px;
        height: auto;
        width: 100%;
    }
    #charity {
        grid-area: c;
    }
    #bidders {
        grid-area: b;
    }
    #more_artworks {
        grid-area: ma;
        min-height: 200px;
    }
    #might_like {
        grid-area: ma;
        min-height: 200px;
    }
    @media only screen and (max-width: 768px) {
        #wrapper {
            height: 100%;
            width: 100%;
            display: grid;
            padding-top: 15px !important;
            padding-left:10px !important;
            padding-right:10px !important;
            grid-template-columns: 100%;
            grid-template-rows: auto auto 620px 1fr 1fr;
            grid-gap: 20px;
            grid-template-areas: 
                "pg"
                "ad"
                "ades"
                "c"
                "b"
                "ml"
                "ma"
        
        }
    }
</style>

