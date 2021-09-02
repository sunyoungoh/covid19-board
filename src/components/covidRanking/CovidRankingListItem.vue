<template>
  <li class="ranking__item" @click="renderChart(country.Country, country.Slug)">
    <span class="ranking__item-index">{{ country.index }} </span>
    <span class="ranking__item-country">{{ country.Country }}</span>
    <span class="ranking__item-num">
      <template v-if="rankingFilter === 'Confirmed'">
        {{ comma(country.TotalConfirmed) }}
        <span v-if="country.NewConfirmed !== 0" class="ranking__item-new">
          <ion-icon name="caret-up-outline"></ion-icon>
          {{ comma(country.NewConfirmed) }}
        </span>
      </template>
      <template v-if="rankingFilter === 'Deaths'">
        {{ comma(country.TotalDeaths) }}
        <span v-if="country.NewDeaths !== 0" class="ranking__item-new">
          <ion-icon name="caret-up-outline"></ion-icon>
          {{ comma(country.NewDeaths) }}
        </span>
      </template>
      <template v-if="rankingFilter === 'Recovered'">
        {{ comma(country.TotalRecovered) }}
        <span v-if="country.NewRecovered !== 0" class="ranking__item-new">
          <ion-icon name="caret-up-outline"></ion-icon>
          {{ comma(country.NewRecovered) }}
        </span>
      </template>
    </span>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useStore } from 'vuex';
import { comma } from '@/utils/filters';
import { CountryRanking } from '@/types/covid';

export default defineComponent({
  name: 'CovidRankingListItem',
  props: {
    country: { required: true, type: Object as PropType<CountryRanking> },
    rankingFilter: { required: true, type: String },
  },
  setup() {
    const { commit, dispatch } = useStore();
    const renderChart = (countryName: string, countrySlug: string) => {
      commit('covidChart/setIsChartLoading', true);
      commit('covidList/setSelectedCountry', {
        name: countryName,
        slug: countrySlug,
      });
      dispatch('covidChart/renderChart');
    };

    return {
      renderChart,
      comma,
    };
  },
});
</script>
<style scoped></style>
