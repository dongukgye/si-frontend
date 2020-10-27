<template>
  <div>
    <h1>Dashboard</h1>
    <button class="bg-white px-4 py-2 rounded-md" @click="loginUser">
      login
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IUser } from "@/services/interfase";
import store from "@/store";

export default defineComponent({
  setup() {
    function loginUser() {
      const user: IUser = {
        email: "test@test.com",
        password: "12345678",
      };
      store.dispatch("auth/login", user);
    }
    return { loginUser };
  },
});
</script>

<style scoped></style>
