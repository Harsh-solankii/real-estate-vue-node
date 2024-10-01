<template>
        <main>
          <RouterView/>
        </main>
</template>

<script setup>

import { RouterView } from 'vue-router';

import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(()=>{
  if(localStorage.getItem("id")!==null){
    store.commit("set_auth",true); 
  }
})

</script>

<style>
*{
  font-family: 'Courier New', Courier, monospace;
}
</style>
