<template>
    <div>
        <v-card height="600px">
            <v-card-text >
                <div style="padding-bottom: 25px; height: 24px;">
                    <span style="float: left; font-size: 16px; color: grey">Auction will end in</span> <span style="float: right; font-size: 24px">{{days}}:{{hours}}:{{minutes}}:{{seconds}}</span>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div class="pt-1" style="width:100%; line-height: 1.6">
                    <span style="font-size:24px; font-weight: 700; float: left; height: 24px;">Lynx, 2016</span> <span style="float:right"><v-btn icon fab small outline><v-icon>favorite_border</v-icon></v-btn><v-btn icon fab small style="background-color: #3b5bdb" dark><v-icon>fab fa-facebook-f</v-icon></v-btn></span><br>
                </div>
                <div class="pt-2">
                    <span style="font-size: 16px;">Patrick Cabral</span>
                </div>
                <div class="pt-5 pb-3" style="font-size: 16px;">
                    <span id="left_item" style="color: grey">Initial Price</span> <span id="right_item" style="font-weight:600">$1500</span> <br>
                    <span id="left_item" style="color: grey">Meduim</span> <span id="right_item" style="color: grey">Papercut</span> <br>
                    <span id="left_item" style="color: grey">Dimensions</span> <span id="right_item" style="color: grey">20in x 40 in</span> <br>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center" class="pt-2 pb-2">
                    with the purchase of this artwork, <b>$200</b> will be donated to <b>World Wide Fund for Nature</b>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div id="wrapper">
                    <div>
                        <v-text-field prefix="$" solo class="txt_fld" flat></v-text-field>
                    </div>
                    <div>
                        <v-btn block outline style="text-transform: none; height: 50px;margin-top: 0; font-weight: 600; border: 2px solid">Place bid</v-btn>
                    </div>
                </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text>
                <div style="text-align: center">
                    <v-btn block dark color="black" style="height: 100px; text-transform: none;font-size: 16px; font-weight: 700;">Buy now - $ 2,000</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>




<script>
/* eslint-disable */

function getRemainingTime(startDate, end) {
    
    var diff = (end - startDate)/1000
    var days = Math.floor(diff/ (60 * 60 * 24))
    var hours = Math.floor((diff - (days * 60 * 60 * 24))/(60 * 60))
    var minutes = Math.floor((diff - ((days * 60 * 60 * 24) + (hours * 60 * 60)))/ 60)
    var seconds = Math.floor((diff - ((days * 60 * 60 * 24) + (hours * 60 * 60)+(minutes * 60))))
    return days +':' + hours + ':' + minutes + ':' + seconds
}   

export default {
    props: {
       AuctionDate: {
            type: Number,
            coerce: str => Math.trunc(Date.parse(str)/1000)
        }
    },
    data () {
        return {
            now : Math.trunc((new Date()).getTime() /1000),
            date : Math.trunc((new Date('07/07/2018')).getTime() /1000)
        }
    },
    mounted () {
        setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000);
        },1000);
    },
    computed: {
        seconds() {
            return (this.date - this.now) % 60;
        },

        minutes() {
            return Math.trunc((this.date - this.now) / 60) % 60;
        },

        hours() {
            return Math.trunc((this.date - this.now) / 60 / 60) % 24;
        },

        days() {
            return Math.trunc((this.date - this.now) / 60 / 60 / 24);
        }
    }
}
</script>


<style scoped>
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
    .material-icons {
        font-family: 'Material Icons' !important;
    }
    .fab {
        font-family: Font Awesome\ 5 Brands !important;
    }
    #left_item {
        float: left;
    }
    #right_item {
        float: right;
    }
    .txt_fld {
        border: 1px solid grey;
    }
    #wrapper {
        width: 100%;
        display: grid;
        grid-template-columns: 70% 20%;
        grid-gap: 10px;
    }
</style>


