<template>
  <Suspense>
    <CovidTotalStatusItem />
  </Suspense>
  <section class="country__container grid">
    <CovidRankingList />
    <CovidChart />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import CovidTotalStatusItem from '@/components/covidTotal/CovidTotalItem.vue';
import CovidRankingList from '@/components/covidRanking/CovidRankingList.vue';
import CovidChart from '@/components/covidChart/CovidChart.vue';

export default defineComponent({
  name: 'MainPage',
  components: {
    CovidTotalStatusItem,
    CovidRankingList,
    CovidChart,
  },
  async setup() {
    const { dispatch } = useStore();
    await dispatch('covidList/fetchCovidSummary');
    await dispatch('covidChart/fetchChartDefault');
  },
});
</script>
<style scoped></style>
