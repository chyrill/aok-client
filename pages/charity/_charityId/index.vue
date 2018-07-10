<template>
    <div>
        <div class="wrapper pt-5 pl-5 pr-5 pb-5">
            <div id="profile">
                <profile-comp heightCard="920" :banner="charity.banner" :displayPhoto="charity.display_photo" :shortName="charity.short_name" :name="charity.name"/>
            </div>
            <div id="video">
                <v-card height="410">
                    <div class="pa-2">
                        <iframe width="100%" height="391" :src="charity.video_url" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                </v-card>
            </div>
            <div id="artwork">
                <artwork_listing heightCard="990" :artworks="artworkList"/>
            </div>
            <div id="campaign">
                <campaign_goal heightCard="475" :campaigns="charity.campaigns"/>
            </div>
        </div>
        <footerComp />
    </div>
</template>


<script>
/* eslint-disable */
import footerComp from '@/components/footer/footercomp'
import profileComp from '@/components/reusables/charityprofilecomp'
import response from '@/src/data/charity_data'
import artworkList from '@/components/artworklisting/artwork_listing_profile'
import responseArts from '@/src/data/recently_sold_data'
import campaignGoalComp from '@/components/campaign/campaign_goal_comp'

export default {
    components: {
        footerComp,
        'profile-comp' : profileComp,
        'artwork_listing': artworkList,
        'campaign_goal': campaignGoalComp
    },
    data () {
        return {
            charity: {},
            artworkList: []
        }
    },
    methods: {
        getCharityProfile (id){
            this.charity = response.data.find(x=> x.id == id)
        },
        getArtworks () {
            this.artworkList = responseArts.RecentlySoldData.slice(0,9)
        }
    },
    mounted () {
        var id = this.$route.params.charityId

        this.getCharityProfile(id)
        this.getArtworks()
    }
}
</script>


<style scoped>
    .wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 40% 60%;
        grid-template-rows: 410px auto auto 170px;
        grid-gap: 10px;
        grid-template-areas: 
            "p v"
            "p a"
            "c a"
            "c a"
    }
    #profile {
        grid-area: p;
    }
    #video {
        grid-area: v;
    }
    #campaign {
        grid-area: c;
    }
    #artwork {
        grid-area: a;
    }
    @media screen and (max-width: 768px) {
        .wrapper {
            padding-left: 2% !important;
            padding-right: 2% !important;
            padding-top: 2% !important;
            width:100%;
            display: grid;
            grid-template-columns: 96vw;
            grid-template-rows: auto;
            grid-gap: 10px;
            grid-template-areas: 
               "p"
               "v"
               "a"
               "c"
        }
    }
</style>

