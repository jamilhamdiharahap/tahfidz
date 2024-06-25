<template>
    <transition v-if="open" class="transition duration-500 ease-in-out transform -translate-y-1 scale-110">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container" :class="width">
            <div class="modal-header">
              <button class="times" @click="$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#3F3F44" height="24" viewBox="0 -960 960 960" width="24">
                  <path
                    d="M256-213.847 213.847-256l224-224-224-224L256-746.153l224 224 224-224L746.153-704l-224 224 224 224L704-213.847l-224-224-224 224Z" />
                </svg>
              </button>
            </div>
            <div class="modal-body p-4">  
              <slot />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  const { open, width } = defineProps(["open", "width"])
  const emit = defineEmits(["close"]);
  </script>
  
  <style scoped>
  .modal-header {
    float: right;
    font-size: 20px;
  }
  
  .modal-mask {
    position: fixed;
    z-index: 50;
    width: 100vw;
    left: 0%;
    top: 0%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease;
  }
  
  .modal-container {
    margin: 0px auto;
    height: max-content;
    padding: 20px 30px !important;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }
  
  .times {
    border-radius: 50%;
    height: 30px;
    cursor: pointer;
    z-index: 10;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #dddddd;
    color: black;
  }
  
  .modal-enter-from {
    opacity: 0;
  }
  
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  </style>