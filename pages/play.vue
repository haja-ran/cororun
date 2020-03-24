<template>
  <div>
    <div ref="scene" id="scene">
      <div class="score-board is-fixed-top">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="score-board-counter">
              <p class="title is-4">
                <span class="has-text-grey">Health</span>
                <span class="has-text-success">{{ healthCounter }}</span>
              </p>
            </div>
          </div>
          <div class="level-right">
            <div class="score-board-counter">
              <div class="columns is-mobile is-vcentered">
                <div class="column">
                  <div class="buttons">
                    <b-button
                      icon-left="undo"
                      @click="startGame()"
                      type="is-warning"
                      rounded
                    >
                      Restart
                    </b-button>
                    <nuxt-link to="home" class="button is-dark is-rounded">
                      Home
                    </nuxt-link>
                  </div>
                </div>
                <div class="column">
                  <p class="title is-4">
                    <span class="has-text-dark">
                      {{ scoreCounter }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref="player" id="player"></div>
      <div class="floor"></div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { Howl, Howler } from "howler";

import SimpleCrypto from "simple-crypto-js";

const _secretKey = "covid-19";
const simpleCrypto = new SimpleCrypto(_secretKey);

function isElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (
      typeof obj === "object" &&
      obj.nodeType === 1 &&
      typeof obj.style === "object" &&
      typeof obj.ownerDocument === "object"
    );
  }
}

function uuid() {
  let dt = new Date().getTime();
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default {
  components: {},
  data() {
    return {
      isJumping: false,
      collisionListeners: {},
      healthCounter: 3,
      scoreCounter: 0,
      gameInterval: null,
      playerRect: false,
      speed: 0.5,
      soundTrack: new Howl({
        src: ["/sound-effects/breathing.mp3"],
        loop: true,
        volume: 0.3
      }),
      coughSound: new Howl({
        src: ["/sound-effects/small-cough.wav"],
        loop: false,
        volume: 0.5
      }),
      stackSound: new Howl({
        src: ["/sound-effects/stacking.wav"],
        loop: false,
        volume: 0.5
      })
    };
  },

  computed: {
    player() {
      return this.$refs.player;
    },

    scene() {
      return this.$refs.scene;
    },

    gameOver() {
      if (this.healthCounter <= 0) {
        return true;
      }
      return false;
    }
  },

  methods: {
    collisionAnimation(el) {
      anime({
        targets: el,
        scale: 3,
        translateY: "-200px",
        opacity: 0,
        duration: 700,
        easing: "easeOutQuad"
      });
    },

    playerJump() {
      if (this.isJumping) return;
      anime({
        targets: this.player,
        translateY: -200,
        direction: "alternate",
        easing: "easeOutQuad",
        duration: 300,
        begin: () => {
          this.isJumping = true;
        },
        complete: () => {
          this.isJumping = false;
        }
      });
    },

    onCollision(obstacle, callback) {
      const uid = uuid();

      const trackObstacle = () => {
        if (!this.player) {
          clearInterval(this.collisionListeners[uid]);
          return;
        }
        const obstacleRect = obstacle.getBoundingClientRect();
        const playerRect = this.player.getBoundingClientRect();
        const obstacleLeft = obstacleRect.left;
        const obstacleTop = obstacleRect.top;
        const playerLeft = playerRect.left;
        const playerTop = playerRect.top;

        if (obstacleLeft <= playerLeft + 24 && obstacleTop - 56 <= playerTop) {
          // This is a collision
          this.collisionAnimation(obstacle);
          clearInterval(this.collisionListeners[uid]);
          callback();
          return;
        }

        if (obstacleLeft <= playerLeft) {
          if (!!this.collisionListeners[uid]) {
            clearInterval(this.collisionListeners[uid]);
          }
          return;
        }
      };

      this.collisionListeners[uid] = setInterval(() => {
        trackObstacle();
      }, 100);
    },

    comingAnimation(el, callback) {
      const baseSpeed = 350 + this.scoreCounter;
      const width = window.innerWidth;
      const unit = width / 64;
      const duration = unit * baseSpeed;

      anime({
        targets: el,
        translateX: [0, -width - 24],
        duration: duration,
        easing: "linear",
        complete: () => {
          callback();
        }
      });
    },

    createToiletPaper() {
      let toiletPaper = document.createElement("div");
      toiletPaper.classList.add("toilet-paper");
      this.scene.appendChild(toiletPaper);
      this.onCollision(toiletPaper, () => {
        this.onToiletPaperTouch();
      });
      this.comingAnimation(toiletPaper, () => {
        if (
          !!this.scene &&
          isElement(this.scene) &&
          this.scene.contains(toiletPaper)
        ) {
          this.scene.removeChild(toiletPaper);
        }
      });
    },

    createObstacle() {
      let obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");
      this.scene.appendChild(obstacle);

      this.onCollision(obstacle, () => {
        this.onVirusTouch();
      });
      this.comingAnimation(obstacle, () => {
        if (
          !!this.scene &&
          isElement(this.scene) &&
          this.scene.contains(obstacle)
        ) {
          this.scene.removeChild(obstacle);
        }
      });
    },

    createRandomToiletPaper() {
      const randomize = 2000 * Math.random();
      setTimeout(() => {
        this.createToiletPaper();
      }, randomize);
    },

    createRandomObstacles() {
      const randomize = 2000 * Math.random();
      setTimeout(() => {
        this.createObstacle();
      }, randomize);
    },

    cleanDOM() {
      const obstacles = document.querySelectorAll(".obstacle");
      obstacles.forEach(el => {
        scene.removeChild(el);
      });
      const toiletPapers = document.querySelectorAll(".toilet-paper");
      toiletPapers.forEach(el => {
        scene.removeChild(el);
      });
    },

    resetListeners() {
      clearInterval(this.gameInterval);
      Object.keys(this.collisionListeners).forEach(key => {
        clearInterval(this.collisionListeners[key]);
        delete this.collisionListeners[key];
      });
      this.cleanDOM();
    },

    initGame() {
      this.scene.addEventListener("click", this.playerJump);
      document.body.onkeydown = e => {
        if (e.keyCode == 32) {
          this.playerJump();
        }
      };
      document.body.ontouchstart = e => {
        this.playerJump();
      };

      this.gameInterval = setInterval(() => {
        this.createRandomToiletPaper();
        this.createRandomObstacles();
      }, 2000);
    },

    startGame() {
      this.cleanDOM();
      this.resetListeners();
      this.healthCounter = 3;
      this.scoreCounter = 0;
      this.initGame();
    },

    onVirusTouch() {
      this.coughSound.play();
      this.healthCounter--;
      this.$buefy.toast.open({
        type: "is-danger",
        message: ` <p class="title has-text-white">Ouch !</p> `,
        duration: 700
      });
      if (this.gameOver) {
        this.onGameOver();
        this.resetListeners();
      }
    },

    onToiletPaperTouch() {
      this.stackSound.play();
      this.scoreCounter += 15;
      this.$buefy.toast.open({
        type: "is-success",
        message: `<p class="title has-text-white">+15</p> `,
        duration: 700
      });
    },

    onGameOver() {
      const score = this.scoreCounter;
      const encryptedScore = simpleCrypto.encrypt(score);
      this.$router.push("/game-over/" + encryptedScore);
    }
  },

  mounted() {
    this.cleanDOM();
    this.resetListeners();
    setTimeout(() => {
      this.initGame();
    }, 300);
    this.soundTrack.play();
  },

  beforeDestroy() {
    this.cleanDOM();
    this.resetListeners();
    this.soundTrack.stop();
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.start-screen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.score-board {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 1.5rem;
  background: rgba(black, 0.03);
}
</style>
