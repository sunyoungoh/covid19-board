<template>
  <article class="ranking__container" v-if="rankingData">
    <div class="section__title">🌏 Country Ranking</div>
    <ul class="ranking__filters section__subtitle">
      <CovidRankingListFilter
        v-for="filter in rankingFilters"
        :key="filter"
        :filter="filter"
        class="ranking__filter"
        @click="sortByStatus(filter)"
      />
    </ul>
    <CovidRankingListSearch v-model:searchTerm="searchTerm" />
    <ul class="ranking__list">
      <CovidRankingListItem
        v-for="(country, index) in filterdData"
        :key="index"
        :country="country"
        :rankingFilter="rankingFilter"
      />
    </ul>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { RankingFilter } from '@/types/filter';
import { CountryRanking } from '@/types/covid';
import CovidRankingListItem from '@/components/covidRanking/CovidRankingListItem.vue';
import CovidRankingListFilter from '@/components/covidRanking/CovidRankingListFilter.vue';
import CovidRankingListSearch from '@/components/covidRanking/CovidRankingListSearch.vue';

export default defineComponent({
  name: 'CovidRankingList',
  components: {
    CovidRankingListItem,
    CovidRankingListFilter,
    CovidRankingListSearch,
  },
  setup() {
    const { state, getters, dispatch } = useStore();
    const rankingData = computed(() => state.covidList.covidSummary);
    const rankingFilters = computed(() => state.covidList.rankingFilters);
    const rankingFilter = computed(() => getters['covidList/selectedFilter']);
    const searchTerm = ref('');
    const filterdData = computed(() => {
      return rankingData.value.filter((data: CountryRanking) => {
        return data.Country.toLowerCase().includes(
          searchTerm.value.toLowerCase(),
        );
      });
    });

    const sortByStatus = (selectedFilter: RankingFilter): void => {
      searchTerm.value = '';
      selectedFilter.selected
        ? dispatch('covidList/reverseData')
        : dispatch('covidList/sortDataByStatus', selectedFilter);
    };

    return {
      rankingData,
      rankingFilters,
      rankingFilter,
      searchTerm,
      filterdData,
      sortByStatus,
    };
  },
});
</script>
<style scoped></style>
