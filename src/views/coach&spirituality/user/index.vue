<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Table.vue';
import BaseModal from '../../../components/BaseModal.vue';
import { useUserStore } from '@/stores/user';
import Button from '../../../components/Button.vue';
import { reactive } from "vue";

const store = useUserStore();

const fields = ref([
    "No",
    "username",
    "Email",
    "Nama role",
    "Status",
    "Dibuat",
    "Action",
]);

const isOpenDelete = ref(false);

const getItems = computed(() => store.getItems);
const getIsOpen = computed(() => store.getIsOpen);
const getIsLoading = computed(() => store.getLoading);

const searchUser = ref("");

const form = reactive(
    {
        user_name: "",
        user_password: "",
        user_active: true,
        role_id: 0,
        mail: "",
        full_name: "",
        phone: ""
    }
);

const getUser = () => store.fetchUser({ userId: searchUser.value });
const createUser = () => store.fetchCreateUser(form);

// const modalDelete = (paramId) => {
//     isOpenDelete.value = true;
//     username.value = paramId;
// }

const updateStatusUser = async (paramId) => {
    await store.fetchDeleteUser(paramId);
    getUser();
    // isOpenDelete.value = false;
}


onMounted(() => {
    getUser();
});
</script>

<template>
    <div>
        <div class="w-full bg-slate-50 min-h-[70vh] py-8 px-8">
            <div class="flex mb-4 items-center">
                <div class="mt-auto ml-auto">
                    <Button @click="store.updateModal(true)">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" height="16" fill="#FFFFFF" viewBox="0 -960 960 960"
                                width="16">
                                <path
                                    d="M730-420v-120H610v-40h120v-120h40v120h120v40H770v120h-40Zm-370-84.615q-49.5 0-84.75-35.25T240-624.615q0-49.501 35.25-84.751 35.25-35.25 84.75-35.25t84.75 35.25Q480-674.116 480-624.615q0 49.5-35.25 84.75T360-504.615ZM80-215.384v-65.847Q80-306 94.423-327.577q14.423-21.577 38.808-33.5 56.615-27.154 113.307-40.731Q303.231-415.385 360-415.385q56.769 0 113.462 13.577 56.692 13.577 113.307 40.731 24.385 11.923 38.808 33.5Q640-306 640-281.231v65.847H80Zm40-40.001h480v-25.846q0-13.307-8.577-25-8.577-11.692-23.731-19.769-49.384-23.923-101.836-36.654Q413.405-375.385 360-375.385q-53.405 0-105.856 12.731Q201.692-349.923 152.308-326q-15.154 8.077-23.731 19.769-8.577 11.693-8.577 25v25.846Zm240-289.23q33 0 56.5-23.5t23.5-56.5q0-33-23.5-56.5t-56.5-23.5q-33 0-56.5 23.5t-23.5 56.5q0 33 23.5 56.5t56.5 23.5Zm0-80Zm0 369.23Z" />
                            </svg>
                        </span>
                        <span>
                            Create
                        </span>
                    </Button>
                </div>
            </div>
            <div>
                <div class="relative overflow-x-auto h-auto max-h-full hover:max-h-screen">
                    <Table :fields="fields">
                        <tbody class="pt-4 text-center z-0 text-xs">
                            <tr class="hover:bg-gray-50 border-b" v-for="(item, index) in getItems">
                                <td class="py-4 leading-6">
                                    {{ index + 1 }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.user_name }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.email }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.role_name }}
                                </td>
                                <td class="py-4 leading-6" v-if="item.is_active == false">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M791-55 686-160H160v-112q0-34 17.5-62.5T224-378q45-23 91.5-37t94.5-21L55-791l57-57 736 736-57 57ZM240-240h366L486-360h-6q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm496-138q29 14 46 42.5t18 61.5L666-408q18 7 35.5 14t34.5 16ZM568-506l-59-59q23-9 37-29.5t14-45.5q0-33-23.5-56.5T480-720q-25 0-45.5 14T405-669l-59-59q23-34 58-53t76-19q66 0 113 47t47 113q0 41-19 76t-53 58Zm38 266H240h366ZM457-617Z" />
                                    </svg>
                                </td>
                                <td class="py-4 leading-6 relative" v-else>
                                    <svg class="absolute top-4 left-10" fill="#A2C579" xmlns="http://www.w3.org/2000/svg"
                                        height="24" viewBox="0 -960 960 960" width="24">
                                        <path
                                            d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm240 320H240q-33 0-56.5-23.5T160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160Zm-480-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                                    </svg>
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.created_date }}
                                </td>
                                <td class="py-4 leading-6">
                                    <button class="px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E9B824" height="24" viewBox="0 -960 960 960"
                                            width="24">
                                            <path
                                                d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l113-113 169 169-112 112ZM120-120v-170l424-424 170 170-424 424H120Zm453-453-28-28 56 56-28-28Z" />
                                        </svg>
                                    </button>
                                    <button :disabled="item.user_name == 'pembina'" class="px-2" v-if="item.is_active == 'true'" @click="updateStatusUser(item.user_name)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#4EBF5F" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M280-260.001q-91.666 0-155.832-64.14-64.167-64.14-64.167-155.768 0-91.629 64.167-155.859Q188.334-699.999 280-699.999h400q91.666 0 155.832 64.14 64.167 64.14 64.167 155.768 0 91.629-64.167 155.859Q771.666-260.001 680-260.001H280ZM280-320h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm399.955-50.001q45.814 0 77.929-32.07t32.115-77.884q0-45.814-32.07-77.929t-77.884-32.115q-45.814 0-77.929 32.07t-32.115 77.884q0 45.814 32.07 77.929t77.884 32.115ZM480-480Z" />
                                        </svg>
                                    </button>
                                    <button class="px-2" v-else @click="updateStatusUser(item.user_name)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#C63D2F" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M280-260.001q-91.666 0-155.832-64.14-64.167-64.14-64.167-155.768 0-91.629 64.167-155.859Q188.334-699.999 280-699.999h400q91.666 0 155.832 64.14 64.167 64.14 64.167 155.768 0 91.629-64.167 155.859Q771.666-260.001 680-260.001H280ZM280-320h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm-.045-50.001q45.814 0 77.929-32.07t32.115-77.884q0-45.814-32.07-77.929t-77.884-32.115q-45.814 0-77.929 32.07t-32.115 77.884q0 45.814 32.07 77.929t77.884 32.115ZM480-480Z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
        <BaseModal :open="getIsOpen" @close="store.updateModal(false)" :width="'w-96'">
            <form @submit.prevent="createUser" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Name
                            </label>
                            <input v-model="form.full_name"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                No. Hp
                            </label>
                            <input v-model="form.phone"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Username
                            </label>
                            <input v-model="form.user_name"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Password
                            </label>
                            <input v-model="form.user_password"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Email
                            </label>
                            <input v-model="form.mail"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                </div>
                <Button class="m-auto ml-auto">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"
                            fill="#FFFFFF">
                            <path d="M460-460H240v-40h220v-220h40v220h220v40H500v220h-40v-220Z" />
                        </svg>
                    </span>
                    <span
                        :class="getIsLoading ? 'h-6 w-6 block rounded-full border-4 border-t-[#4EBF5F] animate-spin' : ''">
                        {{ getIsLoading ? '' : 'New' }}
                    </span>
                </Button>
            </form>
        </BaseModal>
        <!-- <BaseModal :open="isOpenDelete" @close="() => isOpenDelete = false" :width="'w-96'">
            <div class="py-4">
                <div class="mx-auto py-2">
                    <p class="text-xs leading-3 text-center my-4">Apakah Anda Ingin Menghapus Akun Ini ?</p>
                </div>
                <div class="flex justify-center">
                    <Button class="bg-[#C63D2F]" @click="updateStatusUser">
                        <span>
                            Yes
                        </span>
                    </Button>
                    <Button class="bg-[#B4B4B3]" @click="isOpenDelete = false">
                        <span>
                            Cancel
                        </span>
                    </Button>
                </div>
            </div>
        </BaseModal> -->
    </div>
</template>

<style scoped>
.style-chooser {
    min-width: 13.9vw;
    --vs-font-size: 1em;
    --vs-border-color: #cbcbcb;
    --vs-controls-color: #01a1b9;
    --vs-dropdown-bg: #ffff;
    --vs-dropdown-bg: #ffff;
    --vs-dropdown-color: #101010;
    --vs-dropdown-option-color: rgb(0, 0, 0);
    --vs-selected-bg: #664cc3;
    --vs-selected-color: #000000;
    --vs-search-input-color: #595858;
    --vs-line-height: 2vw;
}
</style>