<template>
    <div>
        <div id="wrapper" class="pt-5">
            <div id="photo_gal">
                <photo-gallery-comp  v-if="show" :pictures="artwork.pictures"/>
            </div>
            <div id="artwork_details">
                <artwork-details-comp v-if="show" :artwork="artwork" @buynow="showConfirmation = !showConfirmation"/>
            </div>
            <div id="art_description">
                <artwork-description-comp v-if="show" :description="artwork.description"/>
            </div>
            <div id="charity">
                <charity-comp v-if="show" :charity="artwork.charity"/>
            </div>
            <div id="bidders">
                <bidders-comp v-if="show" :bids="artwork.bids"/>
            </div>
            <div id="more_artworks">
                <artwork-listing-comp  v-if="show" :title="msg" :artworks="artwork.related" />
            </div>
            <div id="might_like">
                <artwork-listing-comp v-if="show" title="you might also like" :artworks="artwork.also" />
            </div>
        </div>  
        <div class="pt-3">
            <footer-comp />
        </div>
        <v-dialog v-model="showConfirmation" width="50%">
            <confirmation-dialog @close="showConfirmation =! showConfirmation"/>
        </v-dialog>
    </div>
</template>


<script>
/* eslint-disable */
import footerComp from '@/components/footer/footercomp'
import photogallerycomp from '@/components/viewartwork/photogallerycomp'
import artworkdetailscomp from '@/components/viewartwork/artworkdetailscomp'
import artworkdescriptioncomp from '@/components/viewartwork/artworkdescription'
import charitycomp from '@/components/viewartwork/charitycomp'
import bidderscomp from '@/components/viewartwork/biddercomp'
import artworklistcomp from '@/components/viewartwork/artworkslisting'
import response from '@/src/data/recently_sold_data'
import GET_ARTWORK_QUERY from '@/graphql/getartwork'
import eventBus from '@/plugins/eventbus'
import ConfirmationDialog from '@/components/viewartwork/dialog/confirmationdialog'

export default {
    components: {
        'footer-comp' : footerComp,
        'photo-gallery-comp': photogallerycomp,
        'artwork-details-comp' : artworkdetailscomp,
        'artwork-description-comp': artworkdescriptioncomp,
        'charity-comp': charitycomp,
        'bidders-comp': bidderscomp,
        'artwork-listing-comp' : artworklistcomp,
        'confirmation-dialog' : ConfirmationDialog
    },
    data () {
        return {
            artworks: response.RecentlySoldData.slice(0,4),
            artworks1: response.RecentlySoldData.slice(4,8),
            show: false,
            showConfirmation: false,
            msg: null
        }
    },
    apollo: {
        artwork: {
            query: GET_ARTWORK_QUERY,
            variables () {
                return {
                    id: this.$route.params.id
                }
            }
        }
    },
    watch: {
        artwork : function(val) {
            if(val) {
                this.msg = "More of " + val.artist.fullName + "'s works"
                this.show = true
            }
        }
    },
    mounted() {
        eventBus.$on('refreshArtworkPage', () => {
            this.$apollo.queries.artwork.refetch()
        })
    },
    methods: {
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
        grid-template-rows: 600px auto 620px auto auto;
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
        grid-area: ml;
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
            grid-template-rows: auto auto 100% 100% 1fr;
            grid-gap: 20px;
            grid-template-areas: 
                "pg"
                "ad"
                "ades"
                "c"
                "b"
                "ma"
                "ml"
        
        }
    }
</style>

