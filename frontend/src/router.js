import { createWebHistory, createRouter } from "vue-router";
import store from './store/index'

const guard = (to) => {
  if(to.meta.requiresAuth && !store.state.authenticated){
    return {
      path: '/',
      query: { redirect: to.fullPath },
    }
  }
}

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("./components/LoginComp.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("./components/SignUp.vue"),
  },
  {
    path: "/home",
    name:"home",
    component:() => import("./components/HomeComp.vue"),
    children:[
      {
        path:'property',
        name:'property',
        component:() => import('./components/PropertyComponent.vue')
      },
      {
        path:'job',
        name:'job',
        component:() => import('./components/JobComponent.vue')
      },
      {
        path:"task",
        name:"task",
        component:() => import("./components/TaskComp.vue")
      },
      {
        path:"estimates_job",
        name:"estimates_job",
        component:() => import("./components/EstimateCom.vue")
      },
      {
        path:'channels',
        name:'channels',
        component:() => import('./components/ChannelsCom.vue')
      },
      {
        path:'chats/:id/:name',
        name:'chats',
        component:() => import('./components/ChatCom.vue')
      },
      {
        path:'active_job',
        name:'active_job',
        component:() => import('./components/ActiveCom.vue')
      },
      {
        path:'payment/:id',
        name:'payment',
        component:() => import('./components/PaymentComp.vue')
      },
      {
        path:'comments/:id/:conid',
        name:'comments',
        component:() => import('./components/ProofWork.vue')
      },
      {
        path:'verify',
        name:'verify',
        component:() => import('./components/VerifyJobs.vue')
      },
    ],
    meta:{requiresAuth:true},
    beforeEnter:[guard]
  },
  {
    path: "/con",
    name: "con",
    component: () => import("./components/ContractorPanel.vue"),
    children:[
      {
        path:'estimates/:id',
        name:'estimates',
        component:() => import('./components/EstimatedJobs.vue')
      },
      {
        path:'explore_jobs',
        name:'explore_jobs',
        component:() => import('./components/ExploreJobs.vue')
      },
      {
        path:'pow/:id/:userid',
        name:'pow',
        component:() => import('./components/ProofWork.vue')
      },
      {
        path:'updates',
        name:'updates',
        component:() => import('./components/ConUpdate.vue')
      },
      {
        path:'channels_con',
        name:'channels_con',
        component:() => import('./components/ChannelsCom.vue')
      },
      {
        path:'chat/:id/:name',
        name:'chats_con',
        component:() => import('./components/ChatCom.vue')
      },
      
    ],
    meta:{requiresAuth:true},
    beforeEnter:[guard]
  },
  {
    path: "/success",
    name: "success",
    component: () => import("./components/SuccessComp.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("./components/ErrorComp.vue"),
  },
];



const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
