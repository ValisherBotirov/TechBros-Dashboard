<template>
  <div>
      <div class="grid grid-cols-2 p-3 px-4 bg-white rounded-lg">
          <div class="flex gap-4 border-r border-[black]">
              <img  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user images" class="object-cover max-h-[200px]">
              <div class="">
                  <p class="font-medium text-xl">{{ userData?.first_name }} {{userData?.last_name}}</p>
                  <p class="mt-1">{{PhoneNumberFormatter(userData?.phone)}}</p>
              </div>
          </div>
          <div class="pl-4">
              <p class="font-medium text-lg">Statistika</p>

          </div>
      </div>
      <div class="grid grid-cols-10 gap-4 mt-4">
            <div class="col-span-2 rounded-lg bg-white px-3 py-2 pb-3">
                <p class="font-medium text-xl text-center">Statistika</p>
                <div class="bg-[#E5E0DB] rounded-lg text-center py-4 mt-2 cursor-pointer">
                    Statistika1
                </div>
                <div class="bg-[#E5E0DB] rounded-lg text-center py-4 mt-2 cursor-pointer">
                    Statistika2
                </div>
            </div>
            <div class="col-span-8 rounded-lg bg-white px-3 py-3">
                <div class="flex gap-4">
                    <div class="basis-[150px] flex-shrink-0 font-medium ">
                        <p class="">F.I.O :</p>
                        <p class="mt-1">Phone number:</p>
                        <p class="mt-1">Tu'g'ilgan sanasi:</p>
                        <p class="mt-1">Adress:</p>
                        <p class="mt-1">Qo'shimcha:</p>
                    </div>
                    <div>
                        <p>{{ userData?.first_name }} {{userData?.last_name}}</p>
                        <p class="mt-1">{{PhoneNumberFormatter(userData?.phone)}}</p>
                        <p class="mt-1">{{userData?.birth_date}}</p>
                        <p class="mt-1">{{userData?.address}}</p>
                        <p class="mt-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, aut consectetur ducimus earum fugiat ipsa laudantium minima minus mollitia obcaecati odit possimus quisquam repellat reprehenderit unde? Alias eligendi, eum eveniet explicabo hic illum in incidunt magnam minima minus molestiae nisi nulla numquam optio possimus sint sit vitae voluptatem. Maiores, possimus?</p>
                    </div>
                </div>
            </div>
      </div>

  </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import axios from "@/plugins/axios.js";
import {onMounted} from "@vue/runtime-core";
import {ref} from "vue";
import {PhoneNumberFormatter} from "@/helpers/formatNumber.js";

const route = useRoute()

const userData = ref([])


function fetchUserSingle(){
    axios.get(`/users/${route.params.id}`,{

    }).then((res)=>{
        console.log(res)
        userData.value = res.data
    })
}
onMounted(()=>{
    fetchUserSingle()
})
</script>