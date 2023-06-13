<template>
    <div>
        <ActionModal
            custom-class="!max-w-[800px] relative"
            modal-title="Malumotlarni tahrirlash"
            :is-open="openActionModal"
            @closeModal="closeActionModal"
            @saveModal="saveActionModal"
            :loading="actionModalLoading"
        >


            <UploadImages :image="formModal.image" :error="v$.image.$error" @getBase64="getImages" :avatar="true" class="flex justify-end flex-shrink-0 absolute right-[-140px]  top-0 p-4 bg-white rounded-lg shadow"/>
            <div class="flex gap-5">
                <FormInput placeholder="Ismingizni kiriting" v-model="formModal.first_name" :error="v$.first_name.$error" label="Ism" customClass="!p-2" class="w-full"/>
                <FormInput placeholder="Familiyangizni kiriting" v-model="formModal.last_name" :error="v$.last_name.$error" label="Familiya" customClass="!p-2" class="w-full" />
            </div>
            <div class="flex gap-5 mt-3">
                <FormInput placeholder="Otasining ismi" v-model="formModal.patronymic" :error="v$.patronymic.$error"  label="Sharif" customClass="!p-2" class="w-full"  />
                <FormInput placeholder="valisherbotirov1218@gmail.com" type="email" v-model="formModal.email" :error="v$.email.$error"  label="Email" customClass="!p-2" class="w-full"  />

            </div>
            <div class="flex gap-5 mt-3">
                <FormInput placeholder="Lavozimi" v-model="formModal.position" :error="v$.position.$error"  label="Lavozim" customClass="!p-2" class="w-full"  />
                <FormInput class="w-full" label="Telefon raqam" customClass="!p-2" placeholder="00 000 00 00" v-model="formModal.phone" :error="v$.phone.$error"   :prefix-class=" v$.phone.$error ? 'mr-2 font-medium text-[red] leading-125':'mr-2 font-medium leading-125'"
                           v-maska="'## ### ## ##'" >
                    <template #prefix> +998</template>
                </FormInput>
            </div>
            <div class="flex gap-3 mt-3">
                <FormInput placeholder="Mutaxassisligi" v-model="formModal.specialist"  :error="v$.specialist.$error" label="Mutaxassisligi" customClass="!p-2" class="w-full"/>
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
            </div>
            <div class="flex gap-3 mt-3">
                <FormInput  placeholder="Parolingizni kiriting" type="password" v-model="formModal.old_password"  :error="v$.new_password.$error" label="Avvalgi parol" customClass="!p-2" class="w-full"/>
                <FormInput  placeholder="Parolingizni kiriting" type="password" v-model="formModal.new_password"  :error="v$.new_password.$error" label="Yangi parol" customClass="!p-2" class="w-full"/>
            </div>
            <div class="flex gap-3 mt-3">
                <SingleSelect v-model="formModal.gender" :label="`Jinsi   ${formModal.gender}`" placeholder="Jinsi" :data="dataGender" class="w-full" :error="v$.gender.$error"/>
                <div class="w-full"></div>
            </div>
        </ActionModal>
        <div class="grid grid-cols-2 p-3 px-4 bg-white rounded-lg">
            <div class="flex gap-4 border-r border-[black]">
                <img  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user images" class="object-cover max-h-[200px]">
                <div class="">
                    <BlockPreloader :loading="loading" width="300px" height="38px">
                         <p class="font-medium text-xl">{{ userData?.first_name }} {{userData?.last_name}}</p>
                    </BlockPreloader>
                    <BlockPreloader :loading="loading" width="200px" height="28px" margin="10px 0 0 0 ">
                      <p class="mt-1">{{ userData?.position }}</p>
                    </BlockPreloader>
                </div>
            </div>
            <div class="pl-4">
                <BlockPreloader :loading="loading" width="500px" height="35px" >
                    <p class="font-medium text-lg">Ball : {{ userData?.status }}</p>
                </BlockPreloader>

            </div>
        </div>
        <div class="grid grid-cols-10 gap-4 mt-4">
            <div class="col-span-2 rounded-lg bg-white px-3 py-2 pb-3">
                <p class="font-medium text-xl text-center">Bo'limlar</p>
                <div class="bg-[#E5E0DB] rounded-lg text-center py-4 mt-2 cursor-pointer">
                    Bo'lim nomi
                </div>
                <div class="bg-[#E5E0DB] rounded-lg text-center py-4 mt-2 cursor-pointer">
                    Bo'lim nomi
                </div>
            </div>
            <div class="col-span-8 rounded-lg bg-white px-3 py-3 relative">
                <div class="flex gap-4">
                    <div class="basis-[180px] flex-shrink-0 font-medium ">
                        <p class="">FIO:</p>
                        <p class="mt-2">Telefon raqam:</p>
                        <p class="mt-2">Email:</p>
                        <p class="mt-2">Lavozimi:</p>
                        <p class="mt-2">Mutaxassisligi:</p>
                        <p class="mt-2">Ilmiy darajasi:</p>
                        <p class="mt-2">Ish turi:</p>
                        <p class="mt-2">Ishga olingan vaqti:</p>
                        <p class="mt-2">chief_position:</p>
                        <p class="mt-2">degree_level:</p>
                        <p class="mt-2">work_bet:</p>

                    </div>
                    <div>
                        <BlockPreloader :loading="loading" width="600px" height="28px" margin="0 0 0 0 ">
                        <p>{{ userData?.first_name }} {{userData?.last_name}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="500px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{PhoneNumberFormatter(userData?.phone)}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="450px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.email}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="450px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.position}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="500px" height="28px" margin="10px 0 0 0 ">

                        <p class="mt-2">{{userData?.specialist}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="450px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.scientific_title}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="600px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.form_of_work}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="500px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.recruitment_date}}</p>
                        </BlockPreloader>
                        <BlockPreloader :loading="loading" width="300px" height="28px" margin="10px 0 0 0 ">
                        <p class="mt-2">{{userData?.chief_position}}</p>
                        </BlockPreloader>
                        <p class="mt-2">{{userData?.degree_level}}</p>
                        <p class="mt-2">{{userData?.work_bet}}</p>
                    </div>
                </div>
                <div class="absolute right-[10px] bottom-[10px]">
                      <SButton class="cursor-pointer " variant="info" @click="editProfile">Malumotlarni tahrirlash</SButton>
                </div>
            </div>
        </div>
<!--        <pre>{{userData}}</pre>-->
    </div>
</template>
<script setup>
import {useRoute} from "vue-router";
import axios from "@/plugins/axios.js";
import {onMounted} from "@vue/runtime-core";
import {computed, ref} from "vue";
import {PhoneNumberFormatter} from "@/helpers/formatNumber.js";
import SButton from "@/components/buttons/SButton.vue";
import {reactive} from "@vue/reactivity";
import {email, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import UploadImages from "@/components/input/uploadImages.vue";
import ActionModal from "@/components/modal/ActionModal.vue";
import SingleSelect from "@/components/select/SingleSelect.vue";
import FormInput from "@/components/input/FormInput.vue";
import {useToast} from "vue-toastification";
import BlockPreloader from "@/components/buttons/BlockPreloader.vue";

const route = useRoute()
const toast = useToast()
const userData = ref([])
const dataGender = ref([
    {
        label : 'Erkak',
        value: "m"
    },
    {
        label:"Ayol",
        value:'f'
    }
])
const loading = ref(false)
function fetchUserSingle(){
    loading.value = true
    axios.get(`/users/account`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    }).then((res)=>{
        console.log(res)
        userData.value = res.data.data
    })
        .finally(()=>{
            loading.value = false
        })
}

// account date edit
const openActionModal = ref(false)
const actionModalLoading = ref(false)
const formModal = reactive({
    birth_date:"",
    email:"",
    first_name:"",
    gender:"",
    image:"",
    last_name:"",
    new_password:"",
    old_password:"",
    patronymic:"",
    phone:"",
    position:"",
    specialist:"",
})

const rules = computed(() => {
    return {
        birth_date:{required},
        email:{required,email},
        first_name: { required },
        gender:{required},
        image:{required},
        last_name: { required },
        position:{required},
        phone:{required},
        new_password:{required},
        old_password:{required},
        patronymic:{required},
        specialist:{required},
    };
});

const v$ = useVuelidate(rules, formModal);

function editProfile(){
    openActionModal.value = true
    formModal.first_name = userData?.value?.first_name;
    formModal.last_name = userData?.value?.last_name;
    formModal.birth_date = userData?.value?.birth_date;
    formModal.email = userData?.value?.email;
    formModal.position = userData?.value?.position;
    formModal.specialist = userData?.value?.specialist;
    formModal.gender = userData?.value?.gender;
    formModal.phone = userData?.value?.phone.slice(-9);
}

function getImages(e){
    formModal.image = e
}
function closeActionModal(){
    openActionModal.value = false
    formModal.first_name = ""
    formModal.last_name = ""
    formModal.position=""
    formModal.phone=""
    formModal.birth_date=""
    formModal.email=""
    formModal.old_password=""
    formModal.new_password=""
    formModal.patronymic=""
    formModal.specialist=""
    formModal.birth_date = ""
    formModal.status=""
    formModal.gender=""

    v$.value.$reset();
}

function saveActionModal(){
    v$.value.$validate();
    if(!v$.value.$error){
        actionModalLoading.value = true
        axios.patch('users/profile',formModal,{
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res)=>{
            console.log(res)
            toast.success("Muvaffaqiyatli tahrirlandi")
        })
            .catch((err)=>{
                console.log(err)
                toast.error("Xatolik yuz berdi")
            }).finally(()=>{
                actionModalLoading.value = false
        })
      console.log(formModal)
    }
}

onMounted(()=>{
    fetchUserSingle()
})
</script>