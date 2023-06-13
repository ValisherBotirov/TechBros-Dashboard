<template>
  <div>
      <div class="flex justify-between items-center mb-4">
          <h3 class="text-gray-700 text-3xl font-medium">Ko’rsatkichlar</h3>
          <SButton variant="info" @click="openAddModal"
          >Yangi ko'rsatgich qo'shish</SButton
          >
      </div>

      <ActionModal
              :modal-title="modalTitle"
              :is-open="openActionModal"
              @closeModal="closeActionModal"
              @saveModal="saveActionModal"
              :loading="actionModalLoading"
      >

          <FormInput placeholder="F.I.SH" v-model="formModal.fullName" :error="v$.fullName.$error"/>
          <FormInput placeholder="Holati" v-model="formModal.status" class="mt-3" :error="v$.status.$error"/>

      </ActionModal>

    <div class="flex items-center gap-4 mt-6">
        <Search class="w-full"/>
        <Select class="w-[25%]" :data="selectData"/>
    </div>
    <div class="mt-2">
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 "
            >
              <tr>
                <th scope="col" class="px-6 py-3 text-left">#ID</th>
                <th scope="col" class="px-6 py-3 text-left">Nomi</th>



                <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
                <th scope="col" class="px-6 py-3 text-center">Holati</th>
                <th scope="col" class="px-6 py-3 text-end">Amallar</th>
              </tr>
            </thead>
            <tbody>

            <tr
                    class="bg-white border-b  hover:bg-gray-50 "
                    v-for="(item, index) in fakeData"
                    :key="index"

            >
                <th

                        class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap  cursor-pointer hover:text-[blue]" @click="passOrderSingle(index+1)"
                >
                    <router-link :to='`/pointer/${item?.id}`'>
                        {{ index+1 }}.
                    </router-link>

                </th>
                <th

                        class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap  cursor-pointer hover:text-[blue]"
                        >
                    <router-link :to='`/pointer/${item?.id}`'>
                        {{ item?.name }}
                    </router-link>

                </th>

                <td class="px-6 py-4 text-center">
<!--                    {{ formatDate(item?.createdAt) }}-->
                    {{ item?.created }}
                </td>
                <td class="px-6 py-4 text-center">
                    {{ item?.status }}
                </td>
                <td class="flex items-center justify-end px-6 py-4 space-x-4">
                    <div
                            @click="editPointer(item)"
                            class="font-medium text-blue-600  hover:underline cursor-pointer"
                    ><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i
                    ></div>
                    <div
                            class="font-medium text-red-600 hover:underline cursor-pointer"
                            @click="productDelete(item?.id)"
                    >
                        <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                    </div>
                    <DeleteModal
                            title="Haqiqatdan ham ushbu ko'rsatgichni o'chirmoqchimisiz?"
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
import SButton from "@/components/buttons/SButton.vue";
import FormInput from "@/components/input/FormInput.vue";
import ActionModal from "@/components/modal/ActionModal.vue";
import {reactive} from "@vue/reactivity";
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";


const router = useRouter()
const currentPage = ref(1)
const toast = useToast();


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

function fetchDeleteModal() {
  axios
    .delete(`/url/${deleteId.value}`)
    .then((res) => {
      toast.success("Muvaffaqiyatli o'chirildi");
      // fetchOrderList();
    })
    .catch((err) => {
      toast.error("Xatolik yuz berdi");
    });
}


// new code

const fakeData = ref([
    {
        id:1,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:2,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:2,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:4,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:5,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:2,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:4,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
    {
        id:5,
        name:"Valisher Botirov",
        created : "02.05.2023",
        status:"Holati"
    },
])

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

// for  modal

const isEditModal = ref(false)
const modalTitle = ref("Ko'rsatgich qo'shish")

const formModal = reactive({
    fullName:"",
    status:""
})

const rules = computed(() => {
    return {
        fullName: { required },
        status: { required },
    };
});
const v$ = useVuelidate(rules, formModal);

const openActionModal = ref(false)
function openAddModal(){
    openActionModal.value = true
}

const actionModalLoading = ref(false)

function closeActionModal(){
    openActionModal.value = false
    formModal.fullName = ""
    formModal.status = ""
    v$.value.$reset();
    isEditModal.value = false
}
function saveActionModal(emit){
    v$.value.$validate();
    if(!v$.value.$error){
      actionModalLoading.value=true

        if(!isEditModal.value){
            console.log("Modal add")
            setTimeout(() =>{
                actionModalLoading.value = false
            },1000)
        }
        else{
            console.log("Edit modal")
            setTimeout(() =>{
                actionModalLoading.value = false
            },1000)
        }


    }
}

// for edit modal

function editPointer(item) {
    modalTitle.value = "Ko'rsatgichni tahrirlash"
    isEditModal.value = true
    openActionModal.value = true;
    formModal.fullName = item.name;
    formModal.status = item.status;
}

onMounted(() => {
  // fetchProductsList();
  // fetchOrderList();
});
</script>



