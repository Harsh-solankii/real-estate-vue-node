import { createLogger, createStore } from "vuex";

const store = createStore({
  state(){
    return{
    authenticated:false,
    messages:[]
   }
  },
  mutations: {
      set_auth(state,auth){
        state.authenticated = auth
      },
      set_messages(state, msgs) {
        state.messages = msgs;
      },
   },
  actions: {
    async fetchmessages({ commit },id) {
      let data = await fetch(`http://localhost:3087/getmsgs/${id}`)
       
      data = await data.json();

      commit('set_messages',data);
    },
  },
  plugins: [createLogger()],
});


export default store;
