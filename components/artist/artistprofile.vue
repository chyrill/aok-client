<template>
    <v-card style="height:990px;">
        <div style="text-align: center;">
            <v-card-media :src="profile.profile.profileBanner" height="275">
            </v-card-media>
            <div id="profile_pic">
                <img :src="profile.profile.displayPicture? profile.profile.displayPicture : '/avatar_icon.png'"/>
            </div>
            <div style="position: relative; top: -70px;">
                <span><h2>{{profile.profile.alias}}</h2></span>
                <span>{{profile.profile.category}}</span>
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
                   {{profile.profile.description}}
                </p>
            </div>
        </div>
    </v-card>
</template>



<script>
/* eslint-disable */

export default {
    props: {
        profile : {
            type: Object
        }
    },
    mounted() {
        console.log(this.profile)
    }
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

