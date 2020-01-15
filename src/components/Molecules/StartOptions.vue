<template>
  <div>
    <b-tabs
      content-class="mt-3"
      align="center"
      active-nav-item-class="selected-tab"
      active-tab-class="active-tab"
    >
      <b-tab title="Join A Room" active>
        <b-form-input id="start-input" :value="roomNumber" placeholder="####" type="number" trim></b-form-input>
      </b-tab>
      <b-tab title="Start A Room">
        <div id="new-input-group">
          <b-form-group label="Vote Purpose:" label-for="input-1">
            <b-form-input
              id="purpose-input"
              v-model="form.RoomName"
              required
              placeholder="What are you voting on"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Votes Per Person:" label-for="input-3">
            <b-form-select
              id="votes-per-person-input"
              v-model="form.selectedVoteNumber"
              :options="voteNumbers"
              required
            ></b-form-select>
          </b-form-group>
        </div>
      </b-tab>
    </b-tabs>
    <button type="button" id="start-button">Join</button>
  </div>
</template>

<script>
export default {
  name: "StartOptions",

  data() {
    return {
      roomNumber: "",
      form: {
        RoomName: "",
        selectedVoteNumber: 5
      },
      voteNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      maxRoomNumberLength: 4
    };
  }
};
</script>

<style>
.nav-tabs {
  border: none !important;
}

#start-input::-webkit-input-placeholder {
  color: white;
} /* WebKit, Blink, Edge */
#start-input:-moz-placeholder {
  color: white;
} /* Mozilla Firefox 4 to 18 */
#start-input::-moz-placeholder {
  color: white;
} /* Mozilla Firefox 19+ */
#start-input:-ms-input-placeholder {
  color: white;
} /* Internet Explorer 10-11 */
#start-input::-ms-input-placeholder {
  color: white;
} /* Microsoft Edge */

.active-tab {
  display: flex !important;
  justify-content: center !important;
}

#start-input {
  width: 70%;
  background-color: rgb(179, 112, 30);
  color: rgb(95, 32, 2);
  border: none;
}
#start-input:focus {
  border: none;
}

.nav-link {
  color: #000a16 !important;
  background-color: transparent !important;
}
.selected-tab {
  border-bottom: rgb(92, 26, 1) !important;
  border-style: solid !important;
  border-width: 0px 0px 2px 0px !important;
}
#start-button {
  margin-top: 2rem;
  width: 6rem;
  height: 6rem;
  padding: 10px 16px;
  border-radius: 50%;
  font-size: 24px;
  line-height: 1.33;
  border-width: 0px;
  color: white;
  background-color: brown;
}
.d-block {
  text-align: left !important;
  color: #000a16 !important;
}

#purpose-input {
  background-color: rgb(179, 112, 30);
  color: rgb(95, 32, 2);
  border: none;
}
#purpose-input:focus {
  border: none;
}
#purpose-input::-webkit-input-placeholder {
  color: white;
} /* WebKit, Blink, Edge */
#purpose-input:-moz-placeholder {
  color: white;
} /* Mozilla Firefox 4 to 18 */
#purpose-input::-moz-placeholder {
  color: white;
} /* Mozilla Firefox 19+ */
#purpose-input:-ms-input-placeholder {
  color: white;
} /* Internet Explorer 10-11 */
#purpose-input::-ms-input-placeholder {
  color: white;
} /* Microsoft Edge */

#votes-per-person-input {
  background-color: rgb(179, 112, 30);
  color: rgb(95, 32, 2);
  border: none;
}
#purpose-input:focus {
  border: none;
}
</style>
