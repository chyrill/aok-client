<template>
    <div>
        <div id="wrapper">
            <div id="grid_item">
                <v-text-field label="First Name" solo flat class="textBox"></v-text-field>
            </div>
            <div id="grid_item">
                <v-text-field label="Last Name" solo flat class="textBox"></v-text-field>
            </div>
            <div id="grid_item">
                <v-text-field label="Email Address" solo flat class="textBox"></v-text-field>
            </div>
            <div id="grid_item">
                <v-text-field label="Password" solo flat class="textBox"></v-text-field>
            </div>
            <div id="grid_item">
                <p>By creating a CharityStars account, I agree to the <span style="color:black; font-weight: 700;">Terms of Service</span> and <span style="color:black; font-weight: 700;">Privacy Policy</span></p>
            </div>
        </div>    
        <div class="pt-2">
            <v-btn color="black" block dark id="regBtn" @click="register">Register</v-btn>
        </div>
    </div>
</template>


<script>
/* eslint-disable */

export default {
    methods: {
        register() {
            this.$emit('register', true)
        }
    }
}
</script>


<style scoped>
    .textBox {
        border: 1px solid grey;
    }
    #wrapper {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 20px 0 20px;
        grid-gap: 15px;
    }
    #grid_item {
        text-align: center
    }
    #regBtn {
        height: 50px;
        text-transform: none;
        font-weight: 700;
    }
</style>

