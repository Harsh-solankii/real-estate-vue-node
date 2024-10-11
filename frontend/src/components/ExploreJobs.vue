<template>
    <h2>Explore Jobs</h2>
            <div class="main">
              <v-card class="main2" v-for="i in alldata2" :key="i">
                <v-img height="180px" src="pexels-vlado-paunovic-1567547-3038740.jpg" cover></v-img>
                <h3>
                  JOb_name:{{ i.job_name }}
                  <br>
                  job desc:{{ i.job_desc }}
                  <br>
                  create at:{{ i.createdAt.slice(0,10) }}
                  <br>
                  Property_name
                </h3>
                 <RouterLink :to="{ name:'estimates',params:{id:i.id} }">
                  <v-btn id="addestimates">ADD estimates</v-btn>
                 </RouterLink>
              </v-card>
            </div>
            
</template>

<script setup >
import { onMounted,ref } from 'vue';
import { fetchdata } from '@/helpers/fetch';

const alldata2 = ref();

let id = localStorage.getItem('id');

const getdata = async () => {

  try {
    let data2 = await fetchdata(`/getsubmitjobs/${id}`);
    alldata2.value = data2
  } catch (error) {
    console.log(error)
  }
};

onMounted(()=>{
  getdata();
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
    height: 350px;
    border: 2px solid black;
    word-wrap: break-word;
    border-radius: 15px;
    margin: 10px;
    position: relative;
} 

#addestimates{
  position: absolute;
  width: 150px;
  left: 50px;
  right: 0px;
  bottom: 0px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}

</style>