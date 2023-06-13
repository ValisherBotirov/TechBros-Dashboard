import { createRouter, createWebHistory } from "vue-router";
import Home from "../view/HomeView.vue";
import Login from "../view/LoginView.vue";
import Report from "../view/report/Report.vue";
import ReportEdit from "../view/report/EditReport.vue";
import Department from "../view/department/Department.vue";
import DepartmentSingle from "../view/department/DepartmentSingle.vue";
import Users from "../view/users/UsersView.vue";
import UserSingle from "../view/users/UserSingle.vue"
import Settings from "../view/Settings.vue";
import Pointer from "../view/pointer/Pointers.vue";
import PointerSingle from "../view/pointer/PointerSingle.vue";



const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: 'login'  }
  },

  {
    path: "/report",
    name: "report",
    component: Report,
    meta: { roles: ['admin', 'super'] }
  },

  {
    path: "/report/:id",
    name: "ReportEdit",
    component: ReportEdit,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/department",
    name: "Department",
    component: Department,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/department/:id",
    name: "DepartmentSingle",
    component: DepartmentSingle,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/users/:id",
    name: "UserSingle",
    component: UserSingle,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: { roles: ['admin', 'super'] }
  },

  {
    path: "/pointer",
    name: "Pointer",
    component: Pointer,
    meta: { roles: ['admin', 'super'] }
  },
  {
    path: "/pointer/:id",
    name: "PointerSingle",
    component: PointerSingle,
    meta: { roles: ['admin', 'super'] }
  },

];

const router = createRouter({
  history: createWebHistory(),


  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});



const userRole = "admin"
router.beforeEach((to, from,next) => {
  const isAuthenticated = Number(sessionStorage.getItem("isRegister")) ? Number(sessionStorage.getItem("isRegister")) :0  ;
  if(!isAuthenticated){
    if (to.name !== 'Login' && !isAuthenticated) {
      next({ name: 'Login' });
    }
    else next()
  }
 else{
    if(to.meta?.roles?.includes(userRole) && isAuthenticated){
      next()
    }
    else{
      next({ name: 'home' })
    }
  }

  return false
})
export default router;
