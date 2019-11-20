import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    roomNumber: null,
    userName: null
  },
  mutations: {
    setRoom(state, payload) {
      state.roomNumber = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    }
  },
  actions: {},
  modules: {},
  getters: {
    getRoomNumber: state => {
      return state.roomNumber;
    },
    getUserName: state => {
      return state.userName;
    }
  },
  plugins: [vuexLocal.plugin]
});
