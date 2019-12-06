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
  position: fixed;
  z-index: 300;
  top: 0px;
  width:100%;
}
#nav-bar {
  background-color: #0d2c54;
}
#home-button {
    color: white;
    background-color: #0d2c54;
    border: 0px;    
    font-weight:600;
}

</style>