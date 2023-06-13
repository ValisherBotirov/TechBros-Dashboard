<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-700 text-3xl font-medium">Ko’rsatkich nomi</h3>
            <SButton variant="info" @click="openAddMOdal"
            >Yangi ko'rsatgich qo'shish</SButton
            >
        </div>
        <div class="flex items-center gap-4 mt-6">
            <Search class="w-full"/>
            <Select class="w-[25%]" :data="selectData"/>
        </div>
        <div class="mt-2">
            <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table class="min-w-full leading-normal">
                        <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50"
                        >
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left">#ID</th>
                            <th scope="col" class="px-6 py-3 text-left">Nomi</th>

                            <th scope="col" class="px-6 py-3 text-left">Ball</th>

                            <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
                            <th scope="col" class="px-6 py-3 text-center">Holati</th>
                            <th scope="col" class="px-6 py-3 text-end">Amallar</th>
                        </tr>
                        </thead>
                        <tbody>

                        <tr
                                class="bg-white border-b  hover:bg-gray-50 "
                                v-for="(item, index) in 10"
                                :key="index"

                        >
                            <th

                                    class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap "
                            >

                                    {{ index+1 }}.


                            </th>
                            <th

                                    class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap "
                            >

                                    Pointer single


                            </th>
                            <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-left text-gray-900 whitespace-nowrap"
                            >
                                100 ball
                            </th>
                            <td class="px-6 py-4 text-center">
                                <!--                    {{ formatDate(item?.createdAt) }}-->
                                02.05.2023
                            </td>
                            <td class="px-6 py-4 text-center">
                     Holati
                            </td>
                            <td class="flex items-center justify-end px-6 py-4 space-x-4">
                                <div
                                        @click="editService(index)"
                                        class="font-medium text-blue-600 hover:underline cursor-pointer"
                                ><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i
                                ></div>
                                <AddModal
                                        label="Service turini tahrirlash"
                                        :isOpen="openModalEdit"
                                        :value="editServiceText"
                                        @closeModal="openModalEdit = $event"
                                        @fetchModal="getModalService"
                                />
                                <div
                                        class="font-medium text-red-600  hover:underline cursor-pointer"
                                        @click="productDelete(1)"
                                >
                                    <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                                </div>
                                <DeleteModal
                                        :is-open="openDeleteModal"
                                        @delete="fetchDeleteModal"
                                        @closeModal="openDeleteModal = $event"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <VuePagination :total="20" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end" />

    </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted } from "@vue/runtime-core";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import numberFunction from "../../helpers/formatNumber.js";
import formatDate from "../../helpers/formatDate.js";
import DeleteModal from "../../components/modal/DeleteModal.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";
import Search from "@/components/input/search.vue";
import Select from "@/components/input/select.vue";
import {useRouter} from "vue-router";
import AddModal from "@/components/modal/AddModal.vue";
import SButton from "@/components/buttons/SButton.vue";


const router = useRouter()
const currentPage = ref(1)
const toast = useToast();
const serviceList = ref([]);

function fetchPagination(page){
    currentPage.value = page
}



// const fetchProductsList = () => {
//   axios({
//     method: "GET",
//     url: "/services",
//     withCredentials: true,
//   }).then((res) => {
//     serviceList.value = res.data.data.services;
//   });
// };

// const orderList = ref([]);
// function fetchOrderList() {
//   axios
//     .get("/orders")
//     .then((res) => {
//       orderList.value = res.data.data;
//     })
//     .catch(() => {
//       toast.error("Yuklanishda xatoli yuz berdi!");
//     });
// }

const openDeleteModal = ref(false);
const deleteId = ref(null);
function productDelete(id) {
    openDeleteModal.value = true;
    deleteId.value = id;
}

// function fetchDeleteModal() {
//   axios
//     .post(`/orders/${deleteId.value}`, { status: 1 })
//     .then((res) => {
//       toast.success("Muvaffaqiyatli o'chirildi");
//       fetchOrderList();
//     })
//     .catch((err) => {
//       toast.error("Xatolik yuz berdi");
//     });
// }


// new code

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

// edit modal

const openModalEdit = ref(false)
const editServiceText = ref("");
const idEdit = ref("");
function editService(id) {
    openModalEdit.value = true;
    idEdit.value = id;
}

onMounted(() => {
    // fetchProductsList();
    // fetchOrderList();
});
</script>



