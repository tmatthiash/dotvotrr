<template>
  <div class="addRemover">
    <b-button
      :disabled="ownVotes.filter(ov => ov === option).length ===0"
      @click="removeVote"
      id="minusButtons"
      size="sm"
    >
      <div class="minusSymbol">-</div>
    </b-button>
    <span class="spanPadding">
      <b-badge pill id="voting-badge">{{ownVotes.filter(op => op === option).length}}</b-badge>
    </span>
    <b-button
      :disabled="ownVotes.length >= votesPerPerson"
      @click="addVote"
      id="addButtons"
      size="sm"
    >
      <div class="addSymbol">+</div>
    </b-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import io from "socket.io-client";
import { api_url, backend_port } from "../../config";

export default {
  name: "AddRemove",
  props: ["roomNumber", "option", "votesPerPerson"],
  data() {
    return {
      socket: io(`${api_url}:${backend_port}`)
    };
  },
  computed: {
    ...mapGetters({
      UUID: "getUUID",
      ownVotes: "getOwnVotes"
    })
  },
  methods: {
    addVote() {
      const { roomNumber, UUID, option } = this;
      const addingVote = true;
      this.socket.emit("CHANGE_VOTE", { roomNumber, option, UUID, addingVote });
      this.$store.commit("addOwnVote", option);
    },
    removeVote() {
      const { roomNumber, UUID, option } = this;
      const addingVote = false;
      this.socket.emit("CHANGE_VOTE", { roomNumber, option, UUID, addingVote });
      this.$store.commit("removeOwnVote", option);
    }
  }
};
</script>


<style>
.addRemover {
  width: 95px;
  height: 30px;
}
.spanPadding {
  width: 10px;
}

#voting-badge {
  background-color: rgb(35, 22, 81);
}

.minusSymbol {
  position: inherit;
  margin-top: -9px;
}

.addSymbol {
  position: inherit;
  margin-top: -3px;
}

#minusButtons {
  font-size: 30px;
  background-color: transparent;
  color: #231651;
  border: none;
  padding: 0px;
  height: 30px;
  width: 30px;
  margin-right: 5px;
}
#minusButtons:disabled {
  color:transparent;
}

#addButtons {
  font-size: 24px;
  background-color: transparent;
  color: rgb(35, 22, 81);
  border: none;
  padding: 0px;
  height: 30px;
  width: 30px;
  margin-left: 5px;
}

#addButtons:disabled {
  color:transparent;
}
</style>