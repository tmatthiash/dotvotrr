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
    userName: null,
    UUID: null
  },
  mutations: {
    setRoom(state, payload) {
      state.roomNumber = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUUID(state, payload) {
      state.UUID = payload;
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
    },
    getUUID: state => {
      return state.UUID;
    }
  },
  plugins: [vuexLocal.plugin]
});
