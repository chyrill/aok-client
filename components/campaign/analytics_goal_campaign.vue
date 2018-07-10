<template>
    <div>
        <v-card height="215">
            <v-card-media :src="campaign.image" height="215" class="white--text ">
                <div style="width: 100%">
                    <div class="pa-2" id="itemData">
                        <span style="font-size:14px; font-weight: 700;">{{campaign.title}}</span> <br>
                        <span style="float:left">end in {{remainingDays}} days</span> <span style="float: right">{{donationInPercentage}}% of ${{campaign.campaign_goal}}</span> <br>
                        <v-progress-linear v-model="donationInPercentage" color="orange lighten-2"></v-progress-linear>
                        <ul>
                            <li>{{campaign.donations}} People Donated</li>
                            <li>{{campaign.likes}} Likes</li>
                            <li>{{campaign.shares}} Shares</li>
                        </ul>
                    </div>
                </div>
            </v-card-media>
        </v-card>
    </div>
</template>



<script>
/* eslint-disable */

export default {
    props: {
        campaign: {
            type: Object
        }
    },
    data () {
       return {
           remainingDays: 3,
           donationInPercentage: 0
       }
    },
    mounted () {

        var percentage = Math.ceil((this.campaign.donations / this.campaign.campaign_goal) * 100)

        this.donationInPercentage = percentage
    }
}
</script>


<style>
    #itemData {
        width: 100%;
        position: absolute;
        bottom: 0;
    }
    ul li {
        display: inline-block;
        min-width: 150px;
    }
    ul {
        list-style: none;
    }
</style>

