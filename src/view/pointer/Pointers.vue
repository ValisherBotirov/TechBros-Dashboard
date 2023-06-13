<template>
    <div>
        <div class="flex justify-between items-center mb-4">
            <h3 class="text-gray-700 text-3xl font-medium">Mahsulotlar</h3>
            <SButton variant="info" @click="addActionModal"
            >Yangi mahsulot qo'shish</SButton
            >
        </div>


        <ActionModal
                custom-class="!max-w-[700px] relative"
                :modal-title="modalTitle"
                :is-open="openActionModal"
                @closeModal="closeActionModal"
                @saveModal="saveActionModal"
                :loading="actionModalLoading"
        >

            <FormInput placeholder="F.I.O" v-model="formModal.fullName" :error="v$.fullName.$error" label="Full Name" customClass="!p-2" class="w-full"/>
            <FormInput placeholder="Mahsulot nomini kiriting" v-model="formModal.order" :error="v$.order.$error" label="Mahsulot nomi" customClass="!p-2" class="w-full mt-2" />


            <FormInput placeholder="Narxi" v-model="formModal.price" :error="v$.price.$error"  label="Narxi" type="number" customClass="!p-2" class="w-full mt-2"  />
            <div class="w-full mt-2">
                <label for="" class="mb-1 font-medium text-gray-500 flex justify-start" :class="v$.order_date.$error?'text-[red]':''">Qo'shilgan vaqt</label>
                <el-date-picker
                        v-model="formModal.order_date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        format="DD-MM-YYYY"
                        value-format="YYYY-MM-DD"
                        class="date-input !w-full border border-gray-500 !h-[40px] rounded-[5px] "
                        :class="v$.order_date.$error?'border-[red]':''"
                >
                </el-date-picker>

            </div>



        </ActionModal>

        <div class="flex items-center gap-4 mt-6 mb-5">
            <Search class="w-full"/>
        </div>

        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <BlockPreloader v-if="!userStore?.loading" width="100%" margin="10px 0" height="40px" :loading="!userStore?.loading" v-for="i in 10" :key="i"></BlockPreloader>

            <table class="w-full text-sm text-left text-gray-500" v-else>
                <thead
                        class="text-xs text-gray-700 uppercase bg-gray-50"
                >
                <tr>
                    <th scope="col" class="p-4">#</th>
                    <th scope="col" class="px-6 py-3">F.I.SH</th>
                    <th scope="col" class="px-6 py-3">Buyurtma vaqti</th>
                    <th scope="col" class="px-6 py-3">Buyurtma nomi</th>
                    <th scope="col" class="px-6 py-3">Buyurtma narxi</th>
                    <th scope="col" class="px-6 py-3 text-end">
                        Amallar
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                        class="bg-white border-b  hover:bg-gray-50"
                        v-for="(item, index) in userList"
                        :key="index"
                >
                    <td class="w-4 p-4">
                        <router-link :to="`users/${item?.id}`" class="font-bold cursor-pointer hover:text-[blue]">{{ index + 1 }}.</router-link>
                    </td>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:text-[blue]"
                    >
                        <router-link :to="`users/${item?.id}`">
                            {{ item?.fullName }}
                        </router-link>
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                       {{item?.order_date}}
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >

                        {{ item?.order }}
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {{ item?.price }} $
                    </th>
                    <td class="flex items-center px-6 py-4 space-x-4 justify-end">
                        <div
                                @click="itemEdit(item)"
                                class="font-medium text-blue-600  hover:underline cursor-pointer"
                        >
                            <i
                                    class="fa-solid fa-pen-to-square text-[blue] text-[20px]"
                            ></i>
                        </div>
                        <div
                                class="font-medium text-red-600 hover:underline cursor-pointer"
                                @click="productDelete(item?.id)"
                        >
                            <i class="fa-solid fa-trash text-[red] text-[20px]"></i>
                        </div>
                        <DeleteModal title="Haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz?"
                                     :is-open="openDeleteModal"
                                     @delete="fetchDeleteModal"
                                     @closeModal="openDeleteModal = $event"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <VuePagination v-if="userStore.pagination  > limit" :total="userStore.pagination" :limit="limit" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-5" />

    </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import { useToast } from "vue-toastification";
import SButton from "../../components/buttons/SButton.vue";
import DeleteModal from "../../components/modal/DeleteModal.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";
import Search from "@/components/input/search.vue";
import ActionModal from "@/components/modal/ActionModal.vue";

import FormInput from "@/components/input/FormInput.vue";
import { required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";

import axios from "@/plugins/axios.js";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import {useOrdersStore} from "@/store/orders.js";

const userStore = useOrdersStore()
const toast = useToast();


const openDeleteModal = ref(false);
const deleteId = ref(null);

const userList = computed(()=> userStore?.orders)

function fetchDeleteModal(emit) {
    if (emit) {
        axios
            .delete(`/orders/${deleteId.value}`,{

            })
            .then((res) => {
                toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
                userStore.fetchOrderList(limit.value,currentPage.value)
            })
            .catch((res) => {
                toast.error("Xatolik yuz berdi");
            });
    }
}

function productDelete(id) {
    openDeleteModal.value = true;
    deleteId.value = id;
    console.log(id,"delete id")
}


// pagination
const limit = ref(5);
// const offset = ref(1)
const currentPage = ref(1)
function fetchPagination(page){
    currentPage.value = page
    // offset.value =  (currentPage.value - 1) * limit.value;
    userStore.fetchOrderList(limit.value,currentPage.value)
}

// for  modal

const isEditModal = ref(false)
const modalTitle = ref("Foydalanuvchi qo'shish")

const formModal = reactive({
    fullName:"",
    order:"",
    price:"",
    order_date:"",
})

const rules = computed(() => {
    return {
        fullName: { required },
        order: { required },
        price:{required},
        order_date:{required},

    };
});



const v$ = useVuelidate(rules, formModal);

const openActionModal = ref(false)
function addActionModal(){
    openActionModal.value = true
}

const actionModalLoading = ref(false)
const userId = ref("")

function closeActionModal(){
    openActionModal.value = false
    if(!isEditModal.value){
        modalTitle.value = "Mahsulot qo'shish"
        formModal.fullName = ""
        formModal.order = ""
        formModal.price=""
        formModal.order_date=""

    }
    v$.value.$reset();
    isEditModal.value = false
}
function saveActionModal(emit){
    v$.value.$validate();
    if(!v$.value.$error){
        actionModalLoading.value=true

        if(!isEditModal.value){

            console.log(formModal)
            axios.post("/orders", formModal,{
            } ).then((res)=>{
                userStore.orders = []
                userStore.fetchOrderList()
                toast.success("Muvaffaqiyatli qo'shildi")
            }).catch((err)=>{
                console.log(err)
                toast.error("Xatolik yuz berdi")
            }).finally(()=>{
                actionModalLoading.value = false
            })

        }
        else{
            axios.patch(`/orders/${userId.value}`,formModal,{

            }).then((res)=>{
                console.log(res)
                userStore.orders = []
                userStore.fetchOrderList()
                toast.success("Muvaffaqiyatli tahrirlandi")
            }).catch(()=>{
                toast.error("Tahrirlashda xatolik yuz berdi")
            }).finally(()=>{
                actionModalLoading.value = false
            })
            console.log(formModal)
        }


    }
}

// for edit modal

function itemEdit(item) {
    userId.value = item.id
    console.log(item)
    modalTitle.value = "Mahsulotni tahrirlash"
    formModal.order_date = item.order_date;
    formModal.fullName = item.fullName;
    formModal.order = item.order;
    formModal.price = item.price;
    isEditModal.value = true
    openActionModal.value = true;

}

onMounted(() => {
    userStore.fetchOrderList(limit.value,currentPage.value)
    userStore.fetchOrdersAll()
});
</script>



