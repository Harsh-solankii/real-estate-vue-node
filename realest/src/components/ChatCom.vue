<template>
  <center>
    <v-sheet
      style="
        border: 2px solid black;
        width: 435px;
        height: 600px;
        border-radius: 15px;
      "
    >
      <h1>Chats</h1>
      <h2>-- {{ $route.params.name }} --</h2>
      <div id="card">
        <v-text-field v-model="message" @keyup.enter="sendMessage" />
        <v-btn @click="sendMessage" id="sendbtn">send</v-btn>
      </div>
      <div id="card2" ref="chatcom">
        <ul>
          <li
            v-for="msg in store.state.messages"
            :key="msg"
            style="list-style: none"
          >
            -- {{ msg.message }}
          </li>
        </ul>
      </div>
    </v-sheet>
  </center>
</template>

<script setup>
import { onMounted,ref } from "vue";
import { socket } from "@/main";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { fetchdata } from '@/helpers/fetch';

const message = ref("");

const route = useRoute();

const store = useStore();

const chatcom = ref(null);

 
let sender = localStorage.getItem('id');

let id = route.params.id;

async function sendMessage() {
  let data = {
    sender_id:sender,
    channel_id: id,
    msg: message.value,
  };
  if (message.value.trim() !== "") {
    
    await fetchdata(`/addmsg`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    
    // sender-receiver
    socket.emit(`send_message`, data);
    message.value = "";
  }
}

socket.on(`receive_message-${id}`, async() => {
    await store.dispatch("fetchmessages", id);
    chatcom.value.scrollTop = chatcom.value.scrollHeight;
});


onMounted(async() => {
  await store.dispatch("fetchmessages", id);
  chatcom.value.scrollTop = chatcom.value.scrollHeight;
});
</script>
<style>
#card {
  position: relative;
  top: 447px;
  right: -2px;
  width: 400px;
  display: flex;
}
#card2 {
  position: relative;
  bottom: 61px;
  left: 0px;
  height: 400px;
  overflow-y: scroll;
}
#sendbtn {
  margin-left: 10px;
  height: 50px;
  background-color: black;
  color: azure;
}
</style>
