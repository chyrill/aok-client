<template>
    <div>
        <div id="main" class="pa-3">
            <div>
                <h3>Password</h3>
            </div>
            <div id="formMain">
                <div style="color: grey;">
                    <p>To keep your account safe, here are a few tips on how to create a strong password</p>
                    <p>-Use a unique password for each of your important accounts</p>
                    <p>-Use a mix of letters, number, and symbols in your password</p>
                    <p>-Don't use personal information or common wors as a password</p>
                    <p>-Make sure your backup password options are up-to-date and secure</p>
                    <p>-Keep your password secure</p>
                </div>
                <div>
                    <span class="label_title">
                        Current
                    </span>
                    <v-text-field v-model="currentPassword" :error-messages="currentPasswordErrors" @blur="$v.currentPassword.$touch()" @input="$v.currentPassword.$touch()" type="password" :disabled="loading" solo flat style='border: 1px solid grey' />
                </div>
                <div>
                    <span class="label_title">
                        New
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' v-model="newPassword" :error-messages="newPasswordErrors" @blur="$v.newPassword.$touch()" @input="$v.newPassword.$touch()" type="password" :disabled="loading"/>
                </div>
                <div>
                    <span class="label_title">
                        Confirm New
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' v-model="confirmPassword" :error-messages="confirmPasswordErrors" @blur="$v.confirmPassword.$touch()" @input="$v.confirmPassword.$touch()" type="password" :disabled="loading"/>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <div style="text-align: center" class="pt-2 pb-2">
            <v-btn style="width:200px; height: 70px;" color="black" :dark="!loading && !invalidForm" :disabled="invalidForm || loading" class="_btn" @click="submit">Submit</v-btn>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
import CHANGE_PASSWORD_MUTATION from '@/graphql/changepassword'
import eventbus from '@/plugins/eventbus'

export default {
    mixins: [validationMixin],
    validations: {
        currentPassword: {
            required
        },
        newPassword: {
            required
        },
        confirmPassword: {
            required,
            sameAs: sameAs('newPassword')
        }
    },
    data: () => ({
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
        loading: false
    }),
    computed: {
        currentPasswordErrors () {
          const errors = []
          if(!this.$v.currentPassword.$dirty) return errors
          !this.$v.currentPassword.required && errors.push('Current password is required')
          return errors
        },
        newPasswordErrors () {
          const errors = []
          if(!this.$v.newPassword.$dirty) return errors
          !this.$v.newPassword.required && errors.push('New password is required')
          return errors
        },
        confirmPasswordErrors () {
          const errors = []
          if(!this.$v.confirmPassword.$dirty) return errors
          !this.$v.confirmPassword.required && errors.push('Confirm password is required')
          !this.$v.confirmPassword.sameAs && errors.push('new and confirm password does not match')
          return errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    methods: {
        triggerLoading () {
            this.loading = !this.loading
        },
        triggerAlert (message, color, action) {
            eventbus.$emit('error', { message: message, color: color, action: action})
        },
        async submit() {
            this.triggerLoading()
            var data = this.loadStateToSubmitData()
            this.$apollo.mutate({
                mutation: CHANGE_PASSWORD_MUTATION,
                variables: data
            }).then(res => {
                this.triggerAlert('Successfully change password', 'green', 'check')
                this.clearState()
            }).catch(err => {
                this.triggerAlert('Error on changing password', 'red', 'close')
            })

            this.triggerLoading()
        },
        loadStateToSubmitData () {
            return {
                currentPassword: this.currentPassword,
                newPassword: this.newPassword
            }
        },
        clearState() {
            this.newPassword = null
            this.confirmPassword = null
            this.currentPassword = null
            this.$v.$reset()
        }
    }
}
</script>


<style scoped>
    #main {
        width: 100%;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    .label_title {
        font-weight: 900;
        color: gray;
    }
    #formMain {
        padding-right: 20px;
        width:100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    @media screen and (max-width: 769px) {
        #main {
            grid-template-columns: 1fr
        }
    }
</style>
