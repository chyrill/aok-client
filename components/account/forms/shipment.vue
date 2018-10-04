<template>
    <div>
        <v-container fill-height fluid style="padding: 0" grid-list-md>
            <v-layout row wrap>
                <v-flex md6 xs12>
                    <span class="label_title">
                        Address 1
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' label="Address 1" v-model="address1" :error-messages="address1Error" @input="$v.address1.$touch()" @blur="$v.address1.$touch()" :disabled="loading"/>
                </v-flex>
                <v-flex md6 xs12>
                    <span class="label_title">
                        Address 2
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' label="Address 2" v-model="address2" :disabled="loading"/>
                </v-flex>
                <v-flex md6 xs12>
                    <span class="label_title">
                        City
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' label="City" v-model="city" :error-messages="cityError" @input="$v.city.$touch()" @blur="$v.city.$touch()" :disabled="loading" />
                </v-flex>
                <v-flex md6 xs12>
                    <span class="label_title">
                        State
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' label="State" v-model="state" :error-messages="stateError" @input="$v.state.$touch()" @blur="$v.state.$touch()" :disabled="loading"/>
                </v-flex>
                <v-flex md6 xs12>
                    <span class="label_title">
                        Postal Code
                    </span>
                    <v-text-field solo flat style='border: 1px solid grey' label="Postal Code" v-model="postalCode" :error-messages="postalCodeError" @input="$v.postalCode.$touch()" @blur="$v.postalCode.$touch()" :disabled="loading"/>
                </v-flex>
                <v-flex md6 xs12>
                    <span class="label_title">
                        Country
                    </span>
                    <v-select autocomplete style="border: 1px solid grey" solo flat append-icon="keyboard_arrow_down" :items="countryList" label="Country" v-model="country" :error-messages="countryError" @change="$v.country.$touch()" @input="$v.country.$touch()" :disabled="loading"></v-select>
                </v-flex>
            </v-layout>
        </v-container>
        <div class="pt-2 pb-2 pl-2" style="width: 100%">
            <v-btn class="_btn" color="green" :disabled="loading || invalidForm" :dark="!loading && !invalidForm" right @click="submit">Submit</v-btn>
        </div>
    </div>
</template>


<script>
/* eslint-disable */
import { GET_COUNTRY_LIST } from '@/helpers/helpers'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import ADD_SHIPMENT_MUTATION from '@/graphql/mutation/shipment/add'
import eventbus from '@/plugins/eventbus'

export default {
    mixins: [ validationMixin ],
    validations: {
        address1: {
            required
        },
        city: {
            required
        },
        state: {
            required
        },
        postalCode: {
            required
        },
        country: {
            required
        }
    },
    data: () => ({
        countryList: GET_COUNTRY_LIST(),
        address1: null,
        address2: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        loading: false
    }),
    computed: {
        address1Error () {
            const errors = []
            if(!this.$v.address1.$dirty) return errors
            !this.$v.address1.required && errors.push('Address 1 is required')
            return errors 
        },
        cityError () {
            const errors = []
            if(!this.$v.city.$dirty) return errors
            !this.$v.city.required && errors.push('City is required')
            return errors
        },
        stateError () {
            const errors = []
            if(!this.$v.state.$dirty) return errors
            !this.$v.state.required && errors.push('State is required')
            return errors
        },
        postalCodeError () {
            const errors = []
            if(!this.$v.postalCode.$dirty) return errors
            !this.$v.postalCode.required && errors.push('Postal Code is required')
            return errors
        },
        countryError () {
            const errors = []
            if(!this.$v.country.$dirty) return errors
            !this.$v.country.required && errors.push('Country is required')
            return errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    methods: {
        loadStateToSubmitData () {
            return {
                address1: this.address1,
                address2: this.address2,
                city: this.city,
                state: this.state,
                postalCode: this.postalCode,
                country: this.country
            }
        },
        triggerLoading () {
            this.loading = !this.loading
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {message : message, color: color, action: action})
        },
        async submit () {
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: ADD_SHIPMENT_MUTATION,
                variables: this.loadStateToSubmitData()
            }).then( res => {
                this.triggerAlert('Successfully added shipping address', 'green', 'check')
                this.$emit('submitted', res.data.addshipment)
            }).catch( err => {
                this.triggerAlert('Error on adding shipping address')
            })

            this.triggerLoading()
        }
    }    
}
</script>



<style scoped>
    .label_title {
        font-weight: 700;
        color: grey;
    }
    ._btn {
        height: 70px;
        width: 100%;
    }
</style>


