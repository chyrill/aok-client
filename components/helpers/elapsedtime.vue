<template>
    <div>
        <span v-if="seconds <= 60 && minutes <= 0">
            {{seconds}} <span v-if="seconds <= 1">sec</span> <span v-else>secs</span> ago
        </span>
        <span v-else-if="minutes <= 60 && hours <= 0 && days <= 1" >
            {{minutes}} <span v-if="minutes <= 1">min</span> <span v-else>mins</span> ago
        </span>
        <span v-else-if="hours <= 24 && days <= 0">
            {{hours}} <span v-if="hours <= 1">hr</span> <span v-else>hrs</span> ago
        </span>
        <span v-else-if="days <= 30">
            {{days}} <span v-if="days <= 1">day</span> <span v-else>days</span> ago
        </span>
        <!-- <span v-else>
            {{dateVal}}
        </span> -->
    </div>
</template>


<script>
/* eslint-disable */

export default {
    props: {
        dateVal : {
            type: String
        }
    },
    data: () => ({
        now: Math.trunc(new Date().getTime() / 1000)
    }),
    computed: {
        seconds () {
            return Math.trunc(this.now - this.dateValue) % 60
        },
        minutes () {
            return Math.trunc((this.now - this.dateValue) / 60) % 60 
        },
        hours () {
            return Math.trunc((this.now - this.dateValue) / (60 * 60)) % 24
        },
        days () {
            return Math.trunc((this.now - this.dateValue)/ (60 * 60 * 24))
        },
        dateValue () {
            return Math.trunc(new Date(this.dateVal).getTime() / 1000)
        }
    },
    mounted () {
        window.setInterval(() => {
            this.now = Math.trunc(new Date().getTime() / 1000)
        }, 1000)
    }
    
}
</script>

