<template>
  <div class="keyboard-layout">
    <div
      class="keyboard-button-container"
      v-for="button in keyboardButtons"
      :key="button.key"
    >
      <div
        :style="generateStyles(button.value)"
        @click="addCharacterToList(button.value)"
        class="keyboard-button"
      >
        {{ button.value }}
      </div>
    </div>
  </div>
</template>

<script>
import { keyboardButtons } from "../const";
export default {
  name: "KeyboardComponent",
  props: ["addCharacterToList", "selectedCharacters", "textArray"],
  data() {
    return {
      keyboardButtons,
    };
  },
  methods: {
    generateStyles(value) {
      if (
        this.textArray.includes(value) &&
        this.selectedCharacters.includes(value)
      ) {
        return {
          backgroundColor: "#23bf1b",
          color: "white",
          pointerEvents: "none",
        };
      }
      if (
        this.selectedCharacters.includes(value) &&
        !this.textArray.includes(value)
      ) {
        return {
          backgroundColor: "red",
          color: "white",
          pointerEvents: "none",
        };
      }
    },
  },
};
</script>

<style>
.keyboard-layout {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.keyboard-button:hover {
  color: rgb(104, 41, 4);
  border: solid 2px rgb(104, 41, 4);
  box-shadow: 2px 4px 8px rgb(104, 41, 4);
  transition-duration: 0.2s;
}
.keyboard-button-container {
  width: 10%;
  min-width: 50px;
}
.keyboard-button {
  cursor: pointer;
  font-size: 40px;
  background-color: rgb(194, 163, 96);
  border-radius: 10px;
  border: solid 2px rgb(94, 63, 40);
  /* width: 55px; */
  color: rgb(94, 63, 40);
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
}

@media screen and (max-width: 950px) {
  .keyboard-button {
    cursor: pointer;
    font-size: 30px;
    background-color: rgb(194, 163, 96);
    border-radius: 10px;
    border: solid 2px rgb(94, 63, 40);
    /* width: 55px; */
    color: rgb(94, 63, 40);
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
  }
}
@media screen and (max-width: 821px) {
  .keyboard-button {
    cursor: pointer;
    font-size: 25px;
    background-color: rgb(194, 163, 96);
    border-radius: 10px;
    border: solid 2px rgb(94, 63, 40);
    /* width: 55px; */
    color: rgb(94, 63, 40);
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 4px;
  }
}
</style>
