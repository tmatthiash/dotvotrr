<template>
  <div class="Room">
    <b-card :title="`Room Number: ${roomNumber}`" id="cardNew">
      <div class="room-subtitle">Hi {{userName}}, add options for: {{roomName}}</div>
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
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import io from "socket.io-client";

export default {
  name: "Room",
  computed: {
    ...mapGetters({
      roomNumber: "getRoomNumber",
      userName: "getUserName"
    })
  },
  data() {
    return {
      roomName: "",
      newOption: "",
      optionState: null,
      optionList: [],
      socket: io("localhost:3000")
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.newOption.length === 0) {
        this.optionState = false;
        return;
      }
      console.log('submitting')
      const { roomNumber, newOption } = this;
      // axios.post("http://localhost:3000/options/add/", { roomNumber, newOption }).then(res => {
      //   console.log(res.data);
      // });
      this.socket.emit("ADD_OPTION", {
        roomNumber,
        newOption
      });
    },
    getRoomInfo() {
      console.log("room ", this.getRoomNumber);
      axios
        .get(`http://localhost:3000/NewRoom/${this.roomNumber}`)
        .then(res => {
          console.log("loaded existing room");
          console.log(res.data);
          this.roomName = res.data.RoomName;
        });
    }
  },
  mounted() {
    this.getRoomInfo();
    this.socket.emit("join", this.roomNumber);
    this.socket.on("UPDATED_OPTIONS", data => {
      this.optionList = data;
    });
  }
};
</script>

<style>
#cardNew {
  margin: 40px;
  border-color: black;

  border-width: 2px;
  border-radius: 0.25rem;
}
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
  width: 40%;
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
</style>
