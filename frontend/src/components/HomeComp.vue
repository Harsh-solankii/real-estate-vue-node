<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar class="px-1" title="Estateo">
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
                <RouterLink to="/home">
                  <v-list-item
                    prepend-icon="mdi-view-dashboard"
                    title="Dashboard"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/estimates_job">
                  <v-list-item
                    prepend-icon="mdi-email"
                    title="Show Estimates"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/active_job">
                  <v-list-item
                    prepend-icon="mdi-arrow-up-bold"
                    title="job updates"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/property">
                  <v-list-item
                    prepend-icon="mdi-domain"
                    title="Add property"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/job">
                  <v-list-item
                    prepend-icon="mdi-plus"
                    title="Add job"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/channels" :key="$router.path">
                  <v-list-item
                    prepend-icon="mdi-chat"
                    title="Chat"
                  ></v-list-item>
                </RouterLink>
                <RouterLink to="/home/verify" :key="$router.path">
                  <v-list-item
                    prepend-icon="mdi-arrow-right-bold"
                    title="Verify Job"
                  ></v-list-item>
                </RouterLink>
                <v-btn block @click="logout" id="logout-btn"> Logout </v-btn>
              </v-list>
            </v-navigation-drawer>
            <v-main style="height: 620px"></v-main>
          </v-layout>
        </v-card>
      </v-navigation-drawer>
      <hr style="color: aliceblue"/>
      <v-main>
        <v-container>
          <div v-if="$route.path === '/home'">
            <h2>Your InProgress Job</h2>
            <div class="main">
              <v-card
                class="mx-auto main2"
                max-width="344"
                v-for="i in alldata3"
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

                <RouterLink to="/home/channels">
                  <v-btn id="addjob1">chat</v-btn>
                </RouterLink>
                <RouterLink :to="{ name: 'payment', params: { id: i.con_id } }">
                  <v-btn id="addjob2">payment</v-btn>
                </RouterLink>
              </v-card>
            </div>
            <br>
            <h2>Your Submitted Jobs</h2>
            <div class="main">
              <v-card
                class="mx-auto main3"
                max-width="344"
                v-for="i in alldata2.submited_jobs"
                :key="i"
              >
                <v-img height="200px" src="" cover></v-img>

                <v-card-title> JOB: {{ i.job_name }} </v-card-title>

                <v-card-subtitle> STATUS: Submited </v-card-subtitle>

                <v-card-subtitle>
                  create By:{{ i.createdAt.slice(0, 10) }}
                </v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    :id="i.id"
                    color="teal-accent-4"
                    text="View More"
                    variant="text"
                    @click="reveal(i)"
                    :key="i"
                  ></v-btn>
                </v-card-actions>

              </v-card>
            </div>
            <hr style="margin: 20px" />
            <h2>Your remaining Jobs</h2>
            <div class="main">
              <v-card class="main2" v-for="i in alldata2.remaining_jobs" :key="i">
                <v-img
                  height="200px"
                  src=""
                  cover
                ></v-img>
                <h3>
                  JOb_name:{{ i.job_name }}
                  <br />
                  create at:{{ i.createdAt.slice(0, 10) }}
                  <br />
                  job desc:{{ i.job_desc }}
                  <br />
                  Property_name
                </h3>
                <RouterLink to="/home/task">
                  <v-btn id="addjob2">ADD task</v-btn>
                </RouterLink>
              </v-card>
            </div>
            <hr style="margin: 20px" />
            <h2>Your Properties</h2>
            <div class="main">
              <v-card class="main2" v-for="i in alldata" :key="i">
                <v-img
                  height="200px"
                  src=""
                  cover
                ></v-img>
                <h3>
                  Property Name: {{ i.name }}
                  <br>
                  Property Address : {{ i.address }}
                  <br>
                  Create:{{ i.createdAt.slice(0, 10) }}
                </h3>
                <RouterLink to="/home/job">
                  <v-btn id="addjob2">ADD JOB</v-btn>
                </RouterLink>
              </v-card>
            </div>
          </div>
          <div v-else>
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { fetchdata } from "@/helpers/fetch";

import { onMounted, ref } from "vue";
import Swal from 'sweetalert2/dist/sweetalert2'

const name = ref("");

name.value = localStorage.getItem("firstname");

const theme = ref("light");

function reveal(i){
 Swal.fire({
      title: 'JOB information',
      text:JSON.stringify(i) });  
}

const alldata = ref([]);

const alldata2 = ref([]);

const alldata3 = ref([]);

function onClick() {
  theme.value = theme.value === "light" ? "dark" : "light";
}

let id = localStorage.getItem("id");

const getdata = async () => {
  try {
    let data = await fetchdata(`/props/${id}`);
    alldata.value = data;
  } catch (error) {
    console.log(error)
  }
 
  try {
    let data2 = await fetchdata(`/jobs/${id}`);
    alldata2.value = data2;
  } catch (error) {
    console.log(error)
  }

  try {
    let data3 = await fetchdata(`/accepted_job/${id}`);
    alldata3.value = data3;
  } catch (error) {
    console.log(error)  
  }
};

const logout = () => {
  localStorage.clear();
  location.reload();
};


onMounted(async() => {
  await getdata();
});
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

#logout-btn {
  position: relative;
  margin-top: 235px;
  width: 100px;
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
