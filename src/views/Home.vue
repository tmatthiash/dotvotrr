<template>
  <div class="home" :style="`height: ${innerHeight}px`">
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
  },
  data() {
    return {
      innerHeight: document.documentElement.clientHeight
    };
  },
  methods: {
    setHeight() {
      this.innerHeight = document.documentElement.clientHeight;
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.setHeight);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setHeight);
  }
};
</script>
<style>
#padding {
  height: 2em;
}
.home {
  position: absolute;
  width: 100%;
}
</style>
