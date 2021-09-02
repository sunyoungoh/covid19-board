<template>
  <div class="table">
    <ul class="table__thead grid">
      <li class="table__thead__date" @click="sortByDate">
        <span>Date</span>
        <div class="sort__icon" :class="[dateDesc ? 'sort__desc' : '']">
          <ion-icon name="caret-up-outline"></ion-icon>
        </div>
      </li>
      <li v-for="filter in rankingFilters" :key="filter">{{ filter.name }}</li>
    </ul>
    <ul class="table__tbody">
      <li class="tr grid" v-for="(data, index) in chartTable" :key="index">
        <div class="td">{{ date(data.Date) }}</div>
        <div class="td">{{ comma(data.Confirmed) }}</div>
        <div class="td">{{ comma(data.Deaths) }}</div>
        <div class="td">{{ comma(data.Recovered) }}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { comma, date } from '@/utils/filters';

export default defineComponent({
  name: 'CovidChartTable',
  setup() {
    const { state, commit } = useStore();
    const chartTable = computed(() => state.covidChart.chartTable);
    const rankingFilters = computed(() => state.covidList.rankingFilters);
    const dateDesc = ref(true);
    const sortByDate = () => {
      dateDesc.value = !dateDesc.value;
      commit('covidChart/reverseChartTable');
    };

    return {
      chartTable,
      rankingFilters,
      dateDesc,
      sortByDate,
      comma,
      date,
    };
  },
});
</script>
<style scoped></style>
