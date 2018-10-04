<template>
    <div>
        <v-card :height="artworkHeight" :to="'/artworks/' + artwork._id">
            <div class="pa-2">
                <v-card class="grey lighten-3" height="200">
                    <v-container fluid fill-height justify-center>
                        <img :src="artwork.image" />
                    </v-container>
                </v-card>
            </div>
            <v-card-title>
                <div class="pb-3">
                    <span><a :href="'/artworks/' + artwork._id">{{artwork.title}}, {{artwork.year}}</a></span><br>
                    <span style="color: grey">{{artwork.artist}}</span><br>
                    <span style="color: grey">{{artwork.price}}</span>
                </div>
            </v-card-title>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: {
        artwork: {
            type: Object
        },
        artworkHeight: {
            type: String
        }
    }
}
</script>

<style scoped>
    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: fill;
    }
    .container {
        padding: 0 !important;
    }
    .card__title {
        padding-left: 16px;
        padding-top: 5px;
    }
    a {
        text-decoration: none;
        color: inherit
    }
</style>


