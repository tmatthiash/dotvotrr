<template>
  <div>
    <div v-if="roomStatus===RoomStatuses.addingOptions">
      <p>Your are the room creator so you choose when to start the voting</p>
      <b-button size="lg" variant="primary" @click="advanceVoting">Start the voting</b-button>
    </div>
    <div v-if="roomStatus===RoomStatuses.dotVoting">
      <p>Your are the room creator so you choose when voting ends</p>
      <p>{{totalVotes}} votes recorded out of expected {{expectedVotes}}</p>
      <b-button size="lg" variant="primary" @click="advanceVoting">Show Results!</b-button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import RoomStatuses from "../../../enums";
import { api_url, backend_port } from "../../config";

export default {
  name: "CreatorTools",
  props: ["roomNumber", "roomStatus", "totalVotes", "expectedVotes"],
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
</style>