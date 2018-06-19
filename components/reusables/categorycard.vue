<template>
    <v-card>
        <v-card class="pa-1" flat>
            <v-card-media :src="image" height="200">
                <v-container fill-height fluid>
                    <v-layout fill-height/>
                        <v-flex xs12 flexbox style="text-align: center;">
                            <span id="title_bar">{{title}}</span> <br>
                            <span id="subtitle">{{count}} artworks</span>
                        </v-flex>
                </v-container>
            </v-card-media>
        </v-card>
    </v-card>
</template>


<script>
/* eslint-disable */

export default {
    props: [ 'title', 'count', 'image']
}
</script>


<style scoped>
    #title_bar {
        font-size: 18px;
        font-weight: 900;
        color: white;
        text-transform: uppercase;
    }
    #subtitle {
        color: white;
        font-size: 14px;
    }
</style>