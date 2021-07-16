<template>
  <div>
    <div ref="scene" id="scene">
      <div class="ready-prompt" :class="{ 'is-ready' : isReady }">
        <div class="container has-text-centered">
          <p class="title is-3 has-text-warning">
            Are you ready ?
          </p>
          <p class="subtitle has-text-grey-light" style="margin-bottom: 1.5rem">
            <span class="icon">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5A4,4 0 0,1 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9A3,3 0 0,0 11,6A3,3 0 0,0 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9A4,4 0 0,1 11,5Z" />
              </svg>
            </span>
            <strong class="has-text-white">Tap</strong> or
            <span class="icon">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M3 15H5V19H19V15H21V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15Z" />
              </svg>
            </span>
            <strong class="has-text-white">Spacebar</strong> to jump
          </p>
          <div class="bounce-forever">
            <div @click="onReady" class="button is-large is-warning is-rounded ">
              <b-icon icon="run"></b-icon>
            <span>
                Start
            </span>
            </div>
          </div>
        </div>
      </div>

      <div class="score-board is-fixed-top">
        <div class="top-bar">
          <div class="top-bar-left">
            <div ref="health" class="tags has-addons">
              <span  class="tag is-medium is-rounded is-success">
                <div class="icon">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>
              </span>
              <span class="tag is-medium is-rounded">
                <strong>{{ healthCounter }}</strong>
              </span>
            </div>
          </div>

          <div class="top-bar-right">
            <div ref="score" class="tags has-addons">
              <span class="tag is-medium is-rounded is-warning">
                <div class="icon">
                  <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9 3C5.69 3 3.14 5.69 3 9V21H12V13.46C13.1 14.45 14.5 15 16 15C19.31 15 22 12.31 22 9C22 5.69 19.31 3 16 3H9M16 5C18.21 5 20 6.79 20 9C20 11.21 18.21 13 16 13C13.79 13 12 11.21 12 9C12 6.79 13.79 5 16 5M16 7.25C15.03 7.25 14.25 8.03 14.25 9C14.25 9.97 15.03 10.75 16 10.75C16.97 10.75 17.75 9.97 17.75 9C17.75 8.03 16.97 7.25 16 7.25M4 12H5V13H4V12M6 12H7V13H6V12M8 12H9V13H8V12M10 12H11V13H10V12Z" />
                  </svg>
                </div>
              </span>
              <span class="tag is-medium is-rounded">
                <strong>{{ scoreCounter }}</strong>
              </span>
            </div>
            <div @click="onPause()" class="button is-dark is-rounded">
              <b-icon icon="pause"></b-icon>
            </div>
          </div>

        </div>
      </div>

      <div class="best-score">
        <p class="heading has-text-light">Best score</p>
        <strong class="score-count has-text-warning">{{ bestScore }}</strong>
      </div>
      <div ref="player" id="player"></div>
      <div class="city-front"></div>
      <div class="city-back"></div>
      <div class="floor"></div>

    </div>

    <div class="pause-menu" :class="{ 'is-active': isPaused }">
      <div @click="toggleMute()" class="pause-menu-item has-text-primary">
        <b-icon v-if="isMuted" icon="volume-off"></b-icon> 
        <b-icon v-else  icon="volume-high"></b-icon>
        <span v-if="isMuted">Sound Off</span>
        <span v-else>Sound On</span>
      </div>
      <div @click="onPause()" class="pause-menu-item has-text-primary">
        <b-icon icon="play"></b-icon> <span>Resume</span>
      </div>
      <div @click="startGame()" class="pause-menu-item has-text-primary ">
        <b-icon icon="autorenew"></b-icon> <span>Restart</span>
      </div>
      <nuxt-link to="/" class="pause-menu-item has-text-primary">
        <b-icon icon="home"></b-icon> <span>Home</span>
      </nuxt-link>
    </div>

  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import soundEffects from "~/mixins/soundEffects.js";

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
  mixins: [soundEffects],

  data() {
    return {
      isJumping: false,
      collisionListeners: {},
      healthCounter: 3,
      scoreCounter: 0,
      trackingTiming: 40,
      gameInterval: null,
      animationRefs: {},
      isPaused: false,
      bestScore: 0,
      isReady: false,
      viewportHeight: 0,
      intervals: {
        toiletPaper: false,
        obstacle: false,
        medicine: false
      }
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
        scale: 5,
        opacity: 0,
        duration: 600,
        easing: "easeOutSine"
      });
    },

    shakeScene() {
      anime({
        targets: this.scene,
        translateY: 24,
        duration: 150,
        direction: "alternate",
        easing: "easeInOutQuad"
      });
    },

    playerJump() {
      if (!this.isJumping) {
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
      }
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

        if (obstacleLeft <= playerLeft + 48 && obstacleTop - 56 <= playerTop) {
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
      }, this.trackingTiming);
    },

    comingAnimation(el, callback) {
      const uid = uuid();
      let baseSpeed = 250 - this.scoreCounter / 3.7;
      if (baseSpeed <= 70 && this.scoreCounter < 1300) {
        baseSpeed = 50;
      } else if (this.scoreCounter > 1300) {
        baseSpeed = 50;
      }
      const width = window.innerWidth;
      const unit = width / 64;
      const duration = unit * baseSpeed;
      this.animationRefs[uid] = anime({
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
      if (this.isPaused) return;
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

    createMedicine() {
      if (this.isPaused) return;
      let medicine = document.createElement("div");
      medicine.classList.add("medicine");
      this.scene.appendChild(medicine);
      this.onCollision(medicine, () => {
        this.onMedicineTouch();
      });
      this.comingAnimation(medicine, () => {
        if (
          !!this.scene &&
          isElement(this.scene) &&
          this.scene.contains(medicine)
        ) {
          this.scene.removeChild(medicine);
        }
      });
    },

    createObstacle() {
      if (this.isPaused) return;
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
      let tpNumber;
      if (this.scoreCounter < 501) {
        tpNumber = 1;
      } else if (this.scoreCounter > 500) {
        tpNumber = 1 + Math.random() * 2;
      }

      const generateTP = () => {
        const randomize = 600 + 1400 * Math.random();
        setTimeout(() => {
          this.createToiletPaper();
        }, randomize);
      };

      for (let i = 0; i < tpNumber; i++) {
        setTimeout(() => {
          generateTP();
        }, 200 * i);
      }
    },

    createRandomObstacle() {
      const randomize = 1500 * Math.random();
      setTimeout(() => {
        this.createObstacle();
      }, randomize);
    },

    createRandomMedicine() {
      const randomize = 1500 * Math.random();
      setTimeout(() => {
        this.createMedicine();
      }, randomize);
    },

    cleanDOM() {
      const els = document.querySelectorAll(
        ".obstacle, .toilet-paper, .medicine"
      );
      els.forEach(el => {
        scene.removeChild(el);
      });
    },

    resetListeners() {
      clearInterval(this.intervals.medicine);
      clearInterval(this.intervals.toiletPaper);
      clearInterval(this.intervals.obstacle);
      Object.keys(this.collisionListeners).forEach(key => {
        clearInterval(this.collisionListeners[key]);
        delete this.collisionListeners[key];
      });
      this.cleanDOM();
    },

    initControls() {
      document.body.onkeydown = e => {
        if (e.keyCode == 32) {
          this.playerJump();
        }
        if (e.keyCode == 27) {
          this.onPause();
        }
      };

      this.scene.ontouchstart = e => {
        this.playerJump();
      };
    },

    startAnimations() {
      this.intervals.toiletPaper = setInterval(() => {
        this.createRandomToiletPaper();
      }, 2000);
      this.intervals.medicine = setInterval(() => {
        this.createRandomMedicine();
      }, 27000);
      this.intervals.obstacle = setInterval(() => {
        this.createRandomObstacle();
      }, 1500);
    },

    initGame() {
      this.initControls();
      this.startAnimations();
    },

    startGame() {
      this.cleanDOM();
      this.resetListeners();
      this.healthCounter = 3;
      this.scoreCounter = 0;
      this.isPaused = false;
      this.getBestScore();
      this.initGame();
    },

    onVirusTouch() {
      if (!this.isMuted) {
        this.sound.cough.play();
      }
      this.shakeScene();
      this.healthCounter--;
      this.$buefy.toast.open({
        type: "is-primary",
        message: ` <p class="title has-text-white">Ouuch !</p> `,
        duration: 700
      });
      if (this.gameOver) {
        this.onGameOver();
        this.resetListeners();
      }
    },

    onToiletPaperTouch() {
      if (!this.isMuted) {
        this.sound.stack.play();
      }
      this.scoreCounter += 15;
      this.$buefy.toast.open({
        type: "is-success",
        message: `<p class="title has-text-white">+15</p> `,
        duration: 700
      });
    },

    onMedicineTouch() {
      if (!this.isMuted) {
        this.sound.stack.play();
      }
      this.healthCounter++;
      this.$buefy.toast.open({
        type: "is-success",
        message: `<p class="title has-text-white">Health + 1</p> `,
        duration: 700
      });
    },

    onGameOver() {
      const score = this.scoreCounter;
      this.saveBestScore();
      this.$router.push("/game-over/" + score);
    },

    pauseAnimations() {
      Object.keys(this.animationRefs).forEach(key => {
        const item = this.animationRefs[key];
        item.pause();
      });
    },

    playAnimations() {
      Object.keys(this.animationRefs).forEach(key => {
        const item = this.animationRefs[key];
        item.play();
      });
    },

    onPause() {
      if (this.isPaused) {
        this.playAnimations();
        this.isPaused = false;
      } else {
        this.pauseAnimations();
        this.isPaused = true;
      }
    },

    saveBestScore() {
      if (this.scoreCounter > this.bestScore) {
        window.localStorage.setItem("bestscore", this.scoreCounter.toString());
      }
    },

    getBestScore() {
      const bestScore = window.localStorage.getItem("bestscore");
      if (!!bestScore) {
        this.bestScore = bestScore;
      }
    },

    onReady() {
      if (!this.isMuted) {
        this.sound.stack.play();
      }
      this.isReady = true;
      this.startGame();
    }
  },

  mounted() {
    this.mainSoundtrack("breathing", this.$route.name).play();
  },

  beforeDestroy() {
    this.cleanDOM();
    this.resetListeners();
    this.mainSoundtrack("breathing", this.$route.name).stop();
  }
};
</script>

<style lang="scss">
.ready-prompt {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  height: 100%;
  width: 100%;
  z-index: 1000;
  align-items: center;
  justify-content: center;
  transition: all ease-in 0.3s;
  .container {
    max-width: 300px;
  }
  &.is-ready {
    transform: scale(1.5);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
}
</style>

<style lang="scss" scoped>
.loading-screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  &.is-loaded {
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
  }
  .loader {
    margin: 0 auto;
  }
  .heading {
    margin-top: 0.75rem;
    color: grey;
  }
}

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
  top: 1.5rem;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 1.5rem;
  .top-bar {
    display: flex;
    align-items: center;
    .button,
    .buttons,
    .tags,
    .tag {
      margin-bottom: 0;
    }

    .tags {
      margin-right: 0.5rem;
    }
    .top-bar-left,
    .top-bar-right {
      display: flex;
      align-items: center;
    }
    .top-bar-right {
      margin-left: auto;
    }
  }
  background: rgba(black, 0.03);
}

.pause-menu {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(#3d1934, 0.5);
  font-size: 1.5rem;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: scale(1.2);
  .pause-menu-item {
    padding: 0.75rem;
    width: 100%;
    text-align: center;
    transition: all 0.3s;
    &:focus {
      transform: scale(1.2);
    }
    &:hover {
      transform: scale(1.2);
      cursor: pointer;
    }
  }
  &.is-active {
    opacity: 1;
    visibility: visible;
    pointer-events: unset;
    transform: none;
  }
}

.best-score {
  position: fixed;
  top: 6.5rem;
  left: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(white, 0.05);
  border-radius: 10px;
  z-index: 10;
}

.bounce-forever  {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
