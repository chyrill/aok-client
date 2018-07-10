<template>
    <div>
        <v-card :height="heightCard">
            <v-card-title>
                <h2>Campaigns</h2>
            </v-card-title>
            <div class="listing">
                <div class="wrapper">
                    <div v-for="(item, index) in campaigns" :key="index">
                        <analytics-goal :campaign="item" />
                    </div>
                </div>
            </div>
        </v-card>
    </div>
</template>


<script>
/* eslint-disable */
import goalAnalyticsComp from './analytics_goal_campaign'

export default {
    props: {
        heightCard: {
            type: String
        },
        campaigns: {
            type: Array
        }
    },
    components: {
        'analytics-goal': goalAnalyticsComp
    }
}
</script>


<style scoped>
    .wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 10px;
        overflow-y: auto;
    }
    .listing {
        height: 400px;
        padding: 10px;
        overflow-y: hidden;
    }
</style>  


