<template>
    <div>
        <v-card :height="heightCard">
            <div style="text-align: center">
                <v-card-media :src="banner" height="275">
                </v-card-media>
                <div id="dp">
                    <img :src="displayPhoto" height="150px" width="150px    " />
                </div>
            </div>    
            <div id="details">
                <v-card-text>
                    <div style="text-align:center">
                        <span style="font-weight:bolder"><h2>{{shortName}}</h2></span> <br>
                        <span style="font-size: 16px; font-weight: 600;">{{name}}</span>
                    </div>
                    <v-container fluid fill-height grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-btn block color="black" dark id="btn">Donate</v-btn>
                            </v-flex>
                            <v-flex xs6>
                                <v-btn block color="black" dark id="btn">Follow</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <div class="followers">
                    <span style="float: left;">1.2k<span style="color:grey"> FOLLOWERS</span></span> <span style="float: right;">1.2k<span style="color:grey"> DONATIONS</span></span>
                </div>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="pt-3 pb-3 pl-2">
                        <h2>About</h2>
                    </div>
                    <div>
                        <p>Nunc ac ipsum mollis, faucibus turpis in, imperdiet arcu. Donec ultricies ipsum ac nisi vehicula, at cursus turpis mattis. Nunc laoreet fermentum pretium. Etiam vehicula consequat justo, in facilisis lacus feugiat egestas. Nam tempus eu urna sed mollis. Proin vehicula ipsum eu maximus molestie. Integer interdum et eros vel congue. Nullam sit amet magna arcu. Morbi eget elit ut augue laoreet molestie sit amet non dolor.</p>
                    </div>
                </v-card-text>
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: {
        heightCard: {
            type: String
        },
        banner: {
            type: String
        },
        displayPhoto: {
            type: String
        },
        shortName: {
            type: String
        },
        name: {
            type: String
        }
    }    
}
</script>


<style scoped>
    #dp {
        display: inline-block;
        position: relative;
        top: -75px;
        border-radius: 50%;
        border: 3px solid whitesmoke;
    }
    img {
        object-fit: fill;
        border-radius: 50%;
    }
    #details {
        position: relative;
        top: -75px;
    }
    #btn {
        text-transform: none;
        height: 70px;
    }
    .followers {
        padding: 25px 80px 35px 80px;
    }
    @media screen and (max-width: 768px){
        .card {
            width: 96vw;
        }
        .followers {
        padding: 25px 15px 35px 15px;
        }
    }
</style>


