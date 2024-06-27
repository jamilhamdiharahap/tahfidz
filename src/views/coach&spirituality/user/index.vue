<script setup>
import { onMounted, computed, ref } from 'vue';
import Table from '@/components/Table.vue';
import BaseModal from '@/components/BaseModal.vue';
import { useUserStore } from '@/stores/user';
import Button from '@/components/Button.vue';
import { reactive } from "vue";

const store = useUserStore();

const fields = ref([
    "No",
    "username",
    "Email",
    "Nama",
    "Nama role",
    "Status",
    "Dibuat",
    "Action",
]);

const getItems = computed(() => store.getItems);
const getItemsUpdated = computed(() => store.getItemsUpdated);
const getIsOpen = computed(() => store.getIsOpen);
const getIsLoading = computed(() => store.getLoading);
const getIsOpenUpdate = computed(() => store.getIsOpenUpdate);

const payloadUser = reactive({
    userId: "",
    flag: true
});


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

const formUpdate = reactive(
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



const getUser = async () => await store.fetchUser(payloadUser);

const createUser = async () => {
    await store.fetchCreateUser(form);
    getUser();
}

const editUserById = async (userId) => {
    payloadUser.flag = false;
    payloadUser.userId = userId;
    await getUser();
    formUpdate.full_name = getItemsUpdated.value.full_name
    formUpdate.user_name = getItemsUpdated.value.user_name
    formUpdate.mail = getItemsUpdated.value.email
    formUpdate.phone = getItemsUpdated.value.phone
    formUpdate.role_id = getItemsUpdated.value.role_id
    formUpdate.user_active = getItemsUpdated.value.is_active === "true" ? true : false
    formUpdate.user_name = getItemsUpdated.value.user_name


    payloadUser.flag = true;
    payloadUser.userId = '';
}

// const modalDelete = (paramId) => {
//     isOpenDelete.value = true;
//     username.value = paramId;
// }

const updateStatusUser = async (paramId) => {
    await store.fetchDeleteUser(paramId);
    await getUser();
}


const updateUser = async () => {
    await store.updateUser(formUpdate)
    await getUser()
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
                                    {{ item.full_name }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.role_name }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.is_active === 'true' ? 'Aktif' : 'Tidak Aktif' }}
                                </td>
                                <td class="py-4 leading-6">
                                    {{ item.created_date }}
                                </td>
                                <td class="py-4 leading-6">
                                    <button class="px-2" @click="editUserById(item.user_id)">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E9B824" height="24"
                                            viewBox="0 -960 960 960" width="24">
                                            <path
                                                d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l113-113 169 169-112 112ZM120-120v-170l424-424 170 170-424 424H120Zm453-453-28-28 56 56-28-28Z" />
                                        </svg>
                                    </button>
                                    <button :disabled="item.user_name == 'pembina'" class="px-2"
                                        v-if="item.is_active == 'true'" @click="updateStatusUser(item.user_name)">
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
        <BaseModal :open="getIsOpenUpdate" @close="store.updateModalUpdate(false)" :width="'w-96'">
            <form @submit.prevent="updateUser" class="py-8">
                <div class="flex flex-col flex-wrap md:gap-4 space-y-2 mb-6">
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Name
                            </label>
                            <input v-model="formUpdate.full_name"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                No. Hp
                            </label>
                            <input v-model="formUpdate.phone"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Username
                            </label>
                            <input v-model="formUpdate.user_name" disabled
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Email
                            </label>
                            <input v-model="formUpdate.mail"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div>
                    <!-- <div class="relative h-12 w-auto min-w-[200px]">
                        <div>
                            <label class="block text-xs font-light mb-2">
                                Password
                            </label>
                            <input v-model="form.user_password"
                                class="text-xs border w-full min-h-[2vw] md:leading-[2vw] h-auto leading-[8vw] focus:ring-1 focus:outline-none focus:ring-[#F1C93B] rounded-md px-2"
                                type="text">
                        </div>
                    </div> -->
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
                        {{ getIsLoading ? '' : 'Save' }}
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