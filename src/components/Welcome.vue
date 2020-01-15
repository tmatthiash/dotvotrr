<template>
  <div class="hello">
    <div style="height: 3em;" />
    <h1 id="dot-label">Dot</h1>
    <h1>Votrr</h1>
    <h4>A bettrr way to make decisions as a group</h4>
    <StartOptions />
    <!-- <b-row>
      <b-col lg="6" class="pb-2">
        <router-link to="/NewRoom">
          <b-button size="lg">Start A New Vote</b-button>
        </router-link>
      </b-col>
      <b-col lg="6" class="pb-2">
        <b-button size="lg" @click="openModal">Join An Existing Vote</b-button>
      </b-col>
    </b-row>
    <JoinModal v-bind:modalShow="isModalOpen" v-bind:closeModal="closeModal" />-->
  </div>
</template>

<script>
import StartOptions from "../components/Molecules/StartOptions";

export default {
  name: "Welcome",
  data() {
    return {
      isModalOpen: false
    };
  },
  components: {
    StartOptions
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
      // this.$refs.joinModal.show()
      // this.$refs['joinModal'].show()
    },
    closeModal() {
      this.isModalOpen = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 6rem;
  text-align: left;
  padding-left: 3rem;
  color: #000a16;
}
#dot-label {
  margin-left: -0.5rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.btn-lg {
  background-color: #0d2c54;
  color: white;
  border: none;
  min-width: 220px;
  margin-top: 1em;
}
.btn-lg:hover {
  background-color: #322074;
  color: white;
}
@media (orientation: landscape) and (max-height: 500px) {
  .row {
    background-color: orange;
  }
}
h4 {
  font-size: 1.2rem;
    color: #000a16;

}
</style>