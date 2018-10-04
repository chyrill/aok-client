<template>
    <div>
        <div id="wrapper">
            <div class="grid_item">
                <v-text-field label="Email Address" :disabled="loading" v-model="email" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" solo flat class="txt_field"></v-text-field>
            </div>
            <div id="grid_item">
                <v-text-field label="Password" :disabled="loading" v-model="password" type="password" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" solo flat class="txt_field"></v-text-field>
            </div>
        </div>
        <div style="text-align: center" class="pt-4 pb-3">
            <a>Forgot password?</a>
        </div>
        <div>
            <v-btn block class="btn_submit" @click="submit" :dark="!loading && !$v.$invalid" :disabled="loading || $v.$invalid"><span v-if="!loading">Login</span><v-progress-circular :size="25" color="black" indeterminate v-else></v-progress-circular></v-btn>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import LOGIN_MUTATION from '@/graphql/login'
import { CREATOR_ROUTE } from '@/config/routes'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import EventBus from '@/plugins/eventbus'

export default {
    mixins: [validationMixin],
    validations: {
        email: {
            required,
            email
        },
        password: {
            required
        }
    },
    data: () => ({
        email: null,
        password: null,
        loading: false
    }),
    computed: {
        emailErrors () {
            const errors = []
            if(!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Invalid email')
            !this.$v.email.required && errors.push('Email is required')
            return errors
        },
        passwordErrors () {
            const errors = []
            if(!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            return errors
        }
    },
    methods: {
        async submit () {
            this.triggerLoading()
            var data = this.loadStateToSubmitData()
            this.$apollo.mutate({
                mutation: LOGIN_MUTATION,
                variables: data
            }).then(response => {
                var res = response.data.login 
                if (res.role === '1') {
                    location.replace(CREATOR_ROUTE + '/?' + 'auth='+res.token)
                }
                else {
                    this.$apolloHelpers.onLogin(res.token)
                    this.$store.dispatch('setToken', res.token)
                    localStorage.setItem('token',res.token)
                    this.triggerLoading()
                    this.clearState()
                    EventBus.$emit('closeLogin')
                }
            }).catch(err => {
                if (err.graphQLErrors[0].state) {
                    var keys = Object.keys(err.graphQLErrors[0].state)
                    var message = err.graphQLErrors[0].state[keys[0]][0]
                    this.triggerAlert(message, 'red', 'close')
                }
                else {
                    this.triggerAlert(err.graphQLErrors[0].message,'red', 'close')
                }
                    this.triggerLoading()
            })
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        loadStateToSubmitData (){
            return {
                email: this.email,
                password: this.password
            }
        },
        triggerAlert(message, color, action) {
            EventBus.$emit('error',{message: message, color: color, action: action})
        },
        clearState() {
            this.$v.$reset()
            this.email = null
            this.password = null
        }
    }
}
</script>



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
