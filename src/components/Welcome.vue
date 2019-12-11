<template>
  <div class="hello">
    <TopBanner />
    <b-row>
      <b-col lg="6" class="pb-2">
        <router-link to="/NewRoom">
          <b-button size="lg">Start A New Vote</b-button>
        </router-link>
      </b-col>
      <b-col lg="6" class="pb-2">
        <b-button size="lg" @click="openModal">Join A Voting Room</b-button>
      </b-col>
    </b-row>
    <JoinModal v-bind:modalShow="isModalOpen" v-bind:closeModal="closeModal" />
  </div>
</template>

<script>
import TopBanner from "./TopBanner.vue";
import JoinModal from "./JoinModal.vue";

export default {
  name: "Welcome",
  data() {
    return {
      isModalOpen: false
    };
  },
  components: {
    TopBanner,
    JoinModal
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
h1,
h2 {
  font-weight: normal;
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
.hello {
  padding-top: 3em;
}
</style>