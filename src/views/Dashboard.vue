<template>
  <div>
    <h1>Dashboard</h1>
    <button class="bg-white px-4 py-2 rounded-md" @click="loginUser">
      login
    </button>
    <p>{{ t }}</p>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
import { IUser } from "@/services/interfase";
import store from "@/store";

export default defineComponent({
  setup() {
    const t = ref("");
    function loginUser() {
      const user: IUser = {
        email: "test@test.com",
        password: "123456",
      };
      store.dispatch("login", user).then(
        (data) => {
          t.value = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
    return { t, loginUser };
  },
});
</script>

<style scoped></style>
