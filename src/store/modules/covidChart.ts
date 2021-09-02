import { Module } from 'vuex';
import { RootState } from '../index';
import { AxiosResponse } from 'axios';
import { fetchCountryInfo } from '@/api/covid';
import { CountryDetailResponse, CountryDetailInfo } from '@/types/covid';
import { ChartDays } from '@/types/filter';

export interface CovidChartState {
  isChartLoading: boolean;
  chartData: [];
  chartTable: [];
  chartOptions: [];
  chartDays: ChartDays[];
}

export const covidChart: Module<CovidChartState, RootState> = {
  namespaced: true,
  state: () => ({
    isChartLoading: false,
    chartData: [],
    chartTable: [],
    chartOptions: [],
    chartDays: [
      { name: '1 Week', days: 7, selected: true },
      { name: '2 Week', days: 14, selected: false },
      { name: '1 Month', days: 30, selected: false },
      { name: '3 Month', days: 90, selected: false },
    ],
  }),

  mutations: {
    setIsChartLoading(state, status) {
      state.isChartLoading = status;
    },
    setChartTable(state, chartTable) {
      state.chartTable = chartTable;
    },
    reverseChartTable(state) {
      state.chartTable.reverse();
    },
    setChartData(state, chartData) {
      state.chartData = chartData;
    },
  },

  actions: {
    async fetchChartDefault({ commit, dispatch }) {
      try {
        commit('setIsChartLoading', true);
        await dispatch('renderChart');
      } catch (error) {
        console.log(error);
      }
    },

    async renderChart({ state, commit, rootState, rootGetters }) {
      try {
        const { data }: AxiosResponse<CountryDetailResponse> =
          await fetchCountryInfo(rootState.covidList.selectedCountry.slug);

        const days: number = state.chartDays.find(value => value.selected)
          ?.days as number;

        const chartTable = data.slice(-days).reverse();
        commit('setChartTable', chartTable);

        const chartDataCofirmed = data
          .slice(-days)
          .map((value: CountryDetailInfo) => value.Confirmed);
        const chartDataDeaths = data
          .slice(-days)
          .map((value: CountryDetailInfo) => value.Deaths);
        const chartDataRecovered = data
          .slice(-days)
          .map((value: CountryDetailInfo) => value.Recovered);
        const chartLabel = data
          .slice(-days)
          .map((value: CountryDetailInfo) =>
            new Date(value.Date).toLocaleDateString().slice(5, -1),
          );

        const chartHidden = [
          { name: 'Confirmed', hidden: false },
          { name: 'Deaths', hidden: true },
          { name: 'Recovered', hidden: true },
        ];

        chartHidden.map(value => {
          value.name === rootGetters['covidList/selectedFilter']
            ? (value.hidden = false)
            : (value.hidden = true);
        });

        const chartData = {
          labels: chartLabel,
          datasets: [
            {
              label: 'Cofirmend',
              data: chartDataCofirmed,
              borderColor: '#f87979',
              backgroundColor: '#f87979',
              fill: false,
              tension: 0.4,
              hidden: chartHidden[0].hidden,
            },
            {
              label: 'Deaths',
              data: chartDataDeaths,
              borderColor: '#bebebe',
              backgroundColor: '#bebebe',
              fill: false,
              tension: 0.4,
              hidden: chartHidden[1].hidden,
            },
            {
              label: 'Recovered',
              data: chartDataRecovered,
              borderColor: '#459ef8',
              backgroundColor: '#459ef8',
              fill: false,
              tension: 0.4,
              hidden: chartHidden[2].hidden,
            },
          ],
        };
        commit('setChartData', chartData);
      } catch (error) {
        console.log(error);
        commit('setChartData', []);
      } finally {
        commit('setIsChartLoading', false);
      }
    },

    async changeChartDays({ state, commit, dispatch }, days: ChartDays) {
      state.chartDays.map((value: ChartDays) => (value.selected = false));
      days.selected = true;
      commit('setIsChartLoading', true);
      await dispatch('renderChart', days.days);
    },
  },
};
