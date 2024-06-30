import { defineStore } from 'pinia'
import { loginAuthService } from '../service/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    items: [],
    isLoading: false,
    notification: {
      isAlert: false,
      message: null,
      responseStatus: null
    }
  }),

  actions: {
    updateNotification(status) {
      this.notification.isAlert = status
    },

    async fetchLogin({ router, payload }) {
      this.isLoading = true;
      const data = await loginAuthService(payload);
      if (data?.data?.status == 200) {
        localStorage.setItem("auth", JSON.stringify([data.data.data.token, data.data.data.role_id, data.data.data.full_name, data.data.data.email, {auth: true}]))
        setTimeout(() => {
          this.isLoading = false
          this.notification.message = data.data.message
          this.notification.responseStatus = data?.data.status
          this.updateNotification(true)
          setTimeout(() => {
            this.updateNotification(false)
          }, 3000)
        }, 100)

        if (data.data.data.role_id == "1") {
          router.push("/coach");
        } else if (data.data.data.role_id == "2") {
          router.push("/spiritual");
        } else if (data.data.data.role_id == "3") {
          console.log(data.data.data)
          localStorage.setItem('mahasiswa', JSON.stringify([data.data.data.mahasiswa_id, data.data.data.nama_mahasiswa, data.data.data.angkatan, data.data.data.nama_angkatan]))
          router.push("/students");
        } else {
          router.push({ name: "Login" });
        }

      } else {
        setTimeout(() => {
          this.isLoading = false
          this.notification.message = data.response.data.message
          this.notification.responseStatus = data?.response.status
          this.updateNotification(true)
          setTimeout(() => {
            this.updateNotification(false)
          }, 3000)
        }, 100)

        router.push({ name: "Login" });
      }
    },

    async logout({ router }) {
      localStorage.clear();
      router.push({ name: "Login" });
    }
  },

  getters: {
    getLoading: (state) => state.isLoading,
    getNotification: (state) => state.notification
  },
})
