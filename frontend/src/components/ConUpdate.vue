<template>
    <v-alert class="outlined">
        {{ alldata }}
        <div v-for="i in alldata.multipledata" :key="i">
            {{ i }}
            <v-alert-title>
                job.id - {{ i.id }}
                <br>
                job-name: {{ i.job_name }}
            </v-alert-title>
            <br>
            <br>
            job-desc: {{ i.job_desc }}
            <br>
            comment of user :{{ i.comment_user }}
            <h3>
                Comments
            </h3>
        </div>  
    </v-alert>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { fetchdata } from '@/helpers/fetch';

const alldata = ref('');

let id = localStorage.getItem('id');

const getdata = async() =>{

    try {
        let data = await fetchdata(`/receivepow/1/${id}`);
        alldata.value = data;
    } catch (error) {
        console.log(error);
    }

}

onMounted(()=>{
   getdata();
})
</script>

<style scoped>

</style>