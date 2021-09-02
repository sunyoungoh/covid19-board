import { ref } from 'vue';
import { Module } from 'vuex';
import { RootState } from '../index';
import { AxiosResponse } from 'axios';
import { fetchCovidSummary } from '@/api/covid';
import {
  Country,
  CountryRanking,
  CovidSummaryResponse,
  Global,
} from '@/types/covid';
import { RankingFilter } from '@/types/filter';

export interface CovidListState {
  covidTotal: Global;
  covidSummary: CountryRanking[];
  selectedCountry: {
    name: string;
    slug: string;
  };
  rankingFilters: RankingFilter[];
}

export const covidList: Module<CovidListState, RootState> = {
  namespaced: true,
  state: () => ({
    covidTotal: {} as Global,
    covidSummary: [] as CountryRanking[],
    selectedCountry: {
      name: '',
      slug: '',
    },
    rankingFilters: [
      { name: 'Confirmed', desc: true, selected: true },
      { name: 'Deaths', desc: true, selected: false },
      { name: 'Recovered', desc: true, selected: false },
    ],
  }),

  mutations: {
    setCovidTotal(state, covidTotal) {
      state.covidTotal = covidTotal;
    },
    setCovidSummary(state, covidSummary) {
      state.covidSummary = covidSummary;
    },
    setSelectedCountry(state, { name, slug }) {
      state.selectedCountry.name = name;
      state.selectedCountry.slug = slug;
    },
    reverseSummary(state) {
      state.covidSummary.reverse();
    },
    reverseFilterOrder(state) {
      const selectedFilter = state.rankingFilters.find(
        filter => filter.selected === true,
      );
      selectedFilter!.desc = selectedFilter!.desc ? false : true;
    },
    changeFilter(state, selectedFilter) {
      state.rankingFilters.map(filter => {
        filter === selectedFilter
          ? (filter.selected = true)
          : (filter.selected = false);
        filter.desc = true;
      });
    },
    sortByConfirmed(state) {
      state.covidSummary.sort(
        (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed,
      );
    },
    sortByDeaths(state) {
      state.covidSummary.sort(
        (a: Country, b: Country) => b.TotalDeaths - a.TotalDeaths,
      );
    },
    sortByRecovered(state) {
      state.covidSummary.sort(
        (a: Country, b: Country) => b.TotalRecovered - a.TotalRecovered,
      );
    },
  },

  getters: {
    selectedFilter(state) {
      return state.rankingFilters.find(filter => filter.selected)?.name;
    },
  },

  actions: {
    async fetchCovidSummary({ state, commit }) {
      try {
        const { data }: AxiosResponse<CovidSummaryResponse> =
          await fetchCovidSummary();
        // 확진자 수 랭킹 정렬
        const filterdIndex = ref<number>(0);
        const rankingData = data.Countries.sort(
          (a: Country, b: Country) => b.TotalConfirmed - a.TotalConfirmed,
        ).map(
          (value: Country) =>
            (value = {
              ...value,
              index: ++filterdIndex.value,
            } as CountryRanking),
        );
        commit('setCovidTotal', data.Global);
        commit('setCovidSummary', rankingData);
        if (!state.selectedCountry.name) {
          commit('setSelectedCountry', {
            name: rankingData[0].Country,
            slug: rankingData[0].Slug,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },

    reverseData({ commit }) {
      commit('reverseFilterOrder');
      commit('reverseSummary');
    },

    sortDataByStatus({ state, commit }, selectedFilter) {
      const filterdIndex = ref<number>(0);
      commit('changeFilter', selectedFilter);
      switch (selectedFilter.name) {
        case 'Confirmed':
          commit('sortByConfirmed');
          break;
        case 'Deaths':
          commit('sortByDeaths');
          break;
        case 'Recovered':
          commit('sortByConfirmed');
          break;
      }
      // 인덱스 초기화
      state.covidSummary.map((value: CountryRanking) => {
        value.index = ++filterdIndex.value;
      });
    },
  },
};
