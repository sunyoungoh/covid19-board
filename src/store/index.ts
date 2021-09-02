import { createStore, createLogger } from 'vuex';
import { covidList, CovidListState } from '@/store/modules/covidList';
import { covidChart, CovidChartState } from '@/store/modules/covidChart';
import { darkTheme, DarkThemeState } from '@/store/modules/darkTheme';

export interface RootState {
  covidList: CovidListState;
  covidChart: CovidChartState;
  darkTheme: DarkThemeState;
}

export default createStore({
  modules: { covidList, covidChart, darkTheme },
  plugins: [createLogger()],
});
