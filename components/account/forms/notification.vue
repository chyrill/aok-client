<template>
    <div>
        <div id="main" class="pa-3">
            <div class="three_column">
                <h3>Notifications</h3><br>
            </div>
            <div>
                <h4>Send me notifications</h4> <br>
            </div>
            <div class="sub_title">
                Email
            </div>
            <div class="sub_title">
                SMS
            </div>
            <div class="sub_title">
                I place a bid
            </div>
            <div>
                <v-switch color="cyan" v-model="a1"/>
            </div>
            <div>
                <v-switch color="cyan" v-model="b1"></v-switch>
            </div>
            <div class="sub_title">
                I'm outbid
            </div>
            <div>
                <v-switch color="cyan" v-model="a2"></v-switch>
            </div>
            <div>
                <v-switch color="cyan" v-model="b2"></v-switch>
            </div>
            <div class="sub_title">
                An item I bid on is closing
            </div>
            <div>
                <v-switch color="cyan" v-model="a3"></v-switch>
            </div>
            <div>
                <v-switch color="cyan" v-model="b3"></v-switch>
            </div>
            <div class="sub_title">
                An item I followed is closing
            </div>
            <div>
                <v-switch color="cyan" v-model="a4"></v-switch>
            </div>
            <div>
                <v-switch color="cyan" v-model="b4"></v-switch>
            </div>
            <div class="sub_title">
                AOK has a recommendations for me
            </div>
            <div>
                <v-switch color="cyan" v-model="a5"></v-switch>
            </div>
            <div>
                <v-switch color="cyan" v-model="b5"></v-switch>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

export default {
    data: () => ({
        a1 : false,
        b1: false,
        a2: false,
        b2: false,
        a3: false,
        b3: false,
        a4: false,
        b4: false,
        a5: false,
        b5: false
    })    
}
</script>


<style scoped>
    #main {
        width: 100%;
        display: grid;
        grid-template-columns: 70% 15% 15%;
        grid-template-rows: auto;
    }
    .three_column {
        grid-column-start: 1;
        grid-column-end: 4;
    }
    .sub_title {
        color: grey;
    }
</style>

