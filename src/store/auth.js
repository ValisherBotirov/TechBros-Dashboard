import { defineStore } from "pinia";
import axios from "axios";


export const useAuthStore = defineStore("auth", {
    state: () => ({

        user:
            {
                login:"admin",
                parol:"Parol123",
                userRole : '',
                isRegister:0
            }
        ,
    }),
    actions: {
        checkUser(){
            return this.user
        }
    },
});
