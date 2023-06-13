<template>
  <div class="flex justify-between items-center mb-4">
    <h3 class="text-gray-700 text-3xl font-medium">Hisbotlar bo'limi</h3>

  </div>

    <div class="flex items-center gap-4 mt-6">
        <Search class="w-full"/>
        <Select class="w-[25%]" :data="selectData"/>
    </div>

    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50"
          >
            <tr>
              <th scope="col" class="px-6 pr-3 py-3 text-left">#ID</th>
              <th scope="col" class="px-6 pl-0 py-3 text-left">Image</th>
              <th scope="col" class="px-6 py-3 text-left">F.I.O</th>
              <th scope="col" class="px-6 py-3">Bo'lim nomi</th>
              <th scope="col" class="px-6 py-3 text-left">Ko’rsatkich nomi</th>


              <th scope="col" class="px-6 py-3">Yuborilgan sana</th>
              <th scope="col" class="px-6 py-3">Holati</th>

              <th scope="col" class="px-6 py-3">Amallar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="bg-white border-b hover:bg-gray-50"
              v-for="(item, index) in 6"
              :key="index"
            >
                <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                >
                    {{ index+1 }}.
                </th>
                <th

                        class="px-6 py-2 pl-0 "
                >
                    <router-link :to="`report/${index+1}`">

                    <img  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user images" class="w-[45px] h-[45px]">
                    </router-link>
                </th>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left cursor-pointer hover:text-[blue]"
              >
                  <router-link :to="`report/${index+1}`">
              Valisher Botirov
                  </router-link>
              </th>

              <th
                scope="row"
                class="px-6 py-4 font-normal text-gray-900 whitespace-nowrap"
              >
                bo'lim nomi
              </th>

                <td class="px-6 py-4 ">
                   ko'rsatgich nomi
                </td>

              <td class="px-6 py-4 text-center">
                04.05.2023
              </td>

                <td class="px-6 py-4 text-center">
                 Status
                </td>

              <td class="px-6 py-4 flex justify-center">
                <div class="flex gap-4">

                  <div
                    class="font-medium text-red-600 hover:underline cursor-pointer"
                    @click="productDelete(0)"
                  >
                    <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                  </div>
                  <DeleteModal
                    :is-open="openModal"
                    @delete="fetchDelete"
                    @closeModal="openModal = $event"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <VuePagination :total="20" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end" />

</template>

<script setup>
import axios from "axios";
import { onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../../helpers/formatNumber";
import formatDate from "../../helpers/formatDate";

import DeleteModal from "../../components/modal/DeleteModal.vue";
import Search from "@/components/input/search.vue";
import Select from "@/components/input/select.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";
const openModal = ref(false);
const deleteId = ref(null);

const toast = useToast();
const serviceList = ref([]);

// const fetchProductsList = () => {
//   axios({
//     method: "GET",
//     url: "/services",
//     withCredentials: true,
//   }).then((res) => {
//     serviceList.value = res.data.data.services;
//   });
// };

// function fetchDelete(emit) {
//   if (emit) {
//     const params = {
//       headers: {},
//       withCredentials: true,
//     };
//     axios
//       .delete(`services/${deleteId.value}`, { params })
//       .then((res) => {
//         toast.success("Service muvaffaqiyatli o'chirildi");
//         fetchProductsList();
//       })
//       .catch((res) => {
//         toast.error("Xatolik yuz berdi");
//       });
//   }
// }

const currentPage = ref(1)
function fetchPagination(page){
    currentPage.value = page
}
const selectData = ref([
    {
        id:1,
        name:"Nomi bo'yicha"
    },
    {
        id:2,
        name:"Qo'shilgan vaqti bo'yicha"
    },
    {
        id:3,
        name:"So'ngilari bo'yicha"
    }
])

const productDelete = (id) => {
  openModal.value = true;
  deleteId.value = id;
};

onMounted(() => {
  // fetchProductsList();
});
</script>


