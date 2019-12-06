<template>
  <div class="option-info">
    <div class="option-input">
      {{roomName}}
      <b-form @submit="onSubmit">
        <b-form-group
          :state="optionState"
          invalid-feedback="Cannot be blank"
        >
          <b-form-input id="option-input" v-model="newOption" :state="optionState" required></b-form-input>
        </b-form-group>
        <b-button id="add-option" type="submit" variant="primary">ADD OPTIONS</b-button>
      </b-form>
    </div>
    <!-- <div class="option-input">
      <b-list-group>
        <b-list-group-item v-for="(option, index) in optionList" :key="index">{{option}}</b-list-group-item>
      </b-list-group>
    </div>-->
    <div class="option-span">Dot Vote Options:</div>
    <div class="flex-holder">
      <div class="option-list-holder">
        <ul class="option-list">
          <li v-for="(option, index) in optionList" :key="index">{{ option }}</li>
        </ul>
      </div>
    </div>
    <creator-tools
      v-if="userName==adminName"
      :roomStatus="roomStatus"
      :roomNumber="roomNumber"
      :totalVotes="totalVotes"
      :expectedVotes="expectedVotes"
    />
  </div>
</template>

<script>
import io from "socket.io-client";
import { api_url, backend_port } from "../../config";
import CreatorTools from "./CreatorTools.vue";

export default {
  name: "OptionsInputs",
  data() {
    return {
      newOption: "",
      optionState: null,
      socket: io(`${api_url}:${backend_port}`)
    };
  },
  props: [
    "adminName",
    "userName",
    "roomNumber",
    "optionList",
    "totalVotes",
    "roomStatus",
    "expectedVotes",
    "roomName"
  ],
  components: {
    CreatorTools
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.newOption.length === 0) {
        this.optionState = false;
        return;
      }
      const { roomNumber, newOption } = this;
      this.socket.emit("ADD_OPTION", {
        roomNumber,
        newOption
      });
      this.newOption = "";
    }
  }
};
</script>

<style scoped>
.form-inputs {
  text-align: left;
}
.form-inputs {
  padding: 1.7rem;
}
.option-info {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  flex-direction: column;
  flex-flow: column;
}
.room-subtitle {
  padding-bottom: 2rem;
}
.d-block {
  font-weight: 700;
}
@media (max-width: 500px) {
  .option-input {
    margin-top: 1em;
  }
}
#add-option {
  color: rgb(35, 22, 81);
  background-color: white;
  border-width: 0px;
  font-weight: 700;
  position: absolute;
  right: 2em;
  margin-top: 0.5em;
}
.form-group {
  margin: 0px;
  text-align: left;
}
.option-list-holder {
  height: 100%;
  overflow: scroll;
  white-space: normal;
}
.flex-holder {
  flex: 1;
  min-height: 250px;
}
.option-list {
  list-style-type: none;
  display: block;
  text-align: left;
  font-size: 18px;
}
.option-span {
  text-align: left;
  font-size: 110%;
  margin-top: 3em;
}
.option-list-holder::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
}
.option-list-holder::-webkit-scrollbar-thumb {
  background-color: rgb(35, 22, 81);
}
</style>