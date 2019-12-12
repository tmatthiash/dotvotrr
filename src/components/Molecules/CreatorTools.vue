<template>
  <div class="creator-tools">
    <div v-if="roomStatus===RoomStatuses.addingOptions">
      <b-button id="start-vote" size="md" variant="primary" :disabled="optionList.length < 2" @click="advanceVoting">Start the voting</b-button>
    </div>
    <div v-if="roomStatus===RoomStatuses.dotVoting">
      <p>{{totalVotes}} votes recorded out of expected {{expectedVotes}}</p>
      <b-button id="finish-vote" size="md" variant="primary" @click="advanceVoting">Show Results!</b-button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import RoomStatuses from "../../../enums";
import { api_url, backend_port } from "../../config";

export default {
  name: "CreatorTools",
  props: ["roomNumber", "roomStatus", "totalVotes", "expectedVotes", "optionList"],
  computed: {
    RoomStatuses() {
      return RoomStatuses.RoomStatuses;
    }
  },
  data() {
    return {
      socket: io(`${api_url}:${backend_port}`)
    };
  },

  methods: {
    advanceVoting() {
      const { roomNumber } = this;
      this.socket.emit("ADVANCE_ROOM", { roomNumber });
    }
  }
};
</script>

<style scoped>
.creator-tools {
  margin-bottom: -10px;
  width: 100%;
  left: 0px;
  justify-content: center;
}
#start-vote {
  background-color: rgb(35, 22, 81);
  border-width: 0px;
}
#finish-vote {
  background-color: rgb(35, 22, 81);
  border-width: 0px;
}
p {
  margin: 0px;
}
</style>