<template>
  <div class="option-info">
    <div class="option-input">
      {{roomName}}
      <b-form @submit="onSubmit">
        <b-form-group :state="optionState" invalid-feedback="Cannot be blank">
          <b-form-input
            ref="newInput"
            id="option-input"
            v-model="newOption"
            :state="optionState"
            required
          ></b-form-input>
        </b-form-group>
        <b-button id="add-option" type="submit" variant="primary">ADD OPTION</b-button>
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
          <li class="each-option" v-for="(option, index) in optionList" :key="index">
            <div v-if="adminName===userName" class="close-button-holder">
              <img
                @click="removeModal(option)"
                src="../../assets/X3.svg"
                alt="remove option"
              />
            </div>
            {{ option }}
          </li>
        </ul>
      </div>
    </div>
    <creator-tools
      v-if="userName==adminName"
      :roomStatus="roomStatus"
      :roomNumber="roomNumber"
      :totalVotes="totalVotes"
      :expectedVotes="expectedVotes"
      :optionList="optionList"
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
      socket: io(`${api_url}${backend_port}`)
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
      this.$refs.newInput.focus();
    },
    removeModal(option) {
      const { roomNumber } = this;
      this.$bvModal
        .msgBoxConfirm(`Are you sure you want to remove option: "${option}". Only room creators can do this.`, {
          title: "Confirm",
          size: "sm",
          buttonSize: "sm",
          cancelTitle: "Keep",
          okTitle: "Remove",
          headerClass: "p-2 border-bottom-0",
          footerClass: "p-2 border-top-0",
          centered: true
        })
        .then(value => {
          if (value) {
            this.socket.emit("REMOVE_OPTION", {
              roomNumber,
              option
            });
          }
        });
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
    margin-top: .5em;
  }
}
#add-option {
  color: #0d2c54;
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
  overflow-y: scroll;
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
  font-size: 21px;
  padding-left: 10px;
}
.option-span {
  text-align: left;
  font-size: 130%;
  margin-top: 3em;
}
.option-list-holder::-webkit-scrollbar {
  width: 0.3em;
  background-color: transparent;
}
.option-list-holder::-webkit-scrollbar-thumb {
  background-color: #0d2c54;
}
.each-option {
  display: flex;
  padding-top: 20px;
}
.close-button-holder {
  width: 40px;
}
</style>