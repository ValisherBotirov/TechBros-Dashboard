Code
<template>
  <div class="">
   <div class="flex flex-col-reverse">
       <label class="block mt-2 text-sm font-medium text-gray-900" :class="error?'text-[red]':''"
       >Rasm yuklash</label
       >
       <div
               v-if="line"
               class="max-w-[300px] min-h-[170px] h-[170px] w-full flex items-center justify-center rounded-[10px] relative border border-dashed !border-black image-upload"
               :class="[
        {
          'border-2 border-dashed border-[#E9ECF0]': !image.url,
          '!border-[#e74c3c]': error,
        },
      ]"
       >
           <input
                   id="file"
                   type="file"
                   name="file"
                   class="w-0 h-0 absolute"
                   accept="image/png, image/jpeg"
                   @change="handleFile"
           />
           <div
                   v-if="image.url"
                   class="w-full h-full flex-center relative object-cover"
           >
               <img
                       :src="image.url"
                       alt="avatar"
                       class="w-full h-full object-cover relative z-0 rounded-[10px]"
                       @error="image.url = null"
               />
               <div
                       class="absolute top-0 left-0 bg-[#27314099] w-full h-full flex items-center justify-center z-20 rounded-[10px] cursor-pointer"
                       @click="removeImage"
               >
                   <span class="text-white text-2xl">remove Image</span>
               </div>
           </div>
           <div
                   v-else
                   class="w-full h-full absolute top-0 flex items-center justify-center flex-col gap-5 cursor-pointer"
                   @click="getFile"
           >
               <p class="text-[#8390A6] text-base font-normal opacity-80">
                   {{ desc }}
               </p>
           </div>
       </div>
       <div
               v-else-if="avatar"
               class="w-[100px]  h-[100px] rounded-[50%]  flex items-center justify-center  relative border  !border-gray-500 image-upload"
               :class="[
        {
          'border-2  border-[#E9ECF0]': !image.url,
          '!border-[#e74c3c] ': error,
        },
      ]"
       >
           <input
                   id="file"
                   type="file"
                   name="file"
                   class="w-0 h-0 absolute"
                   accept="image/png, image/jpeg"
                   @change="handleFile"
           />
           <div
                   v-if="image.url"
                   class="w-[100px] h-[100px] flex-center relative object-cover"
           >
               <img
                       :src="image.url"
                       alt="avatar"
                       class="w-[100px] h-[100px] object-cover relative z-0 rounded-[50%]"
                       @error="image.url = null"
               />
               <div
                       class="absolute top-0 left-0 bg-[#27314099] w-[100px] h-[100px] flex items-center justify-center z-20 rounded-[50%] cursor-pointer"
                       @click="removeImage"
               >
                   <!--                  <span class="text-white text-2xl">remove Image</span>-->
                   <i class="fa-sharp fa-solid fa-trash text-gray-500 text-[20px]"></i>
               </div>
           </div>
           <div
                   v-else
                   class="w-full h-full absolute top-0 flex items-center justify-center flex-col gap-5 cursor-pointer bg-images"
                   @click="getFile"
           >
               <!--              <p class="text-[#8390A6] text-base font-normal opacity-80">-->
               <!--                  {{ desc }}-->
               <!--              </p>-->
               <i class="fa-solid fa-camera text-gray-500 text-[26px]" :class="error?'text-[red]':''"></i>
           </div>

       </div>
       <div v-else-if="small" class="p-2 bg-[#E9ECF0] rounded-[4px] relative">
           <input
                   accept="image/png, image/jpeg, image/*"
                   id="file"
                   type="file"
                   name="file"
                   class="w-0 h-0 absolute"
                   @change="handleFile"
           />
           <div
                   v-if="image.url"
                   class="w-full h-full flex items-center justify-between"
           >
               <div class="flex gap-4 items-center">
                   <img
                           :src="image.url"
                           alt="avatar"
                           class="w-[52px] h-[52px] object-cover relative z-0 rounded-[4px]"
                           @error="image.url = null"
                   />
                   <p v-if="imageName" class="text-[#273140] text-base leading-6">
                       {{ imageName }}
                   </p>
               </div>
               <div
                       class="rounded-[4px] cursor-pointer !h-7 flex-center mr-2 bg-red"
                       @click="removeImage"
               >
                   <span class="text-sm text-red-400">remove</span>
               </div>
           </div>
           <div
                   v-else
                   class="w-full h-full flex items-center gap-5 cursor-pointer"
                   @click="getFile"
           >
               <p class="text-[#8390A6] text-xs font-normal opacity-80">
                   {{ desc }}
               </p>
           </div>
       </div>
   </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

const emit = defineEmits(["upload","getBase64"]);
interface Props {
  item: any;
  small: boolean;
  error: boolean;
  desc: string;
  image: string;
  avatar:boolean;
  line:boolean;
  label:string
}
const props = withDefaults(defineProps<Props>(), {
  item: "",
  small: false,
    avatar:false,
    line:false,
  error: false,
  desc: "Upload images",
    label:""
});
const image = reactive({
  url: props?.image,
  file: null,
});


let imageName = ref("");
const handleFile = (event: any) => {
  image.file = event.target.files[0];
  imageName.value = image.file?.name;
  const reader = new FileReader();
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      image.url = e.target?.result;
        emit("getBase64",reader.result)
    };
    send();
  }
};
const getFile = () => {
  const input = document.getElementById("file");
  input?.click();
};
const removeImage = () => {
  image.file = null;
  image.url = null;
  send();
};
const send = () => {
  emit("upload", image);
};
onMounted(() => {
  if (props.item) {
    image.url = props.item;
  }
});
</script>
<style>
.color {
  color: #e74c3c;
}
/*.bg-images{*/
/*    background-image: url("https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png");*/
/*    background-size: cover  ;*/
/*}*/
</style>
