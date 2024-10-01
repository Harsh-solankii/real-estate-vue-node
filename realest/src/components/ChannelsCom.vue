<template>
    <div>
    </div>
    <div id="app">
        <v-sheet rounded>
            <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
            >
           Chat Contacts
          <ul>
              <li v-for="i in channels_data" :key="i" style="list-style: none;">
                <div v-if="role_ == 'contractor'" class="box">
                    <RouterLink :to="{ name:'chats_con',params:{id:i.id,name:i.name} }" :key="router.path">
                        {{ i.name }}
                    </RouterLink>
                </div>
                <div v-else class="box">
                    <RouterLink :to="{ name:'chats',params:{id:i.id,name:i.name} }" :key="router.path">
                        {{ i.name }}
                    </RouterLink>
                </div>
              </li>
          </ul>
      </v-card>
      </v-sheet>
    </div>
</template>

<script setup >
import router from '@/router';
import { ref,onMounted } from 'vue';
import { fetchdata } from '@/helpers/fetch';

const channels_data = ref('');

let id = localStorage.getItem('id');

let role_ = ref(localStorage.getItem('role'));
 
const getdata = async () =>{
    try {
        let data = await fetchdata(`/channels/${id}/${role_.value}`);
        channels_data.value = data;
    } catch (error) {
        console.log(error);
    }
}

onMounted(()=>{
  getdata();
})
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.box{
    border: 3px solid black;
    height: 40px;
    margin-top: 5px;
    padding: 4px;
    padding-left: 20px;
}
</style>