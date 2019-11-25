<template>
  <div>
    <h4>Vote! You have used {{voteList.length}} of your {{votesPerPerson}}</h4>
    <b-list-group>
      <b-list-group-item class="voting-option" v-for="(option, index) in optionList" :key="index">
        {{option}}
        <div>
          <b-badge
            pill
            v-if="voteList.filter(op => op === option).length"
            class="voting-badge"
          >{{voteList.filter(op => op === option).length}}</b-badge>
          <b-button
            :disabled="voteList.length >= votesPerPerson"
            class="voting-button"
            @click="vote(option)"
          >Vote</b-button>
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters } from "vuex";

export default {
  name: "VotingList",
  data() {
    return {
      socket: io("localhost:3000"),
      voteList: []
    };
  },
  props: ["optionList", "roomNumber", "votesPerPerson"],
  computed: {
    ...mapGetters({
      UUID: "getUUID"
    })
  },
  methods: {
    vote(option) {
      const { roomNumber, UUID } = this;
      this.socket.emit("ADD_VOTE", { roomNumber, option, UUID });
    }
  },
  mounted() {
    this.socket.on("UPDATE_OWN_VOTES", data => {
      this.voteList = data;
    });
  }
};
</script>

<style scoped>
.voting-option {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.voting-button {
  background-color: blue;
}
.voting-button:hover {
  background-color: black;
}
.voting-badge {
  color: blue;
  background-color: aliceblue;
  margin-right: 2rem;
}
</style>