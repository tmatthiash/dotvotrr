<template>
  <div class="home">
    <!-- <div id="padding" /> -->
    <Welcome msg="Vote Bettrr" />
  </div>
</template>

<script>
// @ is an alias to /src
import Welcome from "@/components/Welcome.vue";

export default {
  name: "home",
  components: {
    Welcome
  }
};
</script>
<style>
#padding {
  height: 2em;
}
.home {
  height: 100%;
  position: absolute;
  width: 100%;
}
</style>
