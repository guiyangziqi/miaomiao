export default {
  path: "/mine",
  component: () => import("@/views/Mine"),
  children: [
    {
      path: "center",
      component: () => import("@/views/Mine/center.vue")
    },
    {
      path: "edit",
      component: () => import("@/views/Mine/edit.vue")
    },
    {
      path: "login",
      component: () => import("@/components/Login")
    },
    {
      path: "register",
      component: () => import("@/components/Register")
    },
    {
      path: "findPassword",
      component: () => import("@/components/FindPassword")
    },
    {
      path: "updateUsername",
      component: () => import("@/components/updateUsername")
    },
    {
      path: "/mine",
      redirect: "center"
    }
  ]
};
