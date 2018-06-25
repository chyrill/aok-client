<template>
    <div>
        <div id="wrapper">
            <div class="grid_item">
                <v-text-field label="Email Address" solo flat class="txt_field"></v-text-field>
            </div>
            <div id="grid_item">
                <v-text-field label="Password" solo flat class="txt_field"></v-text-field>
            </div>
        </div>
        <div style="text-align: center" class="pt-4 pb-3">
            <a>Forgot password?</a>
        </div>
        <div>
            <v-btn block class="btn_submit" dark>Login</v-btn>
        </div>
    </div>
</template>


<style scoped>
    #wrapper {
        display:  grid;
        width: 100%;
        grid-template-columns: 1fr;
        grid-gap: 15px;
    }
    .txt_field {
        border: 1px solid grey;
    }
    a {
        color: black;
    }
    .btn_submit {
        text-transform: none;
        height: 50px;
        font-weight: 700;
    }
</style>
