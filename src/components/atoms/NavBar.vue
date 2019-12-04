<template>
  <div id="nav-holder">
    <b-navbar id="nav-bar" toggleable="lg" variant="faded" type="light">
      <b-button id="home-button" @click="goHome" variant="primary">Home</b-button>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>


<style>
#nav-holder {
  height: 3em;
}
#nav-bar {
  background-color: rgb(35, 22, 81);
  background-color: linear-gradient(
    90deg,
    rgba(35, 22, 81, 1) 31%,
    rgba(49, 31, 115, 1) 100%
  );
}
#home-button {
    background-color: orange;
    color: rgb(35, 22, 81);
    border: 0px;
}
</style>