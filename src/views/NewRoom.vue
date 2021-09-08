<template>
  <div class="NewRoom" :style="`height: ${innerHeight}px`">
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
          <b-button
            id="submit-button"
            :disabled="isSubmitDisabled"
            type="submit"
            variant="primary"
          >Submit</b-button>
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
        selectedVoteNumber: 5
      },
      voteNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      show: true,
      innerHeight: document.documentElement.clientHeight,
      isSubmitDisabled: false
    };
  },
  components: {
    // HomeButton,
    NavBar
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.isSubmitDisabled = true;
      setTimeout(() => {
        this.isSubmitDisabled = false;
      }, 375);
      document.getElementById("input-1").blur();
      document.getElementById("input-2").blur();
      setTimeout(() => {
        axios
          .post(`${api_url}:${backend_port}/NewRoom/`, this.form)
          .then(res => {
            this.setRoomInfo(res.data.roomNumber, res.data.adminName);
            this.$router.push({ name: "Room" });
          });
      }, 400);
    },
    setRoomInfo(roomNumber, adminName) {
      this.$store.commit("setOwnVotes", []);
      this.$store.commit("setRoom", roomNumber);
      this.$store.commit("setUserName", adminName);
    },
    setHeight() {
      if (
        !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        this.innerHeight = document.documentElement.clientHeight;
      }
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.setHeight);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setHeight);
  }

  // mounted(){
  //   console.log(window.innerHeight)
  // }
};
</script>

<style>
#cardNew {
  top: 3em;
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
  position: absolute;
  /* height: 100%; */
  width: 100%;
}
#submit-button {
  background-color: #0d2c54;
  border-width: 0px;
}
#submit-button:hover {
  background-color: #322074;
}
</style>
