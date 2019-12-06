<template>
  <div class="NewRoom">
    <NavBar />
    <!-- <HomeButton /> -->
    <b-card title="Create New Room" id="cardNew">
      <b-form @submit="onSubmit" v-if="show">
        <div class="form-inputs">
          <b-form-group id="input-group-1" label="Vote Purpose:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.RoomName"
              required
              placeholder="What are you voting on"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.UserName" required placeholder="Name:"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Votes Per Person:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="form.selectedVoteNumber"
              :options="voteNumbers"
              required
            ></b-form-select>
          </b-form-group>
          <b-button id="submit-button" type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
// import HomeButton from "../components/atoms/HomeButton.vue";
import { api_url, backend_port } from "../config";
import NavBar from "../components/atoms/NavBar.vue";

export default {
  name: "NewRoom",
  data() {
    return {
      form: {
        RoomName: "",
        UserName: "",
        selectedVoteNumber: 3
      },
      voteNumbers: [1, 2, 3, 4, 5, 6, 7],
      show: true
    };
  },
  components: {
    // HomeButton,
    NavBar
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post(`http://${api_url}:${backend_port}/NewRoom/`, this.form)
        .then(res => {
          this.setRoomInfo(res.data.roomNumber, res.data.adminName);
          this.$router.push({ name: "Room" });
        });
    },
    setRoomInfo(roomNumber, adminName) {
      this.$store.commit("setOwnVotes", []);
      this.$store.commit("setRoom", roomNumber);
      this.$store.commit("setUserName", adminName);
    }
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
.NewRoom {
  top: 3em;
  position: absolute;
  height: calc(100vh - 3em);
  width: 100%;
}
#submit-button {
  background-color: rgb(35, 22, 81);
  border-width: 0px;
}
</style>
