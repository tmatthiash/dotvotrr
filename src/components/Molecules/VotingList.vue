<template>
  <b-list-group>
    <b-list-group-item class="voting-option" v-for="(option, index) in optionList" :key="index">
      {{option}}
      <div>
        <b-badge pill class="voting-badge">{{index}}</b-badge>
        <b-button class="voting-button" @click="vote(option)">Vote</b-button>
      </div>
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
.voting-option {
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.voting-button {
  background-color: blue;
}
.voting-button:hover {
  background-color: black;
}
.voting-badge {
  color: blue;
  background-color: aliceblue;
  margin-right: 2rem; 
}
</style>