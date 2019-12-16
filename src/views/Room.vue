<template>
  <div class="Room" :style="`height: ${innerHeight}px`">
    <Navbar />
    <b-card id="roomCard">
      <div class="topStuffHolder">
        <div>
          <H4>
            Room Numbrr:
            <br />
            {{roomNumber}}
          </H4>
          <div
            v-if="roomStatus===RoomStatuses.dotVoting"
            class="room-subtitle"
          >{{userName}}, vote on options for: {{roomName}}</div>
          <div
            v-if="roomStatus===RoomStatuses.results"
            class="room-subtitle"
          >Results for {{roomName}}!</div>
        </div>
      </div>
      <div v-if="roomStatus===RoomStatuses.addingOptions" class="room-option-inputs">
        <OptionsInputs
          :adminName="adminName"
          :userName="userName"
          :roomNumber="roomNumber"
          :optionList="optionList"
          :roomStatus="roomStatus"
          :totalVotes="totalVotes"
          :expectedVotes="(userCount*votesPerPerson)"
          :roomName="roomName"
        />
      </div>
      <div v-if="roomStatus===RoomStatuses.dotVoting" class="vote-list-holder">
        <VotingList
          :adminName="adminName"
          :userName="userName"
          :roomNumber="roomNumber"
          :optionList="optionList"
          :votesPerPerson="votesPerPerson"
          :roomStatus="roomStatus"
          :totalVotes="totalVotes"
          :expectedVotes="(userCount*votesPerPerson)"
        />
      </div>
      <div v-if="roomStatus===RoomStatuses.results" style="height: calc(100% - 105px);">
        <Results :resultsList="resultList" />
      </div>
    </b-card>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters } from "vuex";
import io from "socket.io-client";
import OptionsInputs from "../components/Molecules/OptionsInputs.vue";
import RoomStatuses from "../../enums";
import VotingList from "../components/Molecules/VotingList.vue";
import Results from "../components/Molecules/Results.vue";
import { api_url, backend_port } from "../config";
import Navbar from "../components/atoms/NavBar.vue";

export default {
  name: "Room",
  computed: {
    ...mapGetters({
      roomNumber: "getRoomNumber",
      userName: "getUserName",
      UUID: "getUUID",
      optionList: "getOptionList",
      resultList: "getResultList"
    }),
    RoomStatuses() {
      return RoomStatuses.RoomStatuses;
    }
  },
  data() {
    return {
      roomName: "",
      socket: io(`${api_url}:${backend_port}`),
      roomStatus: null,
      votesPerPerson: 3,
      adminName: "",
      newUUID: null,
      totalVotes: 0,
      userCount: 1,
      innerHeight: document.documentElement.clientHeight
    };
  },
  components: {
    OptionsInputs,
    VotingList,
    Results,
    Navbar
  },
  methods: {
    getRoomInfo() {
      axios
        .get(`http://${api_url}:${backend_port}/NewRoom/${this.roomNumber}`)
        .then(res => {
          this.roomName = res.data.RoomName;
          this.roomStatus = res.data.roomStatus;
          this.adminName = res.data.adminName;
          this.votesPerPerson = res.data.votesPerPerson;
        });
    },
    createUUID() {
      this.newUUID = Math.random().toString(24) + new Date();
      this.$store.commit("setUUID", this.newUUID);
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
    this.getRoomInfo();
    let effectiveUUID;
    if (!this.UUID) {
      this.createUUID();
      effectiveUUID = this.newUUID;
    } else {
      effectiveUUID = this.UUID;
    }
    const { roomNumber, userName } = this;
    this.socket.emit("join", { roomNumber, userName, effectiveUUID });
    this.socket.on("UPDATED_OPTIONS", data => {
      this.$store.commit("setOptionList", data);
    });
    this.socket.on("SET_ROOM_STATUS", data => {
      this.roomStatus = data;
    });
    this.socket.on("FORCE_NAME_CHANGE", data => {
      this.$store.commit("setUserName", data);
    });
    this.socket.on("UPDATE_TOTAL_VOTES", data => {
      this.totalVotes = data;
    });
    this.socket.on("UPDATED_USER_COUNT", data => {
      this.userCount = data;
    });
    this.socket.on("UPDATE_RESULTS", data => {
      this.$store.commit("setResultList", data);
    });
    this.$nextTick(function() {
      window.addEventListener("resize", this.setHeight);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setHeight);
  }
};
</script>

<style scoped>
#roomCard {
  top: 3em;
  border-color: black;
  border-width: 2px;
  border-radius: 0.25rem;
  height: calc(100% - 3em - 80px);
  margin: 40px;
}
@media (max-width: 500px) {
  #roomCard {
    height: calc(100% - 3em - 20px);
    margin: 10px;
  }
}
.topStuffHolder {
  padding-bottom: 15px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  border-bottom: 2px solid #ccc9c9;
  margin-bottom: 15px;
}
.topStuffHolder > div {
  flex-grow: 1;
}
.Room {
  position: absolute;
  /* height: 100%; */
  width: 100%;
  min-height: 620px;
}
.room-option-inputs {
  height: calc(100% - 81px - 0.5em);
}
.card-body {
  display: flex;
  flex-flow: column;
  height: 100%;
  padding-bottom: 0.75em;
}
.vote-list-holder {
  height: calc(100% - 120px - 1em);
}
</style>
