<template>
  <div>
    <b-list-group>
      <b-list-group-item class="voting-option" v-for="(result, index) in resultsList" :key="index">
        {{result.name}}
        <div>Vote Total: {{result.count}}</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Results",
  data() {
    return {
      socket: io("localhost:3000")
    };
  },
  props: ["resultsList"]
};
</script>

<style scoped>
.voting-option {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
</style>