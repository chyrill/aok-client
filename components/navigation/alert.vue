<template>
    <div>
        <v-alert :value="alert.show" id="alert" color="black" outline type="info" dismissible @click="del">
            <h3>{{alert.title}}</h3> 
            {{alert.message}} 
        </v-alert>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    props: {
        alert: {
            type: Object
        }
    },
    methods: {
        del () {
            this.$emit('del')
        }
    }
}
</script>


<style scoped>
    #alert {
        position: fixed;
        top: 70px;
        right: 20px;
        width: 500px;
        background: rgba(255, 255, 255, 0.3)
    }
    @media screen and (max-width: 770px) {
        #alert {
            top: 70px;
            right: 0;
            width: 100vw;
        }
    }
</style>


