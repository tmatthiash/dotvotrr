<template>
  <div class="NewRoom">
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
          <b-button type="submit" variant="primary">Submit</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

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
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios.post("http://localhost:3000/NewRoom/", this.form).then(res => {
        console.log(res.data);
        this.setRoomInfo(res.data.roomNumber, res.data.adminName);
        this.$router.push({ name: "Room" });
      });
    },
    setRoomInfo(roomNumber, adminName) {
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
</style>
