<template>
     <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-1" title="Estateo-Contractor Site">
        <v-spacer></v-spacer>

        {{ name }}
        <v-btn
          :prepend-icon="
            theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
          "
          slim
          @click="onClick"
        ></v-btn>
      </v-app-bar>
      <hr style="color: aliceblue" />
      <v-navigation-drawer>
        <v-card>
          <v-layout>
            <v-navigation-drawer theme="dark" permanent class="bg-blue">
              <v-list nav>
                <RouterLink to="/con">
                  <v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Dashboard"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/con/explore_jobs">
                  <v-list-item
                    prepend-icon="mdi-domain"
                    title="Explore Jobs"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/con/channels_con" :key="$router.path">
                  <v-list-item
                  prepend-icon="mdi-message-text"
                    title="Chat"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/con/updates">
                  <v-list-item
                  prepend-icon="mdi-arrow-up-bold-box"
                    title="Updates"
                  ></v-list-item>
                </RouterLink>
                <v-list-item
                  prepend-icon="mdi-information"
                    title="About"
                  ></v-list-item>
                <v-btn block @click="logout" id="logout-btn">
                    Logout
                  </v-btn>
              </v-list>
            </v-navigation-drawer>
            <v-main style="height: 620px;"></v-main>
          </v-layout>
        </v-card>
      </v-navigation-drawer>
      <hr style="color: aliceblue" />
      <v-main>
        <v-container>
          <div v-if="$route.path === '/con'">
            <h2>Your accepted jobs</h2>
            <div class="main">
              <v-card class="main2 bg-secondary" v-for="i in alldata2" :key="i">
                <v-img height="180px" src="pexels-charles-parker-5845540.jpg" cover></v-img>
                <h3>
                  Name:{{ i.job_name }}
                  <br>
                  Desc:{{ i.job_desc }}
                  <br>
                  Estimate:{{ i.job_estimate }}
                </h3>
                <RouterLink :to="{ name:'pow',params:{id:i.id,userid:i.userid} }">
                  <v-btn id="addjob">proof of work & comments</v-btn>
                </RouterLink>
                <RouterLink to="/con/channels_con">
                  <v-btn id="addjob1">chat</v-btn>
                </RouterLink>
              </v-card>
            </div>
             <div>
              <h2>Estimate submit Jobs</h2>           
              <div class="main">
                <v-card class="main2" v-for="i in alldata" :key="i">
                  {{ i }}
                </v-card>
            </div>
             </div>
            <div>
            </div>
          </div>
          <div>
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import {onMounted,onUpdated,ref} from 'vue'
import { fetchdata } from '@/helpers/fetch';

const theme = ref("light");

const name = ref("");

name.value = localStorage.getItem("firstname");

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}
const logout = () => {
  localStorage.clear();
  location.reload();
}

const alldata = ref();

const alldata2 = ref();

let id = localStorage.getItem('id');

const getdata = async () => {
  try {
    let data = await fetchdata(`/proposal_jobs/${id}`);
    alldata.value = data;
  } catch (error) {
    let data2 = await fetchdata(`/accepted_con_job/${id}`);
    alldata2.value = data2;
  }
};

onUpdated(()=>{
  getdata();
})

onMounted(()=>{
  getdata();
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
#logout-btn{
  position: relative;
  top:0px;
  width: 100px;
  margin-top: 325px;
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
#addjob{
  position: absolute;
  width: 245px;
  right: 0px;
  bottom: 2px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}
#addjob1{
  position: absolute;
  width: 245px;
  left: 0px;
  bottom: 45px;
  border-radius: 20px;
  background-color: lightblue;
  color: black;
}

#addestimates{
  position: absolute;
  width: 150px;
  left: 50px;
  right: 0px;
  bottom: 0px;
  border-radius: 20px;
  background-color: lightblue;
}
</style>