<template>
  <div class="Room">
    <HomeButton />
    <b-card id="cardNew">
      <div class="topStuffHolder">
        <div>
          <H4>Room Number: {{roomNumber}}</H4>
          <div            
            class="room-subtitle"
          >Hi {{userName}}, add options for: {{roomName}}</div>
        </div>
        <creator-tools v-if="adminName===userName" :roomNumber="roomNumber" />
      </div>
      <div v-if="roomStatus===RoomStatuses.addingOptions">
        <OptionsInputs :roomNumber="roomNumber" :optionList="optionList" />
      </div>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import io from "socket.io-client";
import HomeButton from "../components/atoms/HomeButton.vue";
import OptionsInputs from "../components/Molecules/OptionsInputs.vue";
import RoomStatuses from "../../enums";
import CreatorTools from "../components/Molecules/CreatorTools.vue";

export default {
  name: "Room",
  computed: {
    ...mapGetters({
      roomNumber: "getRoomNumber",
      userName: "getUserName"
    }),
    RoomStatuses() {
      return RoomStatuses.RoomStatuses;
    }
  },
  data() {
    return {
      roomName: "",
      socket: io("localhost:3000"),
      optionList: [],
      roomStatus: null,
      adminName: ""
    };
  },
  components: {
    OptionsInputs,
    HomeButton,
    CreatorTools
  },
  methods: {
    getRoomInfo() {
      console.log("room ", this.getRoomNumber);
      axios
        .get(`http://localhost:3000/NewRoom/${this.roomNumber}`)
        .then(res => {
          console.log("loaded existing room");
          console.log(res.data);
          this.roomName = res.data.RoomName;
          this.roomStatus = res.data.roomStatus;
          this.adminName = res.data.adminName;
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
.topStuffHolder {
  padding-bottom: 15px;
  display: flex;
  flex-grow: 1;
  border-bottom: 2px solid #ccc9c9;
  margin-bottom: 15px;
}
.topStuffHolder > div{

  flex-grow: 1;
}
</style>
