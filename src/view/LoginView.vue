<template>
  <div class="flex justify-center items-center h-screen bg-gray-200 px-6">
      <div class="bg-[#F7F7F7] px-6 py-5 rounded-[6px] text-lg w-[400px]">
              <p class="text-center font-medium text-2xl">Log in</p>
              <form  class="mt-1">

                      <div class="mb-4">
                          <label for="login" class="mb-2 text-base font-medium transition duration-300"  :class="v$.login.$error ? 'text-[red]' : ''">Login</label>
                         <FormInput placeholder="Username" v-model="state.login" :error="v$.login.$error" inputClass="h-[18px]"  />
                      </div>

                      <div class="mt-4">
                          <label for="password" class="mb-2 font-medium transition duration-300 text-base" :class="v$.password.$error ? 'text-[red]' : ''">Parol</label>
                          <FormInput placeholder="Parol" v-model="state.password" :error="v$.password.$error" type="password" inputClass="h-[20px]"  custom-class=" "/>
                      </div>


                        <SButton variant="primary_dark" class="w-full !rounded-0 mt-5" @click.prevent="formLoginData" :loading="loading">Kirish</SButton>
              </form>
      </div>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import {onMounted} from "@vue/runtime-core";
const router = useRouter()
import axios from "@/plugins/axios.js";

import {
    required,
    email,
    minLength,
    helpers,
    maxLength,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import {useAuthStore} from "@/store/auth.js";
import FormInput from "@/components/input/FormInput.vue";
import SButton from "@/components/buttons/SButton.vue";
import {useRouter} from "vue-router";
import {useToast} from "vue-toastification";
const toast = useToast()
const authStore = useAuthStore()

const state = reactive({
    password: "",
    login:""
});
const rules = computed(() => {
    return {
        password: {
            required,
        },
        login:{required}
    };
});
const v$ = useVuelidate(rules, state);
const loading = ref(false)
const formLoginData = () => {
    v$.value.$validate();
    if (!v$.value.$error) {
        fetchApi(state);
    }
};

// const params = {
//     password: "qwerty",
//     email : "mukhtorov.me@gmail.com",
// }


const fetchApi = (data) => {
    const params = {
        password: data.password,
        email : data.login,
    }

  loading.value = true

    axios.get("/auth").then((res)=>{
        console.log(res)
        if(res.data.login === 'admin' && res.data.parol === 'Parol123'){
                authStore.user.userRole = "admin"
                authStore.user.isRegister = 1;
                sessionStorage.setItem("isRegister",(authStore.user.isRegister));
                toast.success("Tizimga muvaffaqiyatli kirdingiz!")
                router.push("/")
        }
    }).catch((err)=>{
        console.log(err)
        toast.error("Parol yoki email xato")
    }).finally(()=>{
        loading.value = false
    })

};



onMounted(() =>{
    authStore.checkUser()
    sessionStorage.setItem("isRegister", 0);
})
</script>