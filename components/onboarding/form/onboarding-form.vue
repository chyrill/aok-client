<template>
    <div>
        <v-card>
            <v-card-title>
                <h3>Personal</h3>
            </v-card-title>
            <div id="main_comp">
                <div>
                    <v-container justify-center>
                        <v-avatar size="120"><img :src=" displayPicture ? displayPicture : '/icon_avatar.png'" /><v-btn small absolute bottom right fab dark  class="black" icon @click="openUpload"><v-icon>edit</v-icon></v-btn></v-avatar>
                    </v-container>
                    <input type="file" ref="image" id="image" @change="submitPhoto" style="display: none;"/>
                </div>
                <div id="formMain">
                    <div>
                        <span class="_label">First Name </span>  <br>
                        <v-text-field style="border: 1px solid grey" solo flat v-model="firstName" :error-messages="firstNameErrors" @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()"></v-text-field>
                    </div>
                    <div>
                        <span class="_label">Last Name </span> <br>
                        <v-text-field style="border: 1px solid grey" solo flat v-model="lastName" :error-messages="lastNameErrors" @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()"></v-text-field>
                    </div>
                    <div>
                        <span class="_label">Date of Birth</span> <br>
                        <v-menu ref="birthdateMenu" :close-on-content-click="false" v-model="birthdateMenu" :nudge-right="40" lazy transition="scale-transition" offset-y full-width min-width="290px" :return-value.sync="birthdate">
                            <v-text-field slot="activator" solo flat style="border: 1px solid grey" readonly v-model="birthdate" append-icon="event" label="dd/mm/yyyy" :error-messages="birthdateErrors" @change="$v.birthdate.$touch()"/>
                            <v-date-picker no-title scrollable color="black" v-model="birthdate">
                                <v-spacer></v-spacer>
                                <v-btn flat color="red" @click="birthdateMenu = false">Cancel</v-btn>
                                <v-btn flat color="balck" @click="$refs.birthdateMenu.save(birthdate)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <div>
                        <span class="_label">Gender</span><br>
                        <v-select solo flat style="border: 1px solid grey" label="Select Gender" :items="genderList" v-model="gender" :error-messages="genderErrors" @change="$v.gender.$touch()" />
                    </div>
                    <div>
                        <span class="_label">Mobile</span><br>
                        <v-text-field solo flat style="border: 1px solid grey" label="Enter mobile number" v-model="mobileNumber" :error-messages="mobileNumberErrors" @input="$v.mobileNumber.$touch()" @blur="$v.mobileNumber.$touch()" />
                    </div>
                </div>
            </div>
            <v-divider></v-divider>
            <div style="text-align: center" class="pt-3 pb-3">
                <v-btn :dark="!invalidForm" color="black" class="_btn" :disabled="invalidForm" @click="submit">Start Browsing</v-btn>
            </div>
        </v-card>
    </div>
</template>

<script>
/* eslint-disable */
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import {API_ROUTE} from '@/config/routes'
import axios from 'axios'
import UPDATE_PROFILE_MUTATION from '@/graphql/user/updateprofile'
import EventBus from '@/plugins/eventbus'

export default {
    mixins: [validationMixin],
    validations: {
        firstName: {
            required
        },
        lastName: {
            required
        },
        birthdate: {
            required
        },
        gender: {
            required
        },
        mobileNumber: {
            required
        }
    },
    data: () => ({
        displayPicture: null,
        lastName: null,
        firstName: null,
        birthdate: null,
        gender: null,
        mobileNumber: null,
        birthdateMenu: false,
        genderList: ['Male', 'Female'],
        _id: null,
        profile: null,
        date: ''
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
        birthdateErrors () {
            const errors = []
            if(!this.$v.birthdate.$dirty) return errors
            !this.$v.birthdate.required && errors.push('Birthdate is required')
            return errors
        },
        genderErrors () {
            const errors = []
            if(!this.$v.gender.$dirty) return errors
            !this.$v.gender.required && errors.push('Gender is required')
            return errors
        },
        mobileNumberErrors () {
            const errors = []
            if(!this.$v.mobileNumber.$dirty) return errors
            !this.$v.mobileNumber.required && errors.push('Mobile number is require')
            return errors
        },
        invalidForm () {
            return this.$v.$invalid
        }
    },
    methods: {
        openUpload() {
            document.getElementById('image').click()
        },
        submitPhoto () {
            var files = this.$refs.image.files[0]
            if(files) {
                this.triggerLoading()
                var data = new FormData()
                data.append('image', files)
                axios.post(API_ROUTE + '/upload/single', data, {
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem('token')
                    }
                }).then( response => {
                    this.displayPicture = 'http://' + response.data.data
                    this.triggerLoading()
                })
            }
        },
        triggerLoading () {
            EventBus.$emit('loading')
        },
        async submit () {
            this.triggerLoading() 
            this.$apollo.mutate({
                mutation: UPDATE_PROFILE_MUTATION,
                variables: this.loadStateToSubmitData()
            })
            .then(res => {
                const { Message, Successful, Model } = res.data.updateprofile
                if(!Successful) {
                    this.triggerAlert(Message, 'red', 'close')
                    this.triggerLoading()
                } else {
                    this.triggerAlert(Message, 'green', 'check')
                    this.$store.commit('profile/update', Model)
                    this.triggerLoading()
                    this.$router.push('/')
                }
            })
            .catch(err => {
                this.triggerLoading()
                alert(err)
            })
        },
        loadStateToSubmitData() {
            return {
                _id: this._id,
                firstName: this.firstName,
                lastName: this.lastName,
                birthdate: new Date(this.birthdate),
                gender: this.gender,
                mobileNumber: this.mobileNumber,
                displayPicture: this.displayPicture
            }
        },
        triggerAlert(message, color, action) {
            var data = { message : message, color: color, action: action}
            EventBus.$emit('error', data)
        },
        loadStoreToState(profile) {
            this._id = profile._id
            this.firstName = profile.firstName
            this.lastName = profile.lastName
            this.gender = profile.gender
            this.mobileNumber = profile.mobileNumber
            this.displayPicture = profile.displayPicture
        }
    },
    mounted() {
        if(!localStorage.getItem('token')) {
            this.$router.push('/')
        }
        this.$store.watch(
            (state) =>  {
                if(state.profile.data){
                    this.profile = state.profile.data
                }
            }
        )
    },
    watch: {
        profile: function (val) {
            if(val) {
                this.loadStoreToState(val)
            }
        }
    }
}
</script>


<style scoped>
    #main_comp {
        padding: 5% !important;
        display: grid;
        grid-template-columns: 25% 75%;
        grid-template-rows: auto;
        grid-gap:20px;
    }
    #formMain {
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: auto;
        grid-gap: 20px;
    }
    ._label {
        font-weight: 700;
        font-size: 18px;
        color: grey;
    }
    .txt_field {
        border: 1px solid grey;
    }
    ._btn {
        text-transform: none;
        height: 70px;
        width: 60%;
        font-weight: 700;
    }
    @media screen and (max-width: 768px) {
        #main_comp {
            padding: 10px 5px 10px 5px;
            grid-template-columns: 100%;
        }
        #formMain {
            grid-template-columns: 1fr;
        }
    }
</style>

