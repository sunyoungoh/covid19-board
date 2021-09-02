import { Module } from 'vuex';
import { RootState } from '../index';

export interface DarkThemeState {
  isDarkTheme: string;
}

export const darkTheme: Module<DarkThemeState, RootState> = {
  namespaced: true,
  state: () => ({
    isDarkTheme: 'false',
  }),

  mutations: {
    getLocalStorageTheme(state) {
      state.isDarkTheme = localStorage.getItem('darkTheme')!;
    },
    changeTheme(state) {
      state.isDarkTheme = state.isDarkTheme === 'true' ? 'false' : 'true';
      localStorage.setItem('darkTheme', state.isDarkTheme);
    },
  },
};
