<template>
  <b-button size="lg" variant="primary">
    <router-link to="/">Home</router-link>
  </b-button>
</template>

<script>
export default {
  name: "HomeButton"
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