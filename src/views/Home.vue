<template>
  <div>
    <ThemePicker
      title="pick an adjective"
      :selectedTheme="selectedAdjectiveTheme"
      :themes="adjectiveThemes"
      @select-adj="selectAdjective"
      @reset-adj="resetAdjective"
    />
    <ThemePicker
      title="pick a noun"
      :selectedTheme="selectedNounTheme"
      :themes="nounThemes"
      @select-adj="selectNoun"
      @reset-adj="resetNoun"
    />
    <button class="new-button" v-if="hasSelections" @click="generateSprintName">
      get a new name
    </button>
    <div v-if="shouldShowSprintName" class="sprint-name">
      {{sprintName}}
      <button v-if="shouldShowSave" @click="saveName(sprintName)">save</button>
    </div>
    <SavedNamesList v-if="savedNames.length" :savedNames="savedNames"/>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker.vue'
import SavedNamesList from '@/components/SavedNamesList.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
    components: {
    ThemePicker,
    SavedNamesList
  },
  data: function() {
    return {
      selectedAdjectiveTheme: null,
      selectedNounTheme: null,
      sprintName: null,
      pastNames: [],
      name: {
        text: ''
      }
    };
  },
  mounted() {
    fetch(`http://localhost:5000/names`)
      .then(response => response.json())
      .then(result => {
        this.pastNames = result;
      }).catch((e) => {
        console.log(e); // eslint-disable no-console
      });
  },
  computed: mapState({
    // arrow functions can make the code very succinct!
    adjectiveThemes: state => state.adjectiveThemes,
    nounThemes: state => state.nounThemes,
    savedNames: state => state.savedNames,
    hasSelections: function() {
      return !!this.selectedAdjectiveTheme && !!this.selectedNounTheme;
    },
    shouldShowSprintName: function() {
      return this.hasSelections && !!this.sprintName;
    },
    shouldShowSave: function() {
      return !this.pastNames.map(name => name.text).includes(this.sprintName);
    },
  }),
  methods: {
    selectAdjective: function(theme) {
      this.selectedAdjectiveTheme = theme;
    },
    resetAdjective: function() {
      this.selectedAdjectiveTheme = null;
      if (this.sprintName) {
        this.sprintName = null;
      }
    },
    selectNoun: function(theme) {
      this.selectedNounTheme = theme;
    },
    resetNoun: function() {
      this.selectedNounTheme = null;
      if (this.sprintName) {
        this.sprintName = null;
      }
    },
    generateSprintName: function() {
      let that = this;
      const adjTheme = this.adjectiveThemes.find(function(theme) {
        return theme.id === that.selectedAdjectiveTheme.id;
      });
      const nounTheme = this.nounThemes.find(function(theme) {
        return theme.id === that.selectedNounTheme.id;
      });
      const adjective = adjTheme.options[Math.floor(Math.random() * adjTheme.options.length)];
      const noun = nounTheme.options[Math.floor(Math.random() * nounTheme.options.length)];

      this.sprintName = `${adjective} ${noun}`;
    },
    saveName: function(name) {
      // console.log(name);
      this.name.text = name;
      fetch(`http://localhost:5000/names`, {
        method: "POST",
        body: JSON.stringify(this.name),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => response.json())
        .then(result => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map(detail => detail.message)
              .join(". ");
            this.error = error;
          } else {
            this.error = "";
            this.showMessageForm = false;
            let savedNamesCopy = this.savedNames;
            savedNamesCopy.push(this.name);
            this.savedNames = savedNamesCopy;
          }
      });
    }
  }
}
</script>

<style scoped>
.sprint-name {
  font-size: 34px;
  margin: 10px 0;
}
button {
  background-color: rgb(87, 110, 90);
  border: solid 1px rgb(69, 87, 72);
  border-radius: 1%;
  color: rgb(230, 204, 213);
  font-size: 16px;
  cursor: pointer;
}
.new-button {
  width: 200px;
}
</style>