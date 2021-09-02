<template>
  <article class="chart__container">
    <div class="section__title">
      📈 {{ selectedCountry.name || 'Selected Country' }} Chart
    </div>
    <div class="section__subtitle">Total Status Overview</div>
    <ul class="chart__days grid">
      <li
        class="chart__day"
        v-for="days in chartDays"
        :key="days"
        :class="[days.selected ? 'chart__day-selected ' : '']"
        @click="changeChartDays(days)"
      >
        {{ days.name }}
      </li>
    </ul>
    <div class="chart__content">
      <LoadingSpinner v-if="isChartLoading"></LoadingSpinner>
      <template v-else>
        <CovidChartLine v-if="chartData" />
        <CovidChartTable />
      </template>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { ChartDays } from '@/types/filter';
import CovidChartLine from '@/components/covidChart/CovidChartLine.vue';
import CovidChartTable from '@/components/covidChart/CovidChartTable.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';

export default defineComponent({
  name: 'CovidChart',
  components: { CovidChartLine, CovidChartTable, LoadingSpinner },
  setup() {
    const { state, dispatch } = useStore();
    const isChartLoading = computed(() => state.covidChart.isChartLoading);
    const selectedCountry = computed(() => state.covidList.selectedCountry);
    const chartData = computed(() => state.covidChart.chartData);
    const chartDays = computed(() => state.covidChart.chartDays);
    const changeChartDays = async (day: ChartDays) => {
      await dispatch('covidChart/changeChartDays', day);
    };

    return {
      isChartLoading,
      selectedCountry,
      chartData,
      chartDays,
      changeChartDays,
    };
  },
});
</script>
<style scoped></style>
