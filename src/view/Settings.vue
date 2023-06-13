<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Settings bo'limi</h3>
<!--        <SButton variant="info" @click="openAddModal"-->
<!--        >Yangi bo'lim qo'shish</SButton-->
<!--        >-->
    </div>

<!--      <ActionModal-->
<!--          custom-class="!max-w-[800px]"-->
<!--          :modal-title="modalTitle"-->
<!--          :is-open="openActionModal"-->
<!--          @closeModal="closeActionModal"-->
<!--          @saveModal="saveActionModal"-->
<!--          :loading="actionModalLoading"-->
<!--      >-->
<!--          <div class="flex gap-5">-->
<!--              <FormInput placeholder="About" v-model="formModal.about" :error="v$.about.$error" label="About" customClass="!p-2" class="w-full"/>-->
<!--              <FormInput placeholder="Label" v-model="formModal.label" :error="v$.label.$error" label="Label" customClass="!p-2" class="w-full "/>-->
<!--          </div>-->

<!--          <div class="flex gap-5 mt-3">-->
<!--              <FormInput placeholder="Name" v-model="formModal.name" :error="v$.name.$error" label="Name" customClass="!p-2" class="w-full"/>-->
<!--              <SingleSelect v-model="formModal.departments_name_key" label="Parent id" placeholder="Parent id" :data="departmentData" class="w-full" :error="v$.departments_name_key.$error"/>-->
<!--          </div>-->

<!--          <div class="flex gap-5 mt-3">-->
<!--              <FormInput placeholder="Status" v-model="formModal.status" class="w-full " label="Status" type="number" :error="v$.status.$error" customClass="!p-2"/>-->
<!--              <FormInput placeholder="Type" v-model="formModal.type" class="w-full " label="Type" type="number" :error="v$.type.$error" customClass="!p-2"/>-->
<!--          </div>-->
<!--      </ActionModal>-->
<!--      <div class="flex items-center gap-4 mt-6">-->
<!--          <Search class="w-full"/>-->
<!--          <SingleSelect v-model="selectValue"  placeholder="Filter by" :data="selectData" class="w-[25%]" />-->
<!--      </div>-->


<!--      <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">-->
<!--          <BlockPreloader v-if="!departmentStore?.loading" width="100%" margin="10px 0" height="40px" :loading="!departmentStore?.loading" v-for="i in 10" :key="i"></BlockPreloader>-->
<!--          <table class="w-full text-sm text-left text-gray-500" v-else>-->
<!--              <thead-->
<!--                      class="text-xs text-gray-700 uppercase bg-gray-50"-->
<!--              >-->
<!--              <tr>-->
<!--                  <th scope="col" class="p-4">#ID</th>-->

<!--                  <th scope="col" class="px-6 py-3">Nomi</th>-->
<!--                  <th scope="col" class="px-6 py-3">Type</th>-->
<!--                  <th scope="col" class="px-6 py-3">Tashkil topgan sana</th>-->
<!--                  <th scope="col" class="px-6 py-3">Statusi</th>-->

<!--                  <th scope="col" class="px-6 py-3">Amallar</th>-->
<!--              </tr>-->
<!--              </thead>-->
<!--              <tbody>-->
<!--              <tr-->
<!--                      class="bg-white border-b  hover:bg-gray-50"-->
<!--                      v-for="(item, index) in departmentsList"-->
<!--                      :key="index"-->
<!--              >-->
<!--                  <td class="w-4 p-4">-->
<!--                      <router-link :to="`/department/${item?.id}`" class="font-bold cursor-pointer hover:text-[blue]">{{ index + 1 }}.</router-link>-->
<!--                  </td>-->

<!--                  <th-->
<!--                          scope="row"-->
<!--                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:text-[blue]"-->
<!--                  >-->
<!--                      <router-link :to="`/department/${item?.id}`">-->
<!--                          {{ item?.name }}-->
<!--                      </router-link>-->

<!--                  </th>-->
<!--                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">-->
<!--                      {{ numberFunction(item?.type) }}-->
<!--                  </td>-->


<!--                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">-->
<!--                      {{ formatDate(item.created_at) }}-->
<!--                  </td>-->
<!--                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">-->
<!--                      {{ item?.status }}-->
<!--                  </td>-->

<!--                  <td class="flex items-center px-6 py-4 space-x-4">-->
<!--                      <div-->
<!--                              class="font-medium text-blue-600 hover:underline cursor-pointer"  @click="itemEdit(item)"-->
<!--                      ><i class="fa-solid fa-pen-to-square text-[blue] text-[20px]"></i-->
<!--                      ></div>-->
<!--                      <div-->
<!--                              class="font-medium text-red-600 hover:underline cursor-pointer"-->
<!--                              @click="itemDelete(item?.id)"-->
<!--                      >-->
<!--                          <i class="fa-solid fa-trash text-[red] text-[20px]"></i>-->
<!--                      </div>-->
<!--                      <DeleteModal-->
<!--                              title="Haqiqatdan ham ushbu bo'limni o'chirmoqchimisiz?"-->
<!--                              :is-open="openModal"-->
<!--                              @delete="fetchDelete"-->
<!--                              @closeModal="openModal = $event"-->
<!--                      />-->
<!--                  </td>-->
<!--              </tr>-->
<!--              </tbody>-->
<!--          </table>-->
<!--      </div>-->
<!--      <VuePagination v-if="departmentStore?.pagination?.total_count>limit" :total="departmentStore?.pagination?.total_count" :limit="limit"  :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-4" />-->
<!--      <pre>{{departmentsList}}</pre>-->
  </div>
</template>

<!--<script setup>-->

<!--import { useToast } from "vue-toastification";-->

<!--import {computed, reactive, ref} from "vue";-->
<!--import {useDepartmentStore} from "@/store/orders.js";-->
<!--import {onMounted} from "@vue/runtime-core";-->
<!--import numberFunction from "@/helpers/formatNumber.js";-->
<!--import formatDate from "@/helpers/formatDate.js";-->
<!--import BlockPreloader from "@/components/buttons/BlockPreloader.vue";-->
<!--import DeleteModal from "@/components/modal/DeleteModal.vue";-->
<!--import SingleSelect from "@/components/select/SingleSelect.vue";-->
<!--import ActionModal from "@/components/modal/ActionModal.vue";-->
<!--import FormInput from "@/components/input/FormInput.vue";-->
<!--import axios from "@/plugins/axios.js";-->
<!--import {required} from "@vuelidate/validators";-->
<!--import {useVuelidate} from "@vuelidate/core";-->
<!--import SButton from "@/components/buttons/SButton.vue";-->
<!--import Search from "@/components/input/search.vue";-->
<!--import VuePagination from "@/components/pagination/VuePagination.vue";-->
<!--const openModal = ref(false);-->

<!--const toast = useToast();-->

<!--const deleteId = ref(null);-->

<!--const departmentStore = useDepartmentStore()-->

<!--const departmentsList = computed(()=> departmentStore?.departments)-->

<!--const baseUrl = ref("")-->

<!--function getBase(e){-->
<!--    console.log(e,"base 64 emit")-->
<!--    baseUrl.value = e-->
<!--}-->

<!--const currentPage = ref(1)-->
<!--const limit = ref(5)-->
<!--function fetchPagination(page){-->
<!--    currentPage.value = page-->
<!--    departmentStore.fetchDepartmentList(limit.value,currentPage.value)-->
<!--}-->
<!--const selectValue = ref("")-->
<!--const selectData = ref([-->
<!--    {-->
<!--        id:1,-->
<!--        value:"1",-->
<!--        label:"Nomi bo'yicha"-->
<!--    },-->
<!--    {-->
<!--        id:2,-->
<!--        value:"2",-->
<!--        label:"Qo'shilgan vaqti bo'yicha"-->
<!--    },-->
<!--    {-->
<!--        id:3,-->
<!--        value:"3",-->
<!--        label:"So'ngilari bo'yicha"-->
<!--    }-->
<!--])-->

<!--const departmentData = ref([-->
<!--    {-->
<!--        value:"bo'lim1",-->
<!--        label:"bo'lim1"-->
<!--    },-->
<!--    {-->
<!--        value:"bo'lim2",-->
<!--        label:"bo'lim2"-->
<!--    },-->
<!--    {-->
<!--        value:"bo'lim3",-->
<!--        label:"bo'lim3"-->
<!--    },-->
<!--])-->

<!--function fetchDelete(emit) {-->
<!--    const isDelete = ref(false);-->
<!--    isDelete.value = emit;-->
<!--    if (isDelete.value) {-->

<!--        axios-->
<!--            .delete(`departments/${deleteId.value}`, {-->
<!--                headers:{-->
<!--                    Authorization : `Bearer ${localStorage.getItem('token')}`-->
<!--                }-->
<!--            })-->
<!--            .then((res) => {-->
<!--                toast.success("Bo'lim muvaffaqiyatli o'chirildi");-->
<!--                departmentStore.fetchDepartmentList(limit.value,currentPage.value)-->
<!--            })-->
<!--            .catch((res) => {-->
<!--                toast.error("Xatolik yuz berdi");-->
<!--            });-->
<!--    }-->
<!--}-->

<!--const itemDelete = (id) => {-->
<!--    openModal.value = true;-->
<!--    deleteId.value = id;-->
<!--};-->


<!--// for  modal-->

<!--const isEditModal = ref(false)-->
<!--const modalTitle = ref("Bo'lim qo'shish")-->

<!--const formModal = reactive({-->
<!--    about:"",-->
<!--    label:"",-->
<!--    name:"",-->
<!--    // departments_name_key:"",-->
<!--    departments_name_key:"",-->
<!--    status:null,-->
<!--    type:null,-->
<!--})-->

<!--const rules = computed(() => {-->
<!--    return {-->
<!--        about: { required },-->
<!--        label: { required },-->
<!--        name:{required},-->
<!--        departments_name_key:{required},-->
<!--        status:{required},-->
<!--        type:{required},-->
<!--    };-->
<!--});-->
<!--const v$ = useVuelidate(rules, formModal);-->

<!--const openActionModal = ref(false)-->
<!--function openAddModal(){-->
<!--    openActionModal.value = true-->
<!--}-->

<!--const actionModalLoading = ref(false)-->

<!--function closeActionModal(){-->
<!--    openActionModal.value = false-->
<!--    formModal.about = ""-->
<!--    formModal.label = ""-->
<!--    formModal.name = ""-->
<!--    formModal.departments_name_key = ""-->

<!--    formModal.status = null-->
<!--    formModal.type=null-->
<!--    v$.value.$reset();-->
<!--    isEditModal.value = false-->
<!--}-->
<!--function saveActionModal(emit){-->
<!--    v$.value.$validate();-->
<!--    if(!v$.value.$error){-->
<!--        actionModalLoading.value=true-->

<!--        if(!isEditModal.value){-->
<!--            console.log(formModal)-->
<!--            formModal.status = + formModal.status-->
<!--            formModal.type = + formModal.type-->
<!--            axios.post('/departments',formModal,{-->
<!--                headers:{-->
<!--                    Authorization : `Bearer ${localStorage.getItem('token')}`-->
<!--                }-->
<!--            }).then((res)=>{-->
<!--                console.log(res)-->
<!--                departmentStore.fetchDepartmentList(limit.value,currentPage.value)-->
<!--                toast.success("Muvaffaqiyatli qo'shildi!")-->
<!--            }).catch((err)=>{-->
<!--                console.log(err)-->
<!--                toast.error("Qo'shishda xatoli yuz berdi")-->
<!--            }).finally(()=>{-->
<!--                actionModalLoading.value = false-->
<!--            })-->

<!--        }-->
<!--        else{-->
<!--            console.log("Edit modal")-->
<!--            setTimeout(() =>{-->
<!--                actionModalLoading.value = false-->
<!--            },1000)-->
<!--        }-->


<!--    }-->
<!--}-->

<!--// for edit modal-->

<!--function itemEdit(item) {-->
<!--    modalTitle.value = "Bo'limni tahrirlash"-->
<!--    isEditModal.value = true-->
<!--    openActionModal.value = true;-->
<!--    formModal.about = item.about;-->
<!--    formModal.name = item.name;-->
<!--    formModal.status = item.status;-->
<!--    formModal.label = item.label-->
<!--    formModal.type = item.type-->
<!--    formModal.departments_name_key = item.departments_name_key-->
<!--}-->

<!--onMounted(()=>{-->
<!--    departmentStore.fetchDepartmentList(limit.value,currentPage.value)-->
<!--})-->

<!--</script>-->
