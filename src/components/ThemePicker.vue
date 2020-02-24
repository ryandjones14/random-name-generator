<template>
  <div class="theme-picker">
    <h3 class="top-row-item">{{title}}</h3>
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
<style scoped lang="sass">
$theme-box-color: rgb(126, 158, 126)
$button-color: rgb(87, 110, 90)

h3
  margin: 0 0 15px
  font-size: 24px
.theme-picker
  background-color: rgb(206, 186, 193)
  border: solid 1px rgb(186, 166, 173)
  width: 65%
  margin: 0 auto
  margin-bottom: 15px

.selected-theme
  display: flex
  flex-direction: column
  margin: 20px 0
  transition: 5s ease

.selected-theme > *
  flex: 1
  margin: 0 auto
  width: 110px

.theme-list 
  display: flex
  justify-content: space-around
  height: 140px
  margin: 20px 0

.theme-box
  flex: 1 110px
  max-width: 150px
  height: 110px
  background-color: $theme-box-color
  border: solid 1px rgb(25, 38, 26)
  border-radius: 2%
  margin-bottom: 5px
  font-size: 24px

  &.unselected
    cursor: pointer
    height: 110px
    &:hover
      background-color: lighten($theme-box-color, 10%)
.reset-btn
  background-color: $button-color
  border: solid 1px rgb(69, 87, 72)
  border-radius: 1%
  color: rgb(230, 204, 213)
  font-size: 16px
  cursor: pointer

  &:hover
    background-color: lighten($button-color, 10%)
</style>
