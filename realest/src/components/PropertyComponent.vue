<template>
      <center>
          <h1>Add your property</h1>
      </center>&nbsp;

  <form @submit.prevent="submit">
    <label for="property">Property Name:</label>
    <br>
    <v-text-field
      v-model="state.name"
      @input="v$.name.$touch"
      placeholder="Enter your Propertyname"
      clearable
    ></v-text-field>
    <p v-for="error in v$.name.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
    </p>

    <label for="property">Address:</label>
    <br>
    <v-text-field
      v-model="state.address"
      @input="v$.address.$touch"
      placeholder="Enter your address"
      clearable
    ></v-text-field>

    <p v-for="error in v$.address.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
    </p>

    &nbsp;

    <br>

    &nbsp;

    <v-btn class="me-4" type="submit"> submit </v-btn>
    
  </form>
  <p>{{ mainerror }}</p>
  

</template>

<script setup>
import { reactive,ref,computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import router from "@/router";
import { fetchdata } from "@/helpers/fetch";

const mainerror = ref("");

const state = reactive({
  name: "",
  address: "",
  userid:localStorage.getItem("id")
});
const rules = computed(() => {
  return {
    name: {
      required,
    },
    address: { required },
  };
});

const v$ = useVuelidate(rules, state);

const submit = async() => {
    const result = await v$.value.$validate();

    if(result){
      let data = await fetchdata("/addproperty", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
      })

     if (data.statusCode !== 400) {
        alert("property added");
        await router.push("/home");
      } else {
        mainerror.value = data.message
      }
    }
    else{
        alert("please fill the data");
        return false;
    }
};
</script>

<style scoped>
.error{
    color: brown;
}
</style>
