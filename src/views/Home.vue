<template>
  <div
    class="home"
    :style="{
      'background-image':
        'url(' + require('../assets/Scenes/scene' + count + '.png') + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      transition: 'background-image 0.2s ease-in-out',
    }"
  >
    <div class="container">
      <div class="left-container">
        <div class="score-blocks-left">
          <h1 class="game-over" :style="{ color: 'black' }">
            Score: {{ finalscore }}
          </h1>
          <div class="reset-container">
            <button @click="resetgame(2)" v-if="!gameover && count !== 99">
              Reset
            </button>
          </div>
          <h1 v-if="gameover && count !== 99" class="game-over">Game Over!</h1>
        </div>
      </div>
      <div class="right-container">
        <div class="score-blocks">
          <h1 class="game-over" :style="{ color: 'black' }">
            Score: {{ finalscore }}
          </h1>
          <div class="reset-container">
            <button @click="resetgame(2)" v-if="!gameover && count !== 99">
              Reset
            </button>
          </div>
          <h1 v-if="gameover && count !== 99" class="game-over">Game Over!</h1>
        </div>
        <div v-if="!gameover" class="right-blocks">
          <div class="category">Guess the {{ category }}</div>
          <div class="text-value">
            <div :style="{ width: '10%' }" v-for="item in textArray">
              <div class="text-item">
                <div :style="[setTextStyle(item)]" class="text-block">
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
          <KeyboardComponent
            :addCharacterToList="addCharacterToList"
            :selectedCharacters="selectedCharacters"
            :textArray="textArray"
          />
        </div>
        <div v-if="gameover" class="right-blocks">
          <div class="category" v-if="count !== 99">The Correct Answer was</div>
          <div class="category" v-if="count === 99">Correct Answer !</div>
          <div class="text-value">{{ textValue }}</div>

          <div class="button-container" v-if="count === 99">
            <button @click="resetgame(1)">Next</button>
          </div>
          <div class="button-container" v-if="count !== 99">
            <button @click="resetgame(2)">Retry</button>
            Share on :
            <button class="facebook">
              <ShareNetwork
                network="facebook"
                url="https://shreygeekyants.github.io/hangman/"
                title="Hangman - A Vue.js implementation by Shrey"
                :quote="getMessage()"
                hashtags="ShreyIsAwesome"
              >
                <div class="button-element">
                  <vue-fontawesome
                    icon="facebook"
                    size="2"
                    color="white"
                  ></vue-fontawesome>
                </div>
              </ShareNetwork>
            </button>
            <button class="whatsapp">
              <ShareNetwork
                title="Hangman - A Vue.js implementation by Shrey"
                network="whatsapp"
                url="https://shreygeekyants.github.io/hangman"
                :description="getMessage()"
              >
                <div class="button-element">
                  <vue-fontawesome
                    icon="whatsapp"
                    size="2"
                    color="white"
                  ></vue-fontawesome>
                </div>
              </ShareNetwork>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import KeyboardComponent from "../components/KeyboardComponent";
import { dataset } from "../const";
import { get } from "lodash";
export default {
  name: "Home",
  data() {
    return {
      textValue: "",
      textFamily: "",
      category: "",
      textArray: [],
      selectedCharacters: [],
      count: 0,
      gameover: false,
      nextround: false,
    };
  },
  computed: {
    finalscore() {
      return get(this.$store, "state.score", 0);
    },
  },
  beforeDestroy() {
    if (this.gameover) {
      this.$store.dispatch("clearScore");
    }
  },
  mounted() {
    this.generateCategory();
    this.splitText(this.textValue);
  },

  methods: {
    getMessage() {
      return `Check this game out and beat my score of ${this.finalscore}`;
    },
    resetgame(num) {
      if (num === 2) {
        this.$store.dispatch("clearScore");
      }
      this.resetValues();
      this.generateCategory();
      this.splitText(this.textValue);
    },
    resetValues() {
      this.textValue = "";
      this.textFamily = "";
      this.category = "";
      this.textArray = [];
      this.selectedCharacters = [];
      this.count = 0;
      this.gameover = false;
    },
    setTextStyle(item) {
      if (this.selectedCharacters.includes(item)) {
        return { visibility: "visible" };
      }
      return { visibility: "hidden" };
    },
    generateCategory() {
      let categories = ["animal", "city", "country", "body_part"];
      let chosenCategory =
        categories[Math.floor(Math.random() * categories.length)];
      let elementArray = dataset[chosenCategory];
      this.category = chosenCategory.replace("_", " ");
      this.textValue =
        elementArray[Math.floor(Math.random() * elementArray.length)];
    },
    addCharacterToList(value) {
      this.selectedCharacters.push(value);
      if (!this.textArray.includes(value)) {
        this.count += 1;
      }
      this.checkGameOver();
      this.checkVictoryCondition();
    },
    checkGameOver() {
      if (this.count === 6) {
        this.gameover = true;
      }
    },
    updateScore() {
      this.$store.dispatch("updateScore", 100);
      this.gameover = true;
    },
    checkVictoryCondition() {
      let allPresent = this.textArray.every((item) =>
        this.selectedCharacters.includes(item),
      );
      if (allPresent) {
        this.updateScore();
        this.count = 99;
      }
    },
    splitText(text) {
      this.textArray = text.split("");
    },
  },
  components: {
    KeyboardComponent,
  },
};
</script>
<style>
@import "./style.scss";
</style>
