<template>
    <div>
        <div id="wrapper">
            <div id="profile">
                <artist-profile-comp v-if="show" :profile="getuserbyprofileid"/>
            </div>
            <div id="artworks">
                <artworks-comp v-if="show" :artworks="getuserbyprofileid.artworks"/>
            </div>
        </div>    
        <div class="pt-5">
            <footer-comp />
        </div>
    </div>
</template>



<script>
/* eslint-disable */
import artistprofilecomp from '@/components/artist/artistprofile'
import footerComp from '@/components/footer/footercomp'
import artworksComp from '@/components/artist/artworkscomp'
import GET_USER_PROFILE_QUERY from '@/graphql/query/getuserbyprofileid'

export default {
    components: {
        'artist-profile-comp'  : artistprofilecomp,
        'artworks-comp' : artworksComp,
        'footer-comp': footerComp
    },
    apollo: {
        getuserbyprofileid: {
            query: GET_USER_PROFILE_QUERY,
            variables () {
                return   { id : this.$route.params.id}
            }
        }
    },
    watch: {
        getuserbyprofileid: function(val) {
            if(val) {
                this.show = true
            }
        }
    },
    data: () => ({
        show: false
    })
}
</script>




<style scoped>
    #wrapper {
        padding: 2% 5% 0 5%;
        width:100%;
        display: grid;
        grid-template-columns: 440px 65%;
        grid-gap: 15px;
        grid-template-rows: 990px;
    }

    @media screen and (max-width: 768px){
        #wrapper {
            padding: 2% 2% 0 2%;
            width:100%;
            display: grid;
            grid-template-columns: 96vw;
            grid-gap: 15px;
            grid-template-rows: 990px;
        }
    }
</style>


