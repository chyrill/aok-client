<template>
    <div>
        <div id="main">
            <onboarind-form-comp />
        </div>
        <footer-comp />
    </div>
           
</template>

<script>
/* eslint-disable */
import onboardingForm from '@/components/onboarding/form/onboarding-form'
import footerComp from '@/components/footer/footercomp'

export default {
    components: {
        'onboarind-form-comp': onboardingForm,
        'footer-comp' : footerComp
    },
    computed: {
        isAuthenticated () {
            return this.$store.state.isAuthenticated
        }
    },
    mounted() {
    },
    watch: {
        isAuthenticated: function(val) {
            if(!val) {
                this.$router.push('/')
            }
        }
    }
}
</script>


<style scoped>
    #main {
        padding: 20px 20% 20px 20%;
    }
    @media screen and (max-width: 768px) {
        #main {
            padding: 5px;
        }
    }
</style>


