<template>
  <div>
    <p>Your are the room creator so you choose when to start the voting</p>
    <b-button size="lg" @click="startVoting">Start the voting</b-button>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "CreatorTools",
  props: ["roomNumber"],
  data() {
    return {
      socket: io("localhost:3000")
    };
  },
  methods: {
    startVoting() {
      const { roomNumber } = this;
      this.socket.emit("ADVANCE_ROOM", { roomNumber });
    }
  }
};
</script>

<style scoped>
</style>