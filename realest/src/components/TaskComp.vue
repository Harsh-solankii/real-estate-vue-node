<template>
  <center>
    <h1>Task component</h1>
  </center>

  <form @submit.prevent="submitform" enctype="multipart/form-data">
    <label for="job">select the job:</label>
    <br />
    <v-select
      v-model="job_id"
      :items="jobs_data.remaining_jobs"
      item-title="job_name"
      item-value="id"
      label="job"
    />

    <div v-for="(i, index) in requirement" :key="i">
      Task No. {{ index + 1 }}
      <v-text-field type="text" name="title" v-model="i.task_title" label="task_title" />
      <v-text-field type="text" name="desc" v-model="i.task_desc" label="task_desc" />
      <label for="upload image">Upload images here:</label> <br />
      <br />
      <v-file-input
      v-model="i.task_images"
      @change="fileselected($event,index)"
      type="file"
      name="upload"
      label="File input"
      accept="image/*">
      </v-file-input>
      <v-btn icon="mdi-plus" @click="plus" size="small"></v-btn>
      <span style="margin-left: 15px"></span>
      <v-btn icon="mdi-minus" @click="minus" size="small"></v-btn>
    </div>
    <br/>
    <v-btn type="submit">submit</v-btn>
  </form>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchdata } from "@/helpers/fetch";


const router = useRouter();

const job_id = ref("");

const jobs_data = ref([]);

let id = localStorage.getItem("id");

const getdata = async () => {
  try {
    let propvalues = await fetchdata(`/jobs/${id}`);
    jobs_data.value = propvalues;
  } catch (error) {
    console.log(error)
  }
};


function fileselected(e,indexu){
    requirement[indexu].task_images = e.target.files[0]; 
    console.log(requirement[indexu].task_images);
}

const requirement = reactive([
  {
    task_title: "",
    task_desc: "",
    task_images: null,
  },
]);

const plus = () => {
  let obj = {
    task_title: "",
    task_desc: "",
    task_images: null,
  };
  requirement.push(obj);
};

const minus = () => {
  if(requirement.length != 1){
    requirement.pop();
  }
};


let fd = new FormData();

const submitform = async () => {
  alert("tasks added");
  
  fd.append(`job_id`,job_id.value);

  requirement.forEach((ele,index) => {
   fd.append(`task_title[${index}]`,ele.task_title);
   fd.append(`task_desc[${index}]`,ele.task_desc);
   fd.append('upload',ele.task_images,ele.task_images.name); 
  });

  console.log(fd);

  await fetchdata(`/addtask/${id}`, {
    method: "POST",
    body:fd,
  });

  await router.push("/home");
};

onMounted(() => {
  getdata();
});

</script>

<style scoped></style>
