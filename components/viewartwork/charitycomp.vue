<template>
    <div>
        <v-card style="height: 620px;" id="charityMain">
            <v-card-title>
                <h1>Charity</h1>
            </v-card-title>
            <div class="pa-2">
                <iframe width="100%" height="350" :src="charity.youtubeLink" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
            <v-card-text>
                {{charity.description}}
            </v-card-text>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: {
        charity : {
            type: Object
        }
    }    
}
</script>


<style scoped>
    @media screen  and (max-width: 768px) {
        #charityMain {
            height: auto !important;
        }
    }
   
</style>

