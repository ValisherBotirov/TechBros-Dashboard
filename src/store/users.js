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
                // if (this.users.length > 0) {
                //     resolve(this.users)
                //     return
                // }
                axios
                    .get('/users',{
                        headers:{
                            Authorization : `Bearer ${localStorage.getItem('token')}`
                        },
                        params:{
                            limit:limit,
                            page:page
                        }
                    })
                    .then((data) => {
                        this.users = data.data.data.users
                        this.pagination = data.data.data.pagination
                        resolve(data)
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