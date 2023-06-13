<template>
    <div>
        <h3 class="text-gray-700 text-3xl font-medium">Dashboard</h3>

        <div class="mt-4">
            <div class="flex flex-wrap -mx-6">
                <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
                    <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div class="p-3 w-[56px] h-[56px] flex justify-center items-center rounded-full bg-indigo-600 bg-opacity-75">
                            <i class="fa-solid fa-users text-white text-2xl"></i>
                        </div>

                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">
                                <!-- {{ users?.length }} -->
                                100
                            </h4>
                            <div class="text-gray-500">Foydalanuvchilar</div>
                        </div>
                    </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                    <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div class=" w-[56px] h-[56px] flex justify-center items-center rounded-full bg-orange-600 bg-opacity-75">
                            <i class="fa-solid fa-file-signature text-white text-2xl ml-2"></i>
                        </div>

                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">200,521</h4>
                            <div class="text-gray-500">Jami buyurtmalar</div>
                        </div>
                    </div>
                </div>

                <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                    <div class="flex items-center px-5 py-6 shadow-sm rounded-md bg-white">
                        <div class="p-3 w-[56px] h-[56px] flex justify-center items-center rounded-full bg-pink-600 bg-opacity-75">
                            <i class="fa-sharp fa-regular fa-folder-open text-2xl text-white"></i>
                        </div>

                        <div class="mx-5">
                            <h4 class="text-2xl font-semibold text-gray-700">
                                <!-- {{ productsList.length }} -->
                                200
                            </h4>
                            <div class="text-gray-500">Mavjud bo'limlar</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8"></div>
        <div class="flex flex-col mt-8">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                <div
                        class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200"
                >
                    <table class="min-w-full">
                        <thead>
                        <tr>
                            <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Ismi
                            </th>
                            <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Obuna vaqti
                            </th>
                            <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Role
                            </th>
                            <th
                                    class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider text-center"
                            >
                                Delete
                            </th>
                        </tr>
                        </thead>

                        <tbody class="bg-white">
                        <tr v-for="item in 6" :key="item">
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0 h-10 w-10">
                                        <img
                                                class="h-10 w-10 rounded-full"
                                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                                alt=""
                                        />
                                    </div>

                                    <div class="ml-4">
                                        <div class="text-sm leading-5 font-medium text-gray-900">
                                            Valisher Botirov
                                        </div>
                                        <div class="text-sm leading-5 text-gray-500">
                                            valisherbotirov1218@gmail.com
                                        </div>
                                    </div>
                                </div>
                            </td>

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <div class="text-sm leading-5 text-gray-900">01.05.2023</div>
                            </td>

                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >{{ true ? "Active" : "No active" }}</span
                >
                            </td>

                            <td
                                    class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                            >
                                User
                            </td>

                            <td
                                    class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium"
                            >
                                <button
                                        class="bg-[#DC3545] text-white px-4 py-2 rounded-[8px] transition-all duration-300 hover:bg-[red]"
                                        @click="deleteUser(1)"
                                >
                                    O'chirish
                                </button>
                                <DeleteModal
                                        :is-open="openModal"
                                        @delete="fetchDelete"
                                        @closeModal="openModal = $event"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import DeleteModal from "@/components/modal/DeleteModal.vue";

import axios from "axios";
import { useToast } from "vue-toastification";
import formatDate from "@/helpers/formatDate";



const toast = useToast();

const openModal = ref(false);
const deleteId = ref(null);

const users = ref(null);

// const fetchUser = () => {
//   axios({
//     methods: "get",
//     url: "users",
//     headers: {
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcyMjkyODk5LCJleHAiOjE2NzIzNzkyOTl9.IZZRWhoRz_57p0aVOZQgA3YqBISHOSVSLHmqMDsr - WU",
//     },
//     withCredentials: true,
//   }).then((res) => (users.value = res.data.data.data));
// };

// function fetchDelete() {
//   const params = { headers: {}, withCredentials: true };
//   axios
//     .delete(`users/${deleteId.value}`, { params })
//     .then((res) => {
//       fetchUser();
//       toast.success("Muvaffaqiyatli o'chirildi");
//     })
//     .catch((err) => {
//       toast.error("Xatolik yuz berdi");
//     });
// }

const deleteUser = (id) => {
    openModal.value = true;
    deleteId.value = id;
};

// fetch department count
const productsList = ref([]);
// const fetchProductsList = () => {
//   axios({
//     method: "GET",
//     url: "/department",
//     withCredentials: true,
//   }).then((res) => {
//     productsList.value = res.data.data.department;
//   });
// };

onMounted(() => {
    // fetchUser();
    // fetchProductsList();
});
</script>


