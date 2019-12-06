<template>
  <div>
    <b-jumbotron header="Dot Votrr" lead="Vote bettrr">
      <p>Dot voting is a better way to make decisions as a group.</p>
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
  background: rgb(35, 22, 81);
  background: linear-gradient(
    90deg,
    rgba(35, 22, 81, 1) 31%,
    rgba(49, 31, 115, 1) 100%
  );
  color: white;
}
</style>