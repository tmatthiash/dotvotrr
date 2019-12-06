<template>
  <div class="vote-component">
    <h4>Vote! You have used {{voteList.length}} of your {{votesPerPerson}}</h4>
    <b-list-group class="vote-list-group">
      <b-list-group-item class="voting-option" v-for="(option, index) in optionList" :key="index">
        <div class="text-and-button">
          <div class="just-text">{{option}}</div>
          <div>
            <!-- <b-badge
              pill
              v-if="voteList.filter(op => op === option).length"
              class="voting-badge"
            >{{voteList.filter(op => op === option).length}}</b-badge>-->
            <!-- <b-button
              :disabled="voteList.length >= votesPerPerson"
              class="voting-button"
              @click="vote(option)"
            >Vote</b-button>-->
            <AddRemove :roomNumber="roomNumber" :option="option" :votesPerPerson="votesPerPerson" />
          </div>
        </div>
        <div class="spacer">
          <div v-for="(vote, index) in voteList.filter(op => op === option)" :key="index">
            <img class="vote-svg" src="../../assets/circle.svg" alt="Vote" />
          </div>
        </div>
      </b-list-group-item>
    </b-list-group>
    <creator-tools
      v-if="userName===adminName"
      :roomNumber="roomNumber"
      :roomStatus="roomStatus"
      :totalVotes="totalVotes"
      :expectedVotes="expectedVotes"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
import { api_url, backend_port } from "../../config";
import AddRemove from "../atoms/AddRemove.vue";
import { mapGetters } from "vuex";
import CreatorTools from "./CreatorTools.vue"

export default {
  name: "VotingList",
  computed: {
    ...mapGetters({
      voteList: "getOwnVotes"
    })
  },
  data() {
    return {
      socket: io(`${api_url}:${backend_port}`)
    };
  },
  components: {
    AddRemove,
    CreatorTools
  },
  methods: {},
  props: [
    "optionList",
    "roomNumber",
    "votesPerPerson",
    "roomStatus",
    "totalVotes",
    "expectedVotes",
    "userName",
    "adminName"
  ]
};
</script>

<style scoped>
.voting-option {
  padding-right: 0px;
  display: block;
  border: none;
  max-width: 90%
}
.text-and-button {
  justify-content: space-between;
  align-items: center;
  display: flex;
}
.voting-button {
  background-color: blue;
}
.voting-button:hover {
  background-color: blue;
}
.voting-badge {
  color: blue;
  background-color: aliceblue;
  margin-right: 2rem;
}
.spacer {
  height: 20px;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0px;
}
.vote-svg {
  height: 10px;
  width: 10px;
  margin-right: 5px;
}
.just-text {
  max-width: calc(100% - 95px);
}
.vote-list-group {
  height: 100%;
  overflow: scroll;
}
.vote-component {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.vote-list-group::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
}
.vote-list-group::-webkit-scrollbar-thumb {
  background-color: rgb(35, 22, 81);
}
</style>