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

            <FormInput placeholder="Ismingizni kiriting" v-model="formModal.first_name" :error="v$.first_name.$error" label="Ism" customClass="!p-2" class="w-full"/>
            <FormInput placeholder="Familiyangizni kiriting" v-model="formModal.last_name" :error="v$.last_name.$error" label="Familiya" customClass="!p-2" class="w-full mt-2" />

            <FormInput class="w-full mt-2" label="Telefon raqam" customClass="!p-2" placeholder="00 000 00 00" v-model="formModal.phone" :error="v$.phone.$error"   :prefix-class=" v$.phone.$error ? 'mr-2 font-medium text-[red] leading-125':'mr-2 font-medium leading-125'"
                       v-maska="'## ### ## ##'" >
                <template #prefix> +998</template>
            </FormInput>

            <div class="w-full mt-2">
                <label for="" class="mb-1 font-medium text-gray-500 flex justify-start" :class="v$.birth_date.$error?'text-[red]':''">Tug'ilgan kuni</label>
                <el-date-picker
                        v-model="formModal.birth_date"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        format="DD-MM-YYYY"
                        value-format="YYYY-MM-DD"
                        class="date-input !w-full border border-gray-500 !h-[40px] rounded-[5px] "
                        :class="v$.birth_date.$error?'border-[red]':''"
                >
                </el-date-picker>

            </div>

            <FormInput placeholder="Adress" v-model="formModal.address" :error="v$.address.$error"  label="Adress" customClass="!p-2" class="w-full mt-2"  />


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
                            {{ item?.first_name }} {{item?.last_name}}
                        </router-link>
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {{ PhoneNumberFormatter(item.phone)}}
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >

                        {{ item?.birth_date }}
                    </th>
                    <th
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                        {{ item?.address }}
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
import {useUsersStore} from "@/store/users.js";
import axios from "@/plugins/axios.js";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";
import {PhoneNumberFormatter} from "@/helpers/formatNumber.js";

const userStore = useUsersStore()
const toast = useToast();


const openDeleteModal = ref(false);
const deleteId = ref(null);

const userList = computed(()=> userStore?.users)

function fetchDeleteModal(emit) {
    if (emit) {
        axios
            .delete(`/users/${deleteId.value}`,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => {
                toast.success("Foydalanuvchi muvaffaqiyatli o'chirildi");
                userStore.fetchUsersList(limit.value,currentPage.value)
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
    userStore.fetchUsersList(limit.value,currentPage.value)
}

// for  modal

const isEditModal = ref(false)
const modalTitle = ref("Foydalanuvchi qo'shish")

const formModal = reactive({
    first_name:"",
    last_name:"",
    phone:"",
    birth_date:"",
    address:"",
})

const rules = computed(() => {
    return {
        first_name: { required },
        last_name: { required },
        phone:{required},
        birth_date:{required},
        address:{required},
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
        modalTitle.value = "Foydalanuvchi qo'shish"
        formModal.first_name = ""
        formModal.last_name = ""
        formModal.phone=""
        formModal.birth_date=""
        formModal.address=""
    }
    v$.value.$reset();
    isEditModal.value = false
}
function saveActionModal(emit){
    v$.value.$validate();
    if(!v$.value.$error){
        actionModalLoading.value=true

        if(!isEditModal.value){
            formModal.phone = '998' + formModal.phone.replaceAll(" ","")

            console.log(formModal)
            axios.post("/users", formModal,{
            } ).then((res)=>{
                userStore.users = []
                userStore.fetchUsersList()
                toast.success("Muvaffaqiyatli qo'shildi")
            }).catch((err)=>{
                console.log(err)
                toast.error("Xatolik yuz berdi")
            }).finally(()=>{
                actionModalLoading.value = false
            })

        }
        else{
            formModal.phone = '998' + formModal.phone.replaceAll(" ","")
            axios.patch(`/users/${userId.value}`,formModal,{

            }).then((res)=>{
                console.log(res)
                userStore.users = []
                userStore.fetchUsersList()
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
    modalTitle.value = "Foydalanuvchini tahrirlash"
    formModal.phone = item.phone.slice(-9);
    formModal.birth_date = item.birth_date;
    formModal.address = item.address;
    formModal.first_name = item.first_name;
    formModal.last_name = item.last_name;
    isEditModal.value = true
    openActionModal.value = true;

}

onMounted(() => {
    userStore.fetchUsersList(limit.value,currentPage.value)
    userStore.fetchUsersAll()
});
</script>



