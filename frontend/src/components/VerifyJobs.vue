<template>
    <div class="main">
              <v-card
                class="mx-auto main2"
                max-width="344"
                v-for="i in alldata"
                :key="i"
              >
                <v-img
                  height="200px"
                  src="pexels-josh-hild-1270765-4270292.jpg"
                  cover
                ></v-img>

                <v-card-title> JOB: {{ i.job_name }} </v-card-title>

                  <v-card-subtitle> STATUS: {{ i.job_status }} </v-card-subtitle>

                <v-card-subtitle>
                  Contractor_id: {{ i.con_id }}
                </v-card-subtitle>

                  <v-btn id="acceptbtn" @click="verify(i.id)">verify</v-btn>

                <RouterLink to="/home/active_job">
                  <v-btn id="rejectbtn">Rejected</v-btn>
                </RouterLink>
              </v-card>
            </div>
</template>

<script setup>
import router from '@/router';
import { ref,onMounted } from 'vue';
import { fetchdata } from '@/helpers/fetch';

let id = localStorage.getItem('id');

const alldata = ref();

const getdata = async() =>{
    try {
      let data = await fetchdata(`/verify/${id}`);
      alldata.value = data
    } catch (error) {
      console.log(error);
    }
}

async function verify(id2){
    await fetchdata(`/complete/${id2}`);
    router.push('/home')
}

onMounted(()=>{
    getdata()
})
</script>

<style scoped>
.main {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
}
.main2 {
  width: 250px;
  height: 400px;
  border: 2px solid black;
  word-wrap: break-word;
  border-radius: 15px;
  margin: 10px;
  position: relative;
}
#rejectbtn{
  position: absolute;
  width: 100px;
  right: 0px;
  bottom: 40px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}
#acceptbtn{
  position: absolute;
  width: 100px;
  left: 0px;
  bottom: 40px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}

</style>