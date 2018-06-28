<template>
    <div>
        <div id="wrapper">
            <div id="profile">
                <artist-profile-comp />
            </div>
            <div id="artworks"></div>
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

export default {
    components: {
        'artist-profile-comp'  : artistprofilecomp,
        'footer-comp': footerComp
    }    
}
</script>




<style scoped>
    #wrapper {
        padding: 2% 5% 0 5%;
        width:100%;
        display: grid;
        grid-template-columns: 440px 55%;
        grid-gap: 15px;
        grid-template-rows: 990px;
    }

    @media screen and (max-width: 768px){
        #wrapper {
            padding: 2% 2% 0 2%;
            width:100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 15px;
            grid-template-rows: 990px;
        }
    }
</style>


