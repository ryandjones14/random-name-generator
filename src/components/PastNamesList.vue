<template>
  <div class="name-list">
    <h3>saved names</h3>
    <div v-for="name in pastNames" :key="name.id" class="name">{{name.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'PastNamesList',
  props: {
    pastNames: Array,
  },
}
</script>

<style scoped>
.name-list {
  background-color: rgb(206, 186, 193);
  border: solid 1px rgb(186, 166, 173);
}
.name {
  font-size: 22px;
  text-align: left;
}
</style>