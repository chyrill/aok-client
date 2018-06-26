<template>
    <div>
        <v-card style="height: 600px;" class="pa-2" id="main_div">
            <div id="wrapper">
                <div id="main">
                    <v-card class="grey lighten-3" height="100%">
                        <v-container fill-height fluid style="padding:0 !important">
                            <v-layout fill-height/>
                                <v-flex xs12 align-center flexbox style="text-align: center;">
                                    <img :src="mainPhoto" id="main_photo"/>
                                </v-flex>
                        </v-container>
                    </v-card>
                </div>
                <div id="list">
                    <div id="wrapper_list">
                        <div v-for="item in photoList" :key="item">
                            <img :src="item" height="100%" width="100%" @click="changePhoto(item)" class="elevation-1" id="photolist"/>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    props: [
       'photos', 'main_photo'
    ],
    data () {
        return {
            photoList: [],
            mainPhoto: ''
        }
    },
    mounted () {
        this.photoList = this.photos;
        this.photoList = ['/images/500_p.jpg', '/images/10000_p.jpg', '/images/5000_p.jpg']
        this.mainPhoto = this.main_photo;
        this.mainPhoto = '/images/200_p.jpg'
    },
    methods: {
        changePhoto (item){
            this.photoList = this.photoList.filter(e => e!== item)
            this.photoList.push(this.mainPhoto)
            this.mainPhoto = item
        }
    }    
}
</script>


<style scoped>
    #wrapper {
        display: grid;
        grid-template-columns: 1fr 60% 1fr;
        grid-template-rows: 580px;
        grid-gap: 10px;
        grid-template-areas: 
            ". m l"
    }
    #main {
        grid-area: m;
    }
    #list {
        grid-area: l
    }
    #main_photo {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    #wrapper_list {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6,1fr);
        grid-gap: 5px;
    }
    #photolist {
        object-fit: fill;
    }
    @media only screen and (max-width: 768px) {
        #wrapper {
            display: grid;
            grid-template-columns: 100%;
            grid-template-rows: 360px auto;
            grid-gap: 10px;
            grid-template-areas: 
                "m"
                "l"
        }
        #wrapper_list {
            display: grid;
            grid-template-columns: repeat(3,1fr);
            grid-template-rows: auto;
            grid-gap: 5px;
        }
        #photolist {
            object-fit: fill;
        }
        #main_div {
            height: 100% !important;
        }
    }
</style>    

