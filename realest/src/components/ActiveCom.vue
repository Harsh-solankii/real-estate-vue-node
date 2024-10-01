<template>
  Any comments and updates about the jobs
  <div class="main" v-for="i in alldata" :key="i">
    <v-card class="mx-auto main2" max-wid th="744" >
      Proof Images:
      <div style="display: flex; overflow-y: scroll;scrollbar-color:calc(0);">
        <div v-for="x in i.image" :key="x" style="display:flex;">
          <div>
            <img
            :src="'http://localhost:3087/uploads/' + x"
            alt="img"
            style="height: 200px; width: 200px; margin: 10px"
            />
          </div>
          <div>
            <img
            :src="'http://localhost:3087/uploads/' + x"
            alt="img"
            style="height: 200px; width: 200px; margin: 10px"
            />
          </div>
        </div>
      </div>  
      <v-card-subtitle> JOB NAME :{{ i.job_name }} </v-card-subtitle>
      <v-card-subtitle> comments contractor: {{ i.comment_con }} </v-card-subtitle>
      <RouterLink :to="{name:'comments',params:{id:i.jobid,conid:i.con_id}}">
        <v-btn id="addjob1">Add comments</v-btn>
      </RouterLink>
    </v-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { fetchdata } from "@/helpers/fetch";

const alldata = ref("");

let id = localStorage.getItem("id");

const getdata = async () => {
  try {
    let data = await fetchdata(`/receivepow/0/${id}`);
    alldata.value = data;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getdata();
});
</script>

<style scoped>
.main {
  width: 1200px;
}

#logout-btn {
  position: relative;
  margin-top: 235px;
  width: 100px;
}

.main2 {
  width: 700px;
  height: 450px;
  border: 2px solid black;
  word-wrap: break-word;
  border-radius: 15px;
  margin: 10px;
  padding: 25px;
  position: relative;
}

.main3 {
  width: 250px;
  height: 345px;
  border: 2px solid black;
  word-wrap: break-word;
  border-radius: 15px;
  margin: 10px;
  position: relative;
}

#addjob1 {
  position: absolute;
  width: 245px;
  right: 0px;
  bottom: 40px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}

#addjob2 {
  position: absolute;
  width: 245px;
  right: 0px;
  bottom: 0px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}
</style>