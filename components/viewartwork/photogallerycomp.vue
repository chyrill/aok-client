<template>
    <div>
        <v-card style="height: 600px;" class="pa-2" id="main_div">
            <div id="wrapper">
                <div id="main">
                    <v-card class="grey lighten-3" height="100%">
                        <v-container fill-height justify-center>
                            <img :src="mainPhoto" id="main_photo"/>
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
    props: ['pictures'],
    data () {
        return {
            photoList: [],
            mainPhoto: ''
        }
    },
    mounted () {
        console.log(this.pictures)    
        this.mainPhoto = this.pictures[0]
        this.photoList = this.pictures.slice(1, this.pictures.length)
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
        width: 100%;
        height: 100%;
        object-fit: fill;
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

