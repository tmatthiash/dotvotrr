<template>
  <b-button size="lg" @click="goHome" variant="primary">
    Home
  </b-button>
</template>

<script>
export default {
  name: "HomeButton",
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    }
  }
};
</script>

<style scoped>
.btn-lg {
  display: flex;
  margin-left: 40px;
  margin-bottom: -20px;
  border: 2px solid black;
  color: black;
  background-color: orange;
}
.btn-lg:hover {
  border: 2px solid black;

  color: black;
  background-color: orange;
}
a {
  color: black;
}
</style>