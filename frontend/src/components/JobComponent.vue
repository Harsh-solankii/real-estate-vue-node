<template>
      <center>
          <h1>Add your Job for property</h1>
      </center>&nbsp;

  <form @submit.prevent="submit">
    <label for="property">Job Name:</label>
    <br>
    <v-text-field
      v-model="state.job_name"
      @input="v$.job_name.$touch"
      placeholder="Enter your Job name"
      clearable
    ></v-text-field>
    <p v-for="error in v$.job_name.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
    </p>

    <label for="property">Job Desc:</label>
    <br>
    <v-text-field
      v-model="state.job_desc"
      @input="v$.job_desc.$touch"
      placeholder="Enter your Job desc"
      clearable
    ></v-text-field>
    <p v-for="error in v$.job_desc.$errors" :key="error.$uid" class="error">
          {{ error.$message }}
    </p>

    <label for="property">select the property:</label>
    <br>
    <v-select v-model="state.prop_id" @input="v$.job_desc.$touch" :items="properties_data" item-title="name" item-value="id" label="Property"/>

    <p v-for="error in v$.prop_id.$errors" :key="error.$uid" class="error">
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
import { reactive,ref,computed,onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import router from "@/router";
import { fetchdata } from "@/helpers/fetch";

const mainerror = ref("");
  
const properties_data = ref([]);



let id = localStorage.getItem("id");

const getdata = async () => {
   try {
     let propvalues = await fetchdata(`/props/${id}`);
     properties_data.value = propvalues;
   } catch (error) {
     console.log(error);
   }
}

const state = reactive({
  job_name: "",
  job_desc: "",
  prop_id:"",
});

const rules = computed(() => {
  return {
    job_name: {
      required,
    },
    job_desc: { required },
    prop_id:{required}
  };
});

const v$ = useVuelidate(rules, state);

const submit = async() => {
    const result = await v$.value.$validate();

    if(result){
      let data = await fetchdata(`/addjob/${id}`, {
      method: "POST", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
      })

     if (data.statusCode !== 400) {
        alert("job added but still task is remaining");
        router.push("/home/task");
      } else {
        mainerror.value = data.message
      }
    }
    else{
        alert("please fill the data");
        return false; 
    }
};

onMounted(()=>{
  getdata();
})
</script>

<style scoped>
.error{
    color: brown;
}
</style>