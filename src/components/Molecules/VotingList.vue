<template>
  <div class="vote-component">
    <!-- <h4>Vote! You have used {{voteList.length}} of your {{votesPerPerson}}</h4> -->
    <h4>You have {{votesPerPerson-voteList.length}} votes left to use</h4>
    <div style="height: 10px; z-index: 5">
      <div class="unused-spacer">
        <div v-for="n in votesPerPerson-voteList.length" :key="n">
          <div class="dot-image" />
        </div>
      </div>
    </div>
    <b-list-group class="vote-list-group">
      <b-list-group-item class="voting-option" v-for="(option, index) in optionList" :key="index">
        <div class="text-and-button">
          <div class="just-text">{{option}}</div>
          <div>
            <AddRemove :roomNumber="roomNumber" :option="option" :votesPerPerson="votesPerPerson" />
          </div>
        </div>
        <div class="spacer">
          <div v-for="(vote, index) in voteList.filter(op => op === option)" :key="index">
            <div class="dot-image" />
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
import CreatorTools from "./CreatorTools.vue";

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
  max-width: 90%;
}
.text-and-button {
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 110%;
}
.spacer {
  height: 20px;
  width: 100%;
  display: flex;
  position: absolute;
  bottom: 0px;
}
.dot-image {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: orange;
  border-width: 1px;
  border-color: #231651;
  border-style: solid;
  margin-top: 5px;
  margin-right: 5px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
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
h4 {
  font-size: 1.4rem;
}
.unused-spacer {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  left: 0;
  height: 10px
}
</style>