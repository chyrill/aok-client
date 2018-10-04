<template>
    <div>
        <v-card>
            <v-card-title>
                <h1>Art Description</h1>
            </v-card-title>
            <v-card-text>
                <div class="pb-3" style="text-align: justify; font-size: 16px;  ">
                   {{description}}
                </div>        
            </v-card-text>
        </v-card>
    </div>    
</template>


<script>
/* eslint-disable */

export default {
    props: {
        description: {
            type: String
        }
    }
}
</script>



<style scoped>
    * {
        font-family: 'Nunito Sans', sans-serif;
    }
</style>


