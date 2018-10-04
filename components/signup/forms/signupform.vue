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
        <v-text-field label="Email Address" v-model="email" solo flat class="textBox" :error-messages="emailErrors" @input="$v.email.$touch()" @blur="$v.email.$touch()"></v-text-field>
      </div>
      <div id="grid_item">
        <v-text-field label="Password" solo v-model="password" flat class="textBox" :error-messages="passwordErrors" @input="$v.password.$touch()" @blur="$v.password.$touch()" type="password"></v-text-field>
      </div>
      <div id="grid_item">
        <p>By creating a CharityStars account, I agree to the <span style="color:black; font-weight: 700;">Terms of Service</span> and <span style="color:black; font-weight: 700;">Privacy Policy</span></p>
      </div>
    </div>
    <div class="pt-2">
      <v-btn color="black" block :dark="!formValid && !loading" id="regBtn" @click.stop="submit" :disabled="formValid || loading">
        <v-progress-circular v-if="loading" indeterminate left></v-progress-circular>
        <div v-if="!loading">Register</div>
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
    email
  } from 'vuelidate/lib/validators'
  import eventBus from '@/plugins/eventbus'
  import checkuser from '@/graphql/checkuser.gql'
  
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
        required
      }
    },
    data: () => ({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      loading: false
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
        return errors
      },
      formValid() {
        return this.$v.$invalid
      }
    },
    methods: {
      async submit(event) {
        this.loading = true
        const submitData = {
          lastName: this.lastName,
          firstName: this.firstName,
          email: this.email,
          password: this.password
        }
        try {
          this.$apollo.mutate({
            mutation: checkuser,
            variables: submitData
          }).then(response => {
            this.loading = false
            eventBus.$emit('register', submitData)
          }).catch(error => {
             var keys = Object.keys(error.graphQLErrors[0].state)
             eventBus.$emit('error', {
              message: error.graphQLErrors[0].state[keys[0]][0],
              color: 'red',
              action: 'close'
            })
            this.loading = false
          })
        } catch (e) {
          console.log(e)
        }
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
  
  #regBtn {
    height: 50px;
    text-transform: none;
    font-weight: 700;
  }
</style>

