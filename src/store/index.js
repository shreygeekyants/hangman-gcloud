import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    score: 0,
  },
  mutations: {
    updateScoreCard(state, payload) {
      state.score = state.score + payload;
    },
    clearScoreCard(state) {
      state.score = 0;
    },
  },
  actions: {
    updateScore({ commit }, value) {
      commit('updateScoreCard', value);
    },
    clearScore({ commit }) {
      commit('clearScoreCard');
    },
  },
  modules: {},
  plugins: [vuexLocalStorage.plugin],
});
