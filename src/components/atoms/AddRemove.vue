<template>
  <div class="addRemover">
    <button
      class="doubleButton"
      @click="removeVote"
      :disabled="ownVotes.filter(ov => ov === option).length ===0"
    />
    <b-button
      :disabled="ownVotes.filter(ov => ov === option).length ===0"
      id="minusButtons"
      size="sm"
    >
      <div class="minusSymbol">-</div>
    </b-button>
    <span class="spanPadding">
      <b-badge pill id="voting-badge">{{ownVotes.filter(op => op === option).length}}</b-badge>
    </span>
    <button
      class="doubleButton"
      @click="addVote"
      :disabled="ownVotes.length >= votesPerPerson"
    />
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
  width: 105px;
  height: 30px;
}
.spanPadding {
  width: 10px;
}

#voting-badge {
  background-color: transparent;
  color: rgb(35, 22, 81);
}

.minusSymbol {
  position: inherit;
  margin-top: -11px;
}

.addSymbol {
  position: inherit;
  margin-top: -4px;
}

.doubleButton {
  position: absolute;
  background-color: transparent;
  color: transparent;
  height: 30px;
  width: 30px;
  border: none;
  z-index: 200;
}
.doubleButton:focus {
  outline: none;
}

#minusButtons {
  font-size: 30px;
  background-color: transparent;
  color: white;
  border-color: #231651;
  background-color: #231651;
  border-radius: 50%;
  padding: 0px;
  height: 30px;
  width: 30px;
  z-index: 100;
}
#minusButtons:disabled {
  background-color: gray;
  border-color: gray;
}

#addButtons {
  font-size: 24px;
  background-color: transparent;
  color: white;
  border-color: #231651;
  background-color: #231651;
  border-radius: 50%;
  padding: 0px;
  height: 30px;
  width: 30px;
}

#addButtons:disabled {
  background-color: gray;
  border-color: gray;
}
</style>