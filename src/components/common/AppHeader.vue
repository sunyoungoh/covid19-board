<template>
  <header>
    <span class="logo">COVID-19 Board</span>
    <div class="change-theme" @click="changeTheme">
      <ion-icon v-if="isDarkTheme == 'true'" name="sunny"></ion-icon>
      <ion-icon v-else name="moon"></ion-icon>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const { state, commit } = useStore();
    const isDarkTheme = computed(() => state.darkTheme.isDarkTheme);
    const changeTheme = () => commit('darkTheme/changeTheme');

    return { isDarkTheme, changeTheme };
  },
});
</script>

<style scoped></style>
