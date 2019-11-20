<template>
  <b-modal
    id="modal-1"
    v-model="isModalOpen"
    @ok="handleOk"
    @cancel="handleCancel"
    @close="handleCancel"
    no-close-on-backdrop
    title="Join Existing Room"
  >
    <!-- <b-modal id="modal-1" @ok="handleOk" title="Join Existing Room Room"> -->
    <form ref="form" @submit.stop.prevent="handleSubmit">
      <b-form-group
        :state="nameState"
        label="Name"
        label-for="name-input"
        invalid-feedback="Name is required"
      >
        <b-form-input id="name-input" v-model="userName" :state="nameState" required></b-form-input>
      </b-form-group>
      <b-form-group
        :state="roomNumberState"
        label="Room Number"
        label-for="room-number-input"
        invalid-feedback="Room numbers are 4 digit numbers"
      >
        <b-form-input
          id="room-number-input"
          v-model="roomNumber"
          :state="roomNumberState"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
import axios from "axios";

export default {
  name: "JoinModal",
  data() {
    return {
      userName: "",
      nameState: null,
      roomNumber: "",
      roomNumberState: null
    };
  },
  props: ["modalShow", "closeModal"],
  computed: {
    isModalOpen() {
      return this.modalShow;
    }
  },
  methods: {
    checkFormValidity() {      
      this.nameState = this.userName.length !== 0 ? true : false;
      this.roomNumberState = this.roomNumber.length === 4 ? true : false;
      const valid = (this.nameState && this.roomNumberState);
      return valid;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      axios
        .get(`http://localhost:3000/roomNumber/${this.roomNumber}`)
        .then(res => {
          console.log("loaded existing room");
          console.log(res.data);
        });

      this.closeModal();
    },
    handleCancel(evt) {
      evt.preventDefault();
      this.closeModal();
    }
  }
};
</script>


<style scoped>
</style>