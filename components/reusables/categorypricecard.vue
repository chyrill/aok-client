<template>
    <v-card>
        <v-card-media :src="image" height="150">
            <v-container fill-height fluid>
                <v-layout fill-height/>
                    <v-flex xs12 align-start flexbox>
                        <span id="title_bar" > {{title}} </span> <span style="float:right">  <v-btn icon flat dark><v-icon>keyboard_arrow_right</v-icon></v-btn> </span> <br>
                         <span id="subtitle" >{{count}} artworks</span> 
                    </v-flex>
            </v-container>
        </v-card-media>
    </v-card>
</template>


<script>
/* eslint-disable */

export default {
    props: [ 'title', 'count', 'image']    
}
</script>

<style>
     #title_bar {
        font-size: 16px;
        font-weight: 900;
        color: white;
    }
    #subtitle {
        color: white;
        font-size: 14px;
    }

     @media only screen and (max-width: 600px)  {
        #title_bar {
            font-size: 14px;
            font-weight: 900;
            color: white;
        }
        #subtitle {
            color: white;
            font-size: 11px;
        }
    }
</style>

