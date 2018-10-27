<template>
    <div>
        <div id="form">
            <div style="text-align: center">
                <v-avatar size="100px;">
                    <v-btn small fab absolute bottom right dark color="black" icon @click="tickUpload"><v-icon>edit</v-icon></v-btn>
                    <img :src="displayPicture ? displayPicture : '/icon_avatar.png'">
                </v-avatar>
            </div>
            <input type="file" ref="photo" style="display:none;" id="photo" @change="submitPhoto"/>
            <div id="dataForm">
                <div>
                    <span class="label_title">
                        First Name
                    </span> <br>
                    <v-text-field solo flat style="border: 1px solid grey" v-model="firstName" label="First Name" :error-messages="firstNameErrors" @blur="$v.firstName.$touch()" @input="$v.firstName.$touch()"/>
                </div>
                <div>
                    <span class="label_title">
                        Last Name
                    </span><br>
                    <v-text-field solo flat style='border: 1px solid grey' v-model="lastName" :error-messages="lastNameErrors" label="Last Name" @blur="$v.lastName.$touch()" @input="$v.lastName.$touch()"/>
                </div>
                <div>
                    <span class="label_title">
                        Date of Birth
                    </span><br>
                    <v-menu ref="birthdateMenu" v-model="birthdateMenu" lazy :close-on-content-click="false" :return-value.sync="birthdate" offset-y transition="scale-transition" full-width max-width="500px">
                        <v-text-field slot="activator" solo flat style='border: 1px solid grey' append-icon="event" v-model="birthdate" label="YYYY-MM-DD"/>
                        <v-date-picker v-model="birthdate" no-title :scrollable="false">
                            <v-btn flat color="red" @click="birthdateMenu = !birthdateMenu">Cancel</v-btn>
                            <v-btn flat color="black" @click="$refs.birthdateMenu.save(birthdate)">Ok</v-btn>
                        </v-date-picker>
                    </v-menu>
                </div>
                <div>
                    <span class="label_title">
                        Gender
                    </span>
                    <v-select solo flat style='border: 1px solid grey' :items="genderList" v-model="gender" label="Gender" append-icon="keyboard_arrow_down"/>
                </div>
                <div id="address">
                    <span class="label_title">
                        Address
                    </span> <br>
                    <v-text-field v-model="address" label="Address" solo flat style='border: 1px solid grey' />
                </div>
                <div>
                    <span class="label_title">
                        City
                    </span><br>
                    <v-text-field v-model="city" label="City" solo flat style='border: 1px solid grey' />
                </div>
                <div>
                    <span class="label_title">
                        State
                    </span><br>
                    <v-text-field v-model="state" label="State" solo flat style='border: 1px solid grey' />
                </div>
                <div>
                    <span class="label_title">
                        Postal Code
                    </span><br>
                    <v-text-field v-model="postalCode" label="Postal Code" solo flat style='border: 1px solid grey' />
                </div>
                <div>
                    <span class="label_title">
                        Country
                    </span><br>
                    <v-select autocomplete v-model="country" label="Country" solo flat style='border: 1px solid grey' :items="countryList" append-icon="keyboard_arrow_down"/>
                </div>
                <div>
                    <span class="label_title">
                        Mobile Number
                    </span><br>
                    <v-text-field v-model="mobileNumber" :error-messages="mobileNumberErrors" @input="$v.mobileNumber.$touch()" @blur="$v.mobileNumber.$touch()" label="Mobile Number" solo flat style='border: 1px solid grey' />
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <v-card-text>
            <v-btn :dark="!invalidForm" color="black" :disabled="invalidForm" class="_btn" @click="submit" block>Save Changes</v-btn>
        </v-card-text>
    </div>
</template>

<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { API_ROUTE } from '@/config/routes'
import axios from 'axios'
import UPDATE_PROFILE_MUTATION from '@/graphql/user/updateprofile'
import eventbus from '@/plugins/eventbus'
import { GET_COUNTRY_LIST } from '@/helpers/helpers'

export default {
    mixins: [validationMixin],
    validations: {
        firstName: {
            required
        },
        lastName: {
            required
        },
        mobileNumber: {
            required
        }
    },
    data: () => ({
        _id: null, 
        firstName : null,
        lastName: null,
        gender: null,
        birthdate: null,
        mobileNumber: null,
        displayPicture: null,
        country: null,
        city: null,
        state: null,
        address: null,
        postalCode: null,
        birthdateMenu: false,
        genderList: ['Male', 'Female'],
        profile: null,
        loading: false,
        countryList: GET_COUNTRY_LIST()
    }),
    computed: {
        firstNameErrors () {
            const errors = []
            if(!this.$v.firstName.$dirty) return errors
            !this.$v.firstName.required && errors.push('First Name is required')
            return errors
        },
        lastNameErrors () {
            const errors = []
            if(!this.$v.lastName.$dirty) return errors
            !this.$v.lastName.required && errors.push('Last Name is required')
            return errors
        },
        mobileNumberErrors () {
            const errors = []
            if(!this.$v.mobileNumber.$dirty) return errors
            !this.$v.mobileNumber.required && errors.push('Mobile Number is required')
            return errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    mounted () {
        this.$store.watch(
            (state) => {
                if(state.profile.data) {
                    this.profile = state.profile.data
                }
            }
        )
    },
    methods: {
        loadStoreToState(data) {
            this._id = data._id
            this.firstName = data.firstName
            this.lastName = data.lastName
            this.gender = data.gender
            this.birthdate = new Date(data.birthdate).getFullYear() + '-' + (new Date(data.birthdate).getMonth() + 1) + '-' + new Date(data.birthdate).getDate()
            this.address = data.address1
            this.city = data.city
            this.state = data.state
            this.displayPicture = data.displayPicture
            this.country = data.country
            this.postalCode = data.postalCode
            this.mobileNumber = data.mobileNumber
        },
        tickUpload () {
            document.getElementById('photo').click()
        },
        submitPhoto() {
            var files = this.$refs.photo.files[0] 
            if(files) {
                this.triggerLoading()
                var data = new FormData()
                data.append('image', files) 
                axios.post(API_ROUTE + '/upload/single', data , {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token') 
                    }
                }).then(response => {
                    this.displayPicture = 'http://' + response.data.data
                    this.triggerLoading()
                })
            }
        },
        triggerLoading () {
            eventbus.$emit('loading')
        },
        async submit () {
            var data = this.loadStateToSubmitData()
            this.triggerLoading()
            this.$apollo.mutate({
                mutation: UPDATE_PROFILE_MUTATION,
                variables: data
            }).then(response => {
                const { Model, Successful, Message } = response.data.updateprofile
                if(!Successful) {
                    this.triggerAlert(Message, 'red', 'close')
                    this.triggerLoading()
                } else {
                    this.triggerAlert(Message, 'green', 'check')
                    this.$store.commit('profile/update', Model)
                    this.triggerLoading()
                }
            }).catch(err => {
                alert(err)
                this.triggerLoading()
            })
        },
        loadStateToSubmitData() {
            return {
                _id: this._id,
                firstName: this.firstName,
                lastName: this.lastName,
                birthdate: this.birthdate,
                displayPicture: this.displayPicture,
                gender: this.gender,
                address1: this.address,
                city: this.city,
                country: this.country,
                state: this.state,
                postalCode: this.postalCode,
                mobileNumber: this.mobileNumber
            }
        },
        triggerAlert(message, color, action) {
            eventbus.$emit('error', {message: message, color: color, action: action})
        }
    },
    watch: {
        profile: function (val) {
            if (val) {
                this.loadStoreToState(val)
            }
        }
    }
}
</script>


<style scoped>
    #form {
        padding: 5% 5% 20px 5%;
        width: 100%;
        display: grid;
        grid-template-columns: 20% 80%;
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    #dataForm {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
        grid-gap: 10px; 
    }
    .label_title {
        font-weight: 900;
        color: grey;
    }
    #address {
        grid-column-start: 1;
        grid-column-end: 3;
    }
    ._btn {
        font-weight: 700;
        height: 70px;
    }
    @media screen and (max-width: 736px) {
        #form {
            padding: 10px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-gap: 20px;
        }
        #dataForm {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
        }
        #address {
            grid-column-start: 1;
            grid-column-end: 1;
        }
    }
</style>

