<template>
  <div>
    <b-jumbotron header="Dot Votrr" lead="Vote bettrr">
      <p>Start a dot vote without having to create an account. Just start a dot vote, share the room number with everyone and get voting.</p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: "TopBanner"
};
</script>


<style scoped>
.jumbotron {
  /* background-color: #231651; */
  background: #0d2c54;
  color: white;
}
@media (max-width: 350px) {
  .jumbotron {
    font-size: 80%;
  }
  h1 {
    font-size: 3rem;
  }
}
p {
  margin: 1rem;
}
</style>