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
  top: 3em;
  position:absolute;
  height: calc(100vh - 3em)
}
</style>
