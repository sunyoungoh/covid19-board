<template>
  <div class="app" :class="[isDarkTheme === 'true' ? 'dark-theme' : '']">
    <AppHeader />
    <main class="app-contents">
      <Suspense><router-view></router-view></Suspense>
    </main>
    <Footer />
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import AppHeader from '@/components/common/AppHeader.vue';
import Footer from '@/components/common/Footer.vue';

export default defineComponent({
  components: {
    AppHeader,
    Footer,
  },
  setup() {
    const { state, commit } = useStore();
    commit('darkTheme/getLocalStorageTheme');
    const isDarkTheme = computed(() => state.darkTheme.isDarkTheme);

    return { isDarkTheme };
  },
});
</script>
