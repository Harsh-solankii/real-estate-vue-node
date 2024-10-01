<template>
  <form @submit.prevent="submitfunc">
   <h2>JOb data</h2>
   <div v-for="i in alldata.job_data" :key="i">
     <h3>Job.id- {{ i.id }}</h3>
     <h3>Job Name- {{ i.job_name }}</h3>
     <h3>Job Desc- {{ i.job_desc }}</h3>
     <h3>Job created date -{{ i.createdAt.slice(0,10) }} </h3>
    </div>

    <br>
   <h2>Tasks data</h2>
   <div v-for="(i,index) in alldata.task_data" :key="i">
     <h3>Task No.{{ index+1 }}</h3>
     <h3>Task title - {{ i.task_title }}</h3>
     <h3>Task Desc - {{ i.task_desc }}</h3>
    </div>
    <br>
    Your estimate for this Job
    <v-text-field v-model.number="estimate" aria-placeholder="estimate" />
    <v-btn type="submit">submit</v-btn>
   </form> 
</template>

<script setup>
import router from '@/router';
import { onMounted , ref } from 'vue';
import { useRoute } from 'vue-router';
import { fetchdata } from '@/helpers/fetch';

const alldata = ref([]);

const estimate = ref('');

const route = useRoute();

let jobid = route.params.id;

let conid = localStorage.getItem('id');

const getdata = async() => { 
  try {
    let taskdata = await fetchdata(`/showtask/${jobid}`);
    alldata.value = taskdata;
  } catch (error) {
    console.log(error);
  }
}


const submitfunc = async() => {
  let obj = {
    jobid:jobid,
    conid:conid,
    estimate:estimate.value,
    userid:alldata.value.job_data[0].userid
  }

  await fetchdata(`/addestimate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  router.push('/con');
}

onMounted(()=>{
 getdata();
})
</script>

<style scoped>

</style>