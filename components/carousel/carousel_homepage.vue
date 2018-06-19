<template>
    <div>
        <v-carousel hide-delimiters>
            <v-carousel-item v-for="(item,i) in carouselArtwork" :src="item.image" :key="i">
                <div id="wrapper">
                    <div id="space-item">
                    </div>
                     <div id="grid-item">
                         <div id="inside_wrapper">
                             <div id="title">
                                 <h1>{{item.title}}, {{item.year}}</h1>
                                 {{item.artist}}
                             </div>
                             <div id="description">
                                 {{item.description}}
                             </div>
                             <div id="button">
                                 <button id="view_btn">View Artwork</button>
                             </div>
                         </div>
                    </div>
                </div>
            </v-carousel-item>
        </v-carousel>
    </div>
</template>

<style scoped>
#wrapper {
  padding-top: 10%;
  padding-bottom: 10%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 250px;
}
#space-item {
  grid-column: 1fr;
}
#grid-item {
  padding: 20px;
  grid-column: 1fr;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
}
#inside_wrapper {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr 1fr;
}
#title {
  grid-column: 1;
  grid-row: 1;
  align-items: justify-start;
}
#description {
  grid-column: 1;
  grid-row: 2;
}
#button {
  grid-column: 1;
  grid-row: 3;
}
#view_btn {
  border: 2px solid white;
  padding:5px 15px 5px 15px;
}
@media only screen and (max-width: 600px) {
  #wrapper {
    height: 100%;
    padding:0;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
  #space_item {
    grid-row: 1;
    grid-column: 2;
  }
  #grid_item {
    grid-row: 2;
    grid-column: 2;
  }
  #inside_wrapper {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 100%;
  grid-template-rows: 100% 1fr 100%;
  align-items: center;
}
#title {
  grid-column: 1;
  grid-row: 1;
  text-align: center;
}
#description {
  grid-column: 1;
  grid-row: 2;
  text-align: center;
}
#button {
  text-align: center;
  grid-column: 1;
  grid-row: 3;
}
#view_btn {
  border: 1px solid white;
  padding:5px 15px 5px 15px;
}
}
* {
        font-family: 'Nunito Sans', sans-serif;
}
</style>


<script>
/* eslint-disable */
import axios from "axios";
import data from "@/src/data/artworkdata";

export default {
  data() {
    return {
      carouselArtwork: []
    };
  },
  methods: {
    getFeaturedArtworks() {
      this.carouselArtwork = data.data;
      console.log(this.carouselArtwork);
    }
  },
  mounted() {
    this.getFeaturedArtworks();
  }
};
</script>