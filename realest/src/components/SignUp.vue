<template>
  <v-sheet rounded>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <h1>Signup</h1>
      <br>
      <form @submit.prevent="submitform">
        <label for="firstname">FirstName :</label>
        <v-text-field type="text" id="firstname" v-model="state.firstname" @input="v$.firstname.$touch" autofocus
           :rules="[required]" label="FirstName" placeholder="Enter your firstname" clearable
          tabindex="2"></v-text-field>
        <p v-for="error in v$.firstname.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
          <br>
        </p>
        <br>
        <label for="lastname">LastName :</label>
        <v-text-field type="text" id="lastname" v-model="state.lastname" @input="v$.lastname.$touch" autofocus
          :rules="[required]" label="LastName" placeholder="Enter your lastname" clearable
          tabindex="2"></v-text-field>
        <p v-for="error in v$.lastname.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
          <br>
        </p>
        <br>
        <label for="email">Email :</label>
        <v-text-field type="text" id="email" v-model="state.email" @blur="v$.email.$touch" 
          :rules="[required]" label="Email" placeholder="Enter your Email" clearable tabindex="3"></v-text-field>
        <p v-for="error in v$.email.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <br>
        <label for="password">Password:</label>
        <v-text-field type="password" id="password" v-model="state.password" @blur="v$.password.$touch"
          :rules="[required]" label="Password" placeholder="Enter your password" clearable
          tabindex="4"></v-text-field>
        <p v-for="error in v$.password.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <br>
        <label for="confirmpassword">Confirm Password:</label>
        <v-text-field type="password" id="confirm_password" v-model="state.confirm_password"
          @keypress="v$.confirm_password.$touch" :rules="[required]" label="confirm_password"
          placeholder="Enter your Confirm Password" clearable tabindex="5"></v-text-field>
        <p v-for="error in v$.confirm_password.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <br>
        <v-radio-group label="Are you a ?" v-model="state.option" @blur="v$.option.$touch" >
         <v-radio label="Customer" value="0"></v-radio>
         <v-radio label="Contractor" value="1"></v-radio>
        </v-radio-group>
        <p v-for="error in v$.option.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <br>
        <center>
          <v-btn type="submit" tabindex="6">Signup</v-btn>
        </center>
      </form>
      <br>
      <!-- <center>
        Or
        <br>
        <br>
        <RouterLink to="/login">
          <v-btn>LOG IN</v-btn>
        </RouterLink>
      </center> -->
    </v-card>
  </v-sheet>
</template>


<script setup>
import { computed, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { useRouter } from 'vue-router';
import { fetchdata } from '@/helpers/fetch';

const router = useRouter();

const state = reactive({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirm_password: '',
  option:''
})


const rules = computed(() => {
  return {
    firstname: {
      required,
    },
    lastname:{
      required
    },
    email: {
      required, email
    },
    password: { required, minLength: minLength(1) },
    confirm_password: {
      required, sameAs: sameAs(state.password)
    },
    option:{
      required
    }
  }
})

const v$ = useVuelidate(rules, state)

const submitform = async () => {
  const result = await v$.value.$validate();
  if (result) {
     await fetchdata("/signup",{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(state)
      })
     router.push('/');
  } else {
    alert("please fill the data");
  }
}

</script>

<style>
.error {
  color: brown;
}
</style>