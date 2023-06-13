<template>
  <h2 class="text-[20px] font-semibold">Hisobot nomi</h2>

    <div class="grid grid-cols-10 gap-6 mt-10">
        <div class="col-span-2 px-3 py-5 bg-white">
            <div class="text-center ">
                <img  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="user images" class="w-[120px] h-[120px] rounded-[50%] mx-auto ">
                <div class="mt-4">
                    <p class="font-medium mb-1">Valisher Botirov</p>
                    <p>CEO</p>
                </div>
            </div>
        </div>
        <div class="col-span-8 px-6 py-4 bg-white">
            <p class="font-medium text-xl ">Hisobot nomi</p>
            <div class="mt-6 min-h-[400px] flex flex-col justify-between">
                <p class=" text-base pb-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cumque dolorem ducimus excepturi, harum natus neque nobis perspiciatis quidem.
                </p>
                <div class="flex justify-between">
                    <SButton variant="primary_dark" type="submit" class="!px-[60px]" @click="handleSubmit">
                        Qabul qilish
                    </SButton>
                    <SButton variant="danger" type="submit" class="!px-[60px]" @click="handleSubmit">
                        Rad etish
                    </SButton>
                </div>
            </div>

        </div>
    </div>



</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import axios from "axios";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

import SButton from "../../components/buttons/SButton.vue";

const toast = useToast();
const route = useRoute();
const router = useRouter();





// const fetchData = () => {
//   const params = {
//     withCredentials: true,
//   };
//   axios
//     .get(`/services/${route.params.id}`)
//     .then((res) => {
//       productList.value = res.data.data;
//
//       isMount.value = true;
//     })
//     .catch((err) => {
//       toast.error("Yuklanishda xatolik yuz berdi!");
//     });
// };



onMounted(() => {
  // fetchData();
});
</script>

<style scoped>
.modal-class {
  overflow: visible;
  display: flex;
  backdrop-filter: blur(6px);
}
</style>
