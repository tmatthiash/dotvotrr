<template>
  <div class="option-info">
    <div class="option-input">
      <b-form @submit="onSubmit">
        <b-form-group
          :state="optionState"
          label="Add an option"
          label-for="option-input"
          invalid-feedback="Cannot be blank"
        >
          <b-form-input id="option-input" v-model="newOption" :state="optionState" required></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
    </div>
    <div class="option-input">
      <div class="option-title">{{optionList.length}} Options added so far</div>
      <b-list-group>
        <b-list-group-item v-for="(option, index) in optionList" :key="index">{{option}}</b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "OptionsInputs",
  data() {
    return {
      newOption: "",
      optionState: null,
      socket: io("localhost:3000")
    };
  },
  props: ["roomNumber", "optionList"],
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.newOption.length === 0) {
        this.optionState = false;
        return;
      }
      const { roomNumber, newOption } = this;
      // axios.post("http://localhost:3000/options/add/", { roomNumber, newOption }).then(res => {
      //   console.log(res.data);
      // });
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
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
.option-input {
  margin-left: 1em;
  margin-right: 1em;
  width: 100%;
  min-width: 150px;
}
.room-subtitle {
  padding-bottom: 2rem;
}
.option-title {
  padding-bottom: 1rem;
  font-weight: 700;
}
.d-block {
  font-weight: 700;
}
@media (max-width: 400px) {
    .option-info {
    flex-wrap: wrap-reverse;
  }
  .option-input {
    margin-top:1em;
  }
}
</style>