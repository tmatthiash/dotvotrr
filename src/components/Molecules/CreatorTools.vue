<template>
  <div>
    <p>Your are the room creator so you choose when to start the voting</p>
    <b-button size="lg">Start the voting</b-button>
  </div>
</template>

<script>
export default {
  name: "CreatorTools",
  props: ["roomNumber"],
};
</script>
<style scoped>
</style>