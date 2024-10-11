<template>

   <div v-if="$route.name == 'comments'">
       user component
       <div>
          <h1>
             Job.id - {{ $route.params.id }}
             con.id - {{ $route.params.conid }}
          </h1>
       </div>
   </div>
   <div v-else>
      contractor component
      <div>
          <h1>
             Job.id - {{ $route.params.id }}
             user.id - {{ $route.params.userid }}
          </h1>
       </div>
   </div>


    <form @submit.prevent="send"  enctype="multipart/form-data">
      <label for="pow_desc">Add your comments</label>
      <br>
      <v-text-field type="text" name="pow_desc" v-model="data.pow_desc" label="comments"/>
      <label for="upload image">Upload images here:</label> <br />
      <br />
      <v-file-input
      @change="fileselected($event)"
      type="file"
      name="powimages"
      label="File input"
      accept="image/*"
      multiple>
      </v-file-input>
      <v-checkbox v-if="role_id"
      v-model="completed"
      :label="`Tick this option if job is completed`"
    ></v-checkbox>
      <v-btn type="submit">submit</v-btn>
    </form>
    <br>

</template>

<script setup>
import router from '@/router';
import { ref,reactive } from 'vue';
import { useRoute } from 'vue-router';
import { fetchdata } from '@/helpers/fetch';

let id = localStorage.getItem('id');

const route = useRoute();

const completed = ref(0);

const data = reactive({
    pow_desc:'',
    pow_images:[]
})

function fileselected(e){
    for(let i=0;i<e.target.files.length;i++){
        data.pow_images[i] = e.target.files[i]; 
    }
}

let role_id = ref();



const send = async () =>{
    
    let fd = new FormData();
    if(localStorage.getItem('role')=='user'){
        role_id.value = 0;
        fd.append('userid',id);
        fd.append('con_id',route.params.conid);
    }else{
        role_id.value = 1;
        fd.append('con_id',id);
        fd.append('userid',route.params.userid);
        fd.append('job_status',completed.value);
    }

    fd.append('pow_desc',data.pow_desc);
    fd.append('role_id',role_id.value);

    data.pow_images.forEach(element => {
        fd.append('powimages',element,element.name);
    });

    alert("send proof of work to the property owner")

      await fetchdata(`/addpow/${route.params.id}`,
     {
      method: "POST",
      body:fd,
     }
     )
     if(role_id.value){
         router.push("/con");
     }else{
        router.push('/home');
     }
}
</script>

<style scoped>

</style>