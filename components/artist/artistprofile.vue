<template>
    <v-card style="height:990px;">
        <div style="text-align: center;">
            <v-card-media src="/images/500_p.jpg" height="275">
            </v-card-media>
            <div id="profile_pic">
                <img src="/icon_avatar.png"/>
            </div>
            <div style="position: relative; top: -70px;">
                <span><h2>Patrick</h2></span>
                <span>Graphic Designer</span>
            </div>
            <div style="position: relative; top: -70px;" class="pl-4 pr-4 pt-3">
                <v-btn block color="black" dark style="height: 70px; text-transform: none">Follow</v-btn>
            </div>
            <v-divider style="position: relative; top: -70px;"></v-divider>
        </div>
        <div class="pos">
            <div class="pt-3 pl-5 pr-5">
                <span style="float: left"><b>1.2k</b> FOLLOWERS</span> <span style="float: right"><b>352</b> ARTWORKS</span><br>
            </div>
            <v-divider style="position: relative; top: 30px;"></v-divider>
        </div>
        <div style="text-align: left;" class="pl-3 pr-3">
            <div class="pb-3">
                <h2>About</h2>
            </div>
            <div>
                <p style="text-align: left justify; font-size: 16px;">     
                    Nam laoreet risus ex, ac pretium tellus efficitur a. Aliquam cursus ipsum dignissim libero hendrerit ullamcorper. Phasellus luctus, urna sit amet finibus convallis, purus leo pretium ante, eu tempus augue ipsum ut leo. Fusce quis augue faucibus dolor dignissim facilisis eget eget nisi. Fusce a massa id erat tincidunt ornare eu vel risus. Fusce ultricies ut leo nec tempor. Curabitur imperdiet ipsum et orci varius ultrices. Nulla pulvinar ultricies justo, interdum euismod justo sodales nec.
                </p>
            </div>
        </div>
    </v-card>
</template>



<script>
/* eslint-disable */

export default {
    
}
</script>


<style scoped>
    #profile_pic {
        display: inline-block;
        height: 150px;
        width: 150px;
        position: relative;
        top: -75px;
        border-radius: 50%;
        background: whitesmoke;
    }
    #profile_pic img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid white;
    }
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    .pos {
        position: relative;
        top: -70px;
    }
</style>

