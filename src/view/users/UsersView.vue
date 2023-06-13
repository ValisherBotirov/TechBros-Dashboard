<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-gray-700 text-3xl font-medium">Foydalanuvchilar</h3>
      <SButton variant="info" @click="addActionModal"
        >Yangi foydalanuvchi qo'shish</SButton
      >
    </div>


      <ActionModal
              custom-class="!max-w-[1200px] relative"
              :modal-title="modalTitle"
              :is-open="openActionModal"
              @closeModal="closeActionModal"
              @saveModal="saveActionModal"
              :loading="actionModalLoading"
      >


          <UploadImages :image="formModal.image" :error="v$.image.$error" @getBase64="getImages" :avatar="true" class="flex justify-end flex-shrink-0 absolute right-[-140px]  top-0 p-4 bg-white rounded-lg"/>
          <div class="flex gap-5">
              <FormInput placeholder="Ismingizni kiriting" v-model="formModal.first_name" :error="v$.first_name.$error" label="Ism" customClass="!p-2" class="w-full"/>
              <FormInput placeholder="Familiyangizni kiriting" v-model="formModal.last_name" :error="v$.last_name.$error" label="Familiya" customClass="!p-2" class="w-full" />
              <FormInput placeholder="Otasining ismi" v-model="formModal.patronymic" :error="v$.patronymic.$error"  label="Sharif" customClass="!p-2" class="w-full"  />
          </div>
          <div class="flex gap-5 mt-3">
              <FormInput placeholder="Lavozimi" v-model="formModal.position" :error="v$.position.$error"  label="Lavozim" customClass="!p-2" class="w-full"  />
              <FormInput placeholder="valisherbotirov1218@gmail.com" type="email" v-model="formModal.email" :error="v$.email.$error"  label="Email" customClass="!p-2" class="w-full"  />
              <FormInput class="w-full" label="Telefon raqam" customClass="!p-2" placeholder="00 000 00 00" v-model="formModal.phone" :error="v$.phone.$error"   :prefix-class=" v$.phone.$error ? 'mr-2 font-medium text-[red] leading-125':'mr-2 font-medium leading-125'"
                         v-maska="'## ### ## ##'" >
                  <template #prefix> +998</template>
              </FormInput>
          </div>
          <div class="flex gap-5 mt-3">
              <FormInput placeholder="Ilmiy darajasi" v-model="formModal.scientific_title" :error="v$.scientific_title.$error"  label="Ilmiy darajasi" customClass="!p-2" class="w-full"  />
              <FormInput placeholder="Soatbay" v-model="formModal.form_of_work"  :error="v$.form_of_work.$error" label="Ish turi" customClass="!p-2" class="w-full"/>
              <div class="w-full">
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
              <!--              <FormInput  v-model="formModal.birth_date"  :error="v$.birth_date.$error" label="Tug'ilgan kuni" customClass="!p-2" class="w-full" type="date"/>-->
          </div>
          <div class="flex gap-5 mt-3">
              <FormInput placeholder="Chief position" v-model="formModal.chief_position" :error="v$.chief_position.$error"  label="Chief position" customClass="!p-2" class="w-full"  />
              <FormInput placeholder="Degree level" v-model="formModal.degree_level"  :error="v$.degree_level.$error" label="Degree level" customClass="!p-2" class="w-full"/>
              <FormInput placeholder="Mutaxassisligi" v-model="formModal.specialist"  :error="v$.specialist.$error" label="Mutaxassisligi" customClass="!p-2" class="w-full"/>
          </div>
          <div class="flex gap-5 mt-3">
              <FormInput placeholder="10" type="number" v-model="formModal.status" :error="v$.status.$error"  label="Statusi" customClass="!p-2" class="w-full"  />
              <FormInput placeholder="work_bet" v-model="formModal.work_bet"  :error="v$.work_bet.$error" label="Work bet" customClass="!p-2" class="w-full"/>
              <div class="w-full">
                  <label for="" class="mb-1 font-medium text-gray-500 flex justify-start" :class="v$.recruitment_date.$error?'text-[red]':''">Ishga olingan kun</label>
                  <el-date-picker
                          v-model="formModal.recruitment_date"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          format="DD-MM-YYYY"
                          value-format="YYYY-MM-DD"
                          class="date-input !w-full border border-gray-500 !h-[40px] rounded-[5px] "
                          :class="v$.recruitment_date.$error?'border-[red]':''"
                  >
                  </el-date-picker>
              </div>
              <!--              <FormInput  v-model="formModal.recruitment_date"  :error="v$.recruitment_date.$error" label="Ishga olingan kun" customClass="!p-2" class="w-full" type="date"/>-->
          </div>
          <div class="flex gap-3 mt-3">
              <FormInput v-if="!isEditModal" placeholder="Parolingizni kiriting" type="password" v-model="formModal.password"  :error="v$.password.$error" label="Parol" customClass="!p-2" class="w-full"/>
              <SingleSelect v-model="formModal.gender" :label="`Jinsi   ${formModal.gender}`" placeholder="Jinsi" :data="dataGender" class="w-full" :error="v$.gender.$error"/>
              <MultiSelect :options="options" v-model="formModal.departments" label="Departament" :error="v$.departments.$error" placeholder="Departments"/>
              <MultiSelect :options="dataRole" v-model="formModal.roles" label="Role" :error="v$.roles.$error" placeholder="role"/>
          </div>
      </ActionModal>

      <div class="flex items-center gap-4 mt-6 mb-5">
          <Search class="w-full"/>
          <SingleSelect v-model="selectValue"  placeholder="Filter by" :data="selectData" class="w-[25%]" />
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
            <th scope="col" class="px-6 py-3">Lavozimi</th>
            <th scope="col" class="px-6 py-3">Telefon raqami</th>
            <th scope="col" class="px-6 py-3">Holati</th>
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
                  {{ item?.position }}
            </th>
              <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                  +{{ item?.phone }}
              </th>
              <th
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                  {{ item?.form_of_work }}
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
              <DeleteModal
                      title="Haqiqatdan ham ushbu foydalanuvchini o'chirmoqchimisiz?"
                :is-open="openDeleteModal"
                @delete="fetchDeleteModal"
                @closeModal="openDeleteModal = $event"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

      <VuePagination v-if="userStore?.pagination?.total_count>limit" :total="userStore?.pagination?.total_count" :limit="limit" :current-page="currentPage" @fetchPage="fetchPagination" class="flex justify-end mt-5" />
<!--      <pre>{{userStore.pagination}}</pre>-->

  </div>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import { useToast } from "vue-toastification";
import SButton from "../../components/buttons/SButton.vue";
import DeleteModal from "../../components/modal/DeleteModal.vue";
import VuePagination from "@/components/pagination/VuePagination.vue";
import Search from "@/components/input/search.vue";
import Select from "@/components/input/select.vue";
import ActionModal from "@/components/modal/ActionModal.vue";
import FormInput from "@/components/input/FormInput.vue";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {useUsersStore} from "@/store/users.js";
import axios from "@/plugins/axios.js";
import MultiSelect from "@/components/select/MultiSelect.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import UploadImages from "@/components/input/uploadImages.vue";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";

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




// new code

// pagination
const limit = ref(5);
// const offset = ref(1)
const currentPage = ref(1)
function fetchPagination(page){
    currentPage.value = page
    // offset.value =  (currentPage.value - 1) * limit.value;
    userStore.fetchUsersList(limit.value,currentPage.value)
}
const selectValue = ref("")
const selectData = ref([
    {
        id:1,
        value:"1",
        label:"Nomi bo'yicha"
    },
    {
        id:2,
        value:"2",
        label:"Qo'shilgan vaqti bo'yicha"
    },
    {
        id:3,
        value:"3",
        label:"So'ngilari bo'yicha"
    }
])

// multiselect
const value = ref([])
const dataGender = ref([
    {
        label : 'Erkak',
        value: "male"
    },
    {
        label:"Ayol",
        value:'famale'
    }
])
const dataRole = ref([
    {
        label : 'Supervisor',
        value:"supervisor"
    },
    {
        label:"Admin",
        value: "admin"
    },
    {
        label: "Xodim",
        value: "base role"
    }
])
const options = [
    {
        value: 'Option1',
        label: 'Option1',
    },
    {
        value: 'Option2',
        label: 'Option2',
    },
    {
        value: 'Option3',
        label: 'Option3',
    },
    {
        value: 'Option4',
        label: 'Option4',
    },
    {
        value: 'Option5',
        label: 'Option5',
    },
]

// for  modal

const isEditModal = ref(false)
const modalTitle = ref("Foydalanuvchi qo'shish")

const formModal = reactive({
    first_name:"",
    last_name:"",
    form_of_work:"",
    position:"",
    phone:"",
    birth_date:"",
    chief_position:"",
    degree_level:"",
    email:"",
    password:"",
    patronymic:"",
    specialist:"",
    recruitment_date:"",
    scientific_title:"",
    status:null,
    work_bet:"",
    gender:"",
    departments:[],
    roles:[],
    image:""
})

const rules = computed(() => {
    return {
        first_name: { required },
        last_name: { required },
        form_of_work: { required },
        position:{required},
        phone:{required},
        birth_date:{required},
        chief_position:{required},
        degree_level:{required},
        email:{required,email},
        password:{required},
        patronymic:{required},
        specialist:{required},
        recruitment_date:{required},
        scientific_title:{required},
        status:{required},
        work_bet:{required},
        gender:{required},
        departments:{required},
        roles:{required},
        image:{required},
    };
});

function getImages(e) {
    formModal.image = e;
}

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
        formModal.form_of_work = ""
        formModal.position=""
        formModal.phone=""
        formModal.roles=[]
        formModal.birth_date=""
        formModal.chief_position=""
        formModal.email=""
        formModal.password=""
        formModal.patronymic=""
        formModal.specialist=""
        formModal.birth_date = ""
        formModal.recruitment_date=""
        formModal.status=""
        formModal.gender=""
        formModal.departments=[];
        formModal.roles = []
        formModal.work_bet=""
        formModal.scientific_title=""
        formModal.degree_level = ""
    }
    v$.value.$reset();
    isEditModal.value = false
}
function saveActionModal(emit){
    v$.value.$validate();
    if(isEditModal.value){
        formModal.password = "qwerty"
    }
    if(!v$.value.$error){
        actionModalLoading.value=true

        if(!isEditModal.value){
            formModal.phone = '998' + formModal.phone.replaceAll(" ","")
            formModal.status = +formModal.status
            formModal.image = ""
            formModal.departments = []
            console.log(formModal)
            axios.post("/users", formModal,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
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
            formModal.image=""
            formModal.departments = []
            axios.patch(`/users/${userId.value}`,formModal,{
                headers:{
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
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
    isEditModal.value = true
    openActionModal.value = true;
    formModal.first_name = item.first_name;
    formModal.last_name = item.last_name;
    formModal.form_of_work = item.form_of_work;
    formModal.position = item.position;
    formModal.phone = item.phone.slice(-9);
    formModal.birth_date = item.birth_date;
    formModal.patronymic = item.patronymic;
    formModal.email = item.email
    formModal.birth_date = item.birth_date
    formModal.recruitment_date = item.recruitment_date
    formModal.chief_position = item.chief_position
    formModal.degree_level = item.degree_level;
    formModal.work_bet = item.work_bet
    formModal.scientific_title = item.scientific_title;
    formModal.status = item.status;
    // formModal.departments = formModal.departments.push(...item?.departments);
    item.roles.forEach((el)=> formModal.roles.push(el))
    // formModal.roles = item.roles
    formModal.gender = item.gender;
    formModal.specialist = item.specialist
}

onMounted(() => {
    userStore.fetchUsersList(limit.value,currentPage.value)
});
</script>



