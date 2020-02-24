<template>
  <div class="name-list">
    <h3>saved names</h3>
    <div v-for="name in savedNames" :key="name._id" class="name">{{name.text}}</div>
  </div>
</template>

<script>
export default {
  name: 'SavedNamesList',
  props: {
    savedNames: Array,
  },
}
</script>

<style scoped>
.name-list {
  background-color: rgb(206, 186, 193);
  border: solid 1px rgb(186, 166, 173);
  width: 65%;
  margin: 0 auto;
}
.name {
  font-size: 22px;
  text-align: left;
  width: 50%;
  margin: 0 auto;
}
</style>