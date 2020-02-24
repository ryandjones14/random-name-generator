<template>
  <div class="theme-picker">
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
.theme-picker {
  background-color: rgb(206, 186, 193);
  border: solid 1px rgb(186, 166, 173);
  width: 65%;
  margin: 0 auto;
  margin-bottom: 15px;
}
.selected-theme {
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  transition: 5s ease;
}
.selected-theme > * {
  flex: 1;
  margin: 0 auto;
  width: 110px;
}
.theme-list {
  display: flex;
  justify-content: space-around;
  height: 140px;
  margin: 20px 0;
}
.theme-box {
  flex: 1 110px;
  max-width: 110px;
  background-color: rgb(126, 158, 126);
  border: solid 1px rgb(25, 38, 26);
  border-radius: 2%;
  max-height: 110px;
  height: 110px;
  margin-bottom: 5px;
}
.theme-box.unselected {
  cursor: pointer;
}
</style>
