<template>
  <div>
    <div id="wrapper">
      <div id="grid_item">
        <v-text-field label="First Name" solo v-model="firstName" :error-messages="firstNameErrors" @input="$v.firstName.$touch()" @blur="$v.firstName.$touch()" flat class="textBox"></v-text-field>
      </div>
      <div id="grid_item">
        <v-text-field label="Last Name" solo v-model="lastName" :error-messages="lastNameErrors" class="textBox" @input="$v.lastName.$touch()" @blur="$v.lastName.$touch()" flat></v-text-field>
      </div>
      <div id="grid_item">
        <v-text-field label="Email Address" v-model="email" solo flat class="textBox" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()" ></v-text-field>
      </div>
      <div id="grid_item">
        <v-text-field label="Password" solo v-model="password" flat class="textBox" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" type="password"></v-text-field>
      </div>
      <div id="grid_item">
        <p>By creating a CharityStars account, I agree to the <span style="color:black; font-weight: 700;">Terms of Service</span> and <span style="color:black; font-weight: 700;">Privacy Policy</span></p>
      </div>
    </div>
    <div class="pt-2">
      <v-btn block class="_btn black" :dark="formValid" :disabled="!formValid" @click="submit">
        Register
      </v-btn>
    </div>
  </div>
</template>


<script>
  /* eslint-disable */
  import {
    validationMixin
  } from 'vuelidate'
  import {
    required,
    email,
    minLength
  } from 'vuelidate/lib/validators'
  import eventBus from '@/plugins/eventbus'
  import checkuser from '@/graphql/checkuser.gql'
  
  function passwordValidator(value) {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,25}$/
    console.log(value)
    console.log(pattern.test(value))  
    return pattern.test(value)
  }

  export default {
    mixins: [validationMixin],
    validations: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        passwordValidator
      }
    },
    data: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }),
    computed: {
      lastNameErrors() {
        const errors = []
        if (!this.$v.lastName.$dirty) return errors
        !this.$v.lastName.required && errors.push('Last Name is required')
        return errors
      },
      firstNameErrors() {
        const errors = []
        if (!this.$v.firstName.$dirty) return errors
        !this.$v.firstName.required && errors.push('First Name is required')
        return errors
      },
      emailErrors() {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Invalid email') 
        !this.$v.email.required && errors.push('email is required')
        return errors
      },
      passwordErrors() {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('password is required')
        !this.$v.password.minLength && errors.push('Password minimum length is 6.')
        !this.$v.password.passwordValidator && errors.push('Must have 1 numeric, 1 Uppercase and 1 lowercase.')
        return errors
      },
      formValid() {
        return !this.$v.$invalid
      },
      saveSignUp () {
        return this.$store.state.signup.signup
      }
    },
    methods: {
      submit() {
        this.$store.commit('signup/set', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName
        })
        this.$emit('register')
      }
    },
    mounted() {
      if(this.saveSignUp) {
        this.email = this.saveSignUp.email
        this.password = this.saveSignUp.password
        this.firstName = this.saveSignUp.firstName
        this.lastName = this.saveSignUp.lastName
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
    text-align: center;
  }
  
  ._btn {
    height: 75px;
    font-weight: 700;
  }
</style>

