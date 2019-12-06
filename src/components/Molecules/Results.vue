<template>
  <div class="result-component">
    <h4>Vote Totals</h4>
    <b-list-group>
      <b-list-group-item class="voting-option" v-for="(result, index) in resultsList" :key="index">
        <div class="name-holder">{{result.name}}</div>
        <div class="result-holder">
          <img class="gold" v-if="index===0" src="../../assets/gold.svg" alt="Gold" />
          <img class="silver" v-if="index===1" src="../../assets/silver.svg" alt="Silver" />
          <img class="bronze" v-if="index===2" src="../../assets/bronze.svg" alt="Bronze" />
          {{result.count}}
        </div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import io from "socket.io-client";
import { api_url, backend_port } from "../../config";

export default {
  name: "Results",
  data() {
    return {
      socket: io(`${api_url}:${backend_port}`)
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
img {
  height: 1.3rem;
  width: 1.3rem;
}
.result-holder {
  width: 35px;
  display: block;
  text-align: right;
}
.name-holder {
  max-width: calc(100% - 35px);
}
.result-component {
  height: 100%;
  overflow-y: scroll;
  white-space: normal;
}
.result-component::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
}
.result-component::-webkit-scrollbar-thumb {
  background-color: rgb(35, 22, 81);
}
</style>