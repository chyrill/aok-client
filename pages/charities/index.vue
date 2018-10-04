<template>
    <div>
        <div id="banner">
            <v-container fluid fill-height justify-center>
                <span id="title">charities</span>
            </v-container>
        </div>
        <div id="listing">
            <listing-comp :charities="getcharities"/>
        </div>
        <footer-comp />
    </div>
</template>

<script>
/* eslint-disable */
import listingComp from '@/components/charity/listing_charity'
import response from '@/src/data/charities_data'
import footerComp from '@/components/footer/footercomp'
import GET_CHARITIES from '@/graphql/charity/getcharities';

export default {
    components: {
        'listing-comp' : listingComp,
        'footer-comp': footerComp
    },
    apollo: {
        getcharities: {
            query: GET_CHARITIES
        }
    }
}
</script>

<style scoped>
    #banner {
        height: 335px;
        width: 100%;
        background: url('/charity/charity_banner.jpg')
    }
    #title {
        text-transform: uppercase;
        font-size: 50px;
        font-weight: bold;
        color: whitesmoke;
    }
    #listing {
        padding: 50px 5% 30px 5%;
    }

    @media screen and (max-width: 768px) {
        #listing {
            padding: 3% 2% 5% 2% !important;
        }
    }
</style>