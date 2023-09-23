<template>
    <transition v-if="open" name="modal-slide">
        <div class="fixed top-3 right-4 z-50 pb-2">
            <div class="w-80 bg-[#FFFFFF] shadow-lg rounded-lg"
                :class="responseStatus !== 200 ? 'shadow-red-100' : 'shadow-green-100'">
                <div class="px-4 py-3">
                    <div class="text-center flex flex-wrap items-center">
                        <span>
                            <svg v-if="responseStatus !== 200" xmlns="http://www.w3.org/2000/svg" fill="#DF2E38" height="32"
                                viewBox="0 -960 960 960" width="32">
                                <path
                                    d="M109.23-160 480-800l370.77 640H109.23ZM178-200h604L480-720 178-200Zm302-55.385q10.462 0 17.539-7.076 7.076-7.077 7.076-17.539 0-10.462-7.076-17.539-7.077-7.076-17.539-7.076-10.462 0-17.539 7.076-7.076 7.077-7.076 17.539 0 10.462 7.076 17.539 7.077 7.076 17.539 7.076Zm-20-89.23h40v-200h-40v200ZM480-460Z" />
                            </svg>
                            <svg v-else class="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                                </path>
                            </svg>
                        </span>
                        <p class="text-[#3F3F44] text-xs font-semibold leading-6">{{ message, responseStatus }}</p>
                        <button type="button" @click="$emit('close')" class="text-white ml-auto">
                            <svg class="w-5 h-5" fill="#525252" viewBox="0 0 20 20">
                                <path
                                    d="M10 12.586l4.293 4.293a1 1 0 0 0 1.414-1.414L11.414 11l4.293-4.293a1 1 0 1 0-1.414-1.414L10 9.586 5.707 5.293a1 1 0 0 0-1.414 1.414L8.586 11l-4.293 4.293a1 1 0 1 0 1.414 1.414L10 12.586z">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
  
<script setup>
const { open, message, responseStatus } = defineProps(["open", "message", "responseStatus"])
const emit = defineEmits(["close"]);
</script>
  
  
  
<style></style>
  