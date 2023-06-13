import { defineStore } from 'pinia'
import axios from "@/plugins/axios.js";

export const useDepartmentStore = defineStore('departmentStore', {
    state: () => ({
        departments: [] ,
        pagination:null,
        loading:false
    }),
    actions: {
        fetchDepartmentList(limit,page) {
            return new Promise((resolve, reject) => {

                axios
                    .get('/departments',{

                        params:{
                            limit:limit,
                            page:page
                        }
                    })
                    .then((data) => {
                        this.departments = data.data.data.departments
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