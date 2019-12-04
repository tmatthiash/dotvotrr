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
    UUID: null,
    optionList: [],
    ownVotes: [],
    resultList: []
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
    },
    setOptionList(state, payload) {
      state.optionList = payload;
    },
    setResultList(state, payload) {
      state.resultList = payload;
    },
    setOwnVotes(state, payload) {
      state.ownVotes = payload;
    },
    addOwnVote(state, payload) {
      state.ownVotes = [...state.ownVotes, payload];
    },
    removeOwnVote(state, payload) {
      const index = state.ownVotes.indexOf(payload);
      if (index !== -1) state.ownVotes.splice(index, 1);
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
    },
    getOptionList: state => {
      return state.optionList;
    },
    getResultList: state => {
      return state.resultList;
    },
    getOwnVotes: state => {
      return state.ownVotes;
    }
  },
  plugins: [vuexLocal.plugin]
});
