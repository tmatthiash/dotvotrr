<template>
  <b-list-group>
    <b-list-group-item v-for="(option, index) in optionList" :key="index">
      {{option}}
      <b-badge></b-badge>
      <b-button @click="vote(option)">Vote</b-button>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  name: "VotingList",
  props: ["optionList", "roomNumber"],
  methods: {
    vote(option) {
      console.log(option);
    }
  }
};
</script>

<style scoped>
</style>