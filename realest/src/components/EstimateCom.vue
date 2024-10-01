<template>
    <div class="main">
              <v-card class="main2" v-for="i in alldata" :key="i">
                <v-img
                  height="120px"
                  src=""
                  cover
                ></v-img>
                <h3>job_name:{{ i.job_name }}</h3>                
                <h3>job_desc:{{ i.job_desc }} </h3>
                <h3>job_id:{{ i["estimate.jobid"] }}</h3>
                <h3>estimates:{{ i["estimate.estimates"] }}</h3>
                <h3>contractor_id:{{ i["estimate.con_id"] }}</h3>
                <RouterLink to="/home/channels">
                  <v-btn id='chatbtn'>chat</v-btn>
                </RouterLink>
                <v-btn id="acceptbtn" @click="acrej(i.id,i['estimate.id'])">Accept</v-btn>
                <v-btn id="rejectbtn" @click="acrej(false,i['estimate.id'])">Reject</v-btn>
              </v-card>
    </div>
</template>

<script setup>
import { fetchdata } from '@/helpers/fetch';


let id = localStorage.getItem('id');

import {onMounted,ref} from 'vue'

const alldata = ref('');

const getdata = async() =>{
    try {
      let data = await fetchdata(`/showestimatejobs/${id}`);
      alldata.value = data;
    } catch (error) {
      console.log(error);
    }
}

const acrej = async(load,id) => {
    if(load){
     alert("are you sure for accept this offer ?"); 
      await fetchdata(`/acrej/${load}/${id}`);
      getdata();
    }else{
      alert("are you sure for reject this offer ? ");
      await fetchdata(`/acrej/0/${id}`);
      getdata();
    }
}

onMounted(()=>{
  getdata();
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
.main {
    width: 1200px;
    display: flex;
    flex-wrap: wrap;
}
.main2 {
    width: 250px;
    height: 350px;
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
#chatbtn{
  position: absolute;
  width: 300px;
  left: 0px;
  bottom: 0px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}
</style>