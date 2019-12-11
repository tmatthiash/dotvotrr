<template>
  <div id="app" :style="`height: ${innerHeight}px`">
    <router-view />
  </div>
</template>

<script>
export default {
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
#app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top:20px; */
  /* padding-top: 20px; */
  min-height: 100vh;
  width: 100vw;
  /* background-color: orange; */
  background: rgb(255, 165, 0);
  background: linear-gradient(135deg, rgba(255, 165, 0, 1) 45%, #ff6400 100%);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
