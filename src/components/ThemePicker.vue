<template>
  <div>
    <h3>{{title}}</h3>
    <div class="selected-theme" v-if="selectedTheme">
      <div class="theme-box">
        {{selectedTheme.name}}
      </div>
      <button class="reset-btn" @click="$emit('reset-adj')">reset</button>
    </div>
    <div v-else class="theme-list">
      <div
        class="theme-box unselected"
        :id="theme.id"
        v-for="theme in themes"
        :key="theme.id"
        @click="selectAdj(theme)"
      >
        {{theme.name}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThemePicker',
  props: {
    title: String,
    themes: Array,
    selectedTheme: Object,
  },
  methods: {
    selectAdj: function(theme) {
      this.$emit('select-adj', theme);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selected-theme {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  transition: 5s ease;
}
.selected-theme > * {
  flex: 1;
  margin: 0 auto;
  width: 200px;
}
.theme-list {
  display: flex;
  justify-content: space-around;
  height: 230px;
  margin: 20px 0;
}
.theme-box {
  flex: 1 200px;
  max-width: 200px;
  background-color: rgb(126, 158, 126);
  border: solid 1px rgb(25, 38, 26);
  border-radius: 2%;
  max-height: 200px;
  height: 200px;
  margin-bottom: 5px;
}
.theme-box.unselected {
  cursor: pointer;
}
</style>
