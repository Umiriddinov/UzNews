import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: "/",
    component: ()=> import("../layouts/Layout.vue"),
    redirect: "/news",
    children: [
      {
        path: "news",
        component: ()=>import("../views/News.vue"),
      },
    ]
  }
  ]
})

export default router

