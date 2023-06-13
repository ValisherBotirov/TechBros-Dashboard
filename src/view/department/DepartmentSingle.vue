<template>
  <div>
      <div class="flex justify-between">
        <h2 class="text-[20px] font-semibold">Bo'lim nomi</h2>
          <SButton variant="info" class="!px-10">Tahrirlash</SButton>
      </div>
        <div class="grid grid-cols-10 gap-6 mt-10">
            <div class="col-span-2 px-3 py-2 bg-white">
                <div class="text-center">
                    <p class="text-lg font-medium mb-2">Umumiy ball</p>
                    <div class="flex justify-center items-center font-medium text-2xl  py-7 rounded-[4px] bg-[#E5E0DB]">
                        99
                    </div>
                </div>
                <div class="text-center mt-4">
                    <p class="text-lg font-medium mb-2">Statistika</p>
                    <div class="flex justify-center items-center font-medium text-2xl  py-10 rounded-[4px] bg-[#E5E0DB]">
                        Chart place
                    </div>
                </div>
            </div>
            <div class="col-span-8">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50"
                        >
                        <tr>
                            <th scope="col" class="p-4">#:</th>

                            <th scope="col" class="px-6 py-3">Image</th>
                            <th scope="col" class="px-6 py-3">F.I.SH</th>
                            <th scope="col" class="px-6 py-3">Lavozimi</th>
                            <th scope="col" class="px-6 py-3">Ball</th>

                            <th scope="col" class="px-6 py-3">Holati</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr
                                class="bg-white border-b hover:bg-gray-50"
                                v-for="(item, index) in 10"
                                :key="index"
                        >
                            <td class="w-4 p-4">
                                <p class="font-bold ">{{ index + 1 }}.</p>
                            </td>

                            <th

                                    class="px-6 py-2 "
                            >
                                <img  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user images" class="w-[45px] h-[45px]">
                            </th>
                            <td class="px-6 py-4 font-medium text-black">
                                Valisher Botirov
                            </td>


                            <td class="px-6 py-4">
                            CEO
                            </td>
                            <td class="px-6 py-4">
                                {{ numberFunction(1200) }}
                            </td>

                            <td class="flex items-center px-6 py-4 space-x-4">
                               Status
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
                <VuePagination :total="20" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-4" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, reactive } from "@vue/reactivity";
import { onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import SButton from "@/components/buttons/SButton.vue";
import numberFunction from "@/helpers/formatNumber.js";
import VuePagination from "@/components/pagination/VuePagination.vue";


const route = useRoute();
const router = useRouter();

const toast = useToast();

const currentPage = ref(1)
function fetchPagination(page){
    currentPage.value = page
}

onMounted(() => {

});
</script>
