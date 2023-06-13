import { defineStore } from 'pinia'
import axios from "@/plugins/axios.js";

export const useUsersStore = defineStore('usersStore', {
    state: () => ({
        users: [] ,
        pagination:null,
        loading:false
    }),
    actions: {
        fetchUsersList(limit,page) {
            return new Promise((resolve, reject) => {
                axios
                    .get('/users',{
                        params:{
                            _limit:limit,
                            _page:page,
                        }
                    })
                    .then((res) => {
                        console.log(res)
                        this.users = res.data
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    }).finally(()=>{
                        this.loading = true
                })
            })
        },
        fetchUsersAll() {
            return new Promise((resolve, reject) => {
                // if (this.users.length > 0) {
                //     resolve(this.users)
                //     return
                // }
                axios
                    .get('/users',)
                    .then((res) => {
                        console.log(res)
                        this.pagination = res.data.length
                        resolve(res)
                    })
                    .catch((error) => {
                        reject(error)
                    }).finally(()=>{
                    this.loading = true
                })
            })
        },
    },
})