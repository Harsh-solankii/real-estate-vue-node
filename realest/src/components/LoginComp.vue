<template>
  <v-sheet rounded>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <center>
        <h1>Login</h1>
      </center>

      <br />
      <form @submit.prevent="submitform">
        <label for="email">Email :</label>
        <v-text-field
          type="text"
          id="email"
          v-model="state.email"
          @input="v$.email.$touch"
          autofocus
          :rules="[required]"
          label="Email"
          placeholder="Enter your Email"
          clearable
          tabindex="1"
        ></v-text-field>
        <p v-for="error in v$.email.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <br />
        <label for="password">Password:</label>
        <v-text-field
          type="password"
          id="password"
          v-model="state.password"
          @input="v$.password.$touch"
          :rules="[required]"
          label="Password"
          placeholder="Enter your password"
          clearable
          tabindex="2"
        ></v-text-field>
        <p v-for="error in v$.password.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
        </p>
        <center>
          <p class="error">{{ mainerror }}</p>
          <br />
          <v-btn type="submit" tabindex="3">LOG IN</v-btn>
        </center>
      </form>
      <br />
      <center>
        Or
        <br />
        <br />
        <RouterLink to="/signup">
          <v-btn @click="signupvalue">Signup</v-btn>
        </RouterLink>
      </center>
    </v-card>
    <br />
  </v-sheet>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { fetchdata } from "@/helpers/fetch";

const router = useRouter();

const store = useStore();

const mainerror = ref("");

const state = reactive({
  email: "",
  password: "",
});

const rules = computed(() => {
  return {
    email: {
      required,
      email,
    },
    password: { required, minLength: minLength(1) },
  };
});

const v$ = useVuelidate(rules, state);

const submitform = async () => {
  const result = await v$.value.$validate();
  if (result) {
    let data = await fetchdata("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });

    if (data.statusCode !== 400) {
      localStorage.setItem("token", data.sessiondetails.cookie_token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("firstname", data.firstname);
      localStorage.setItem("lastname", data.lastname);
      store.commit("set_auth", true);
      if (data.option) {
        localStorage.setItem("role", "contractor");
        router.push("/con");
      } else {
        localStorage.setItem("role", "user");
        router.push("/home");
      }
    } else {
      mainerror.value = data.message;
      router.push("/");
    }
  } else {
    alert("please fill the data");
  }
};
</script>

<style scoped>
.error {
  color: brown;
}
</style>
