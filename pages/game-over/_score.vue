<template>
  <section ref="scene" class="game-over hero is-fullheight is-primary">
    <div class="animation-wrapper">
      <div class="particle particle-1"></div>
      <div class="particle particle-2"></div>
      <div class="particle particle-3"></div>
      <div class="particle particle-4"></div>
    </div>
    <div class="hero-body has-text-centered">
      <div class="container">
        <p class="heading">Best: {{ bestScore }}</p>
        <p>
          <strong class="is-size-3 has-text-warning">{{ score }} Rolls 🔥</strong>
        </p>
        <p class="title is-1">
          Game over
        </p>
        <p class="subtitle">
          You got waisted !
        </p>
        <div class="buttons is-centered">
          <div
            @click="onButtonClick('/play')"
            class="button is-large is-rounded is-warning"
            :class="{ 'is-loading': isLoading }"
          >
            Try again
          </div>
          <div
            to="/"
            @click="onButtonClick('/')"
            class="button is-large is-rounded is-warning is-outlined"
            :class="{ 'is-hidden': isLoading }"
          >
            Home
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot">
      <div
        class="box is-borderless is-radiusless is-shadowless has-text-centered"
        style="background-color: transparent"
      >
        <a target="_blank" href="https://www.instagram.com/hajar.dev/" style="margin-bottom: 1.5rem" class="button  is-rounded is-primary">
          <b-icon icon="instagram"></b-icon>
          <span>Follow me on Instagram</span>
        </a>

        <p class="has-text-light is-size-7 content is-relative">
          Share this with your friends ! 
        </p>
        <social-sharing url="https://cororun.now.sh/" inline-template>
          <div class="buttons is-centered">
            <network
              class="button is-blue is-rounded is-small"
              network="facebook"
            >
              <b-icon size="is-small" icon="facebook"></b-icon>
              <span>Facebook</span>
            </network>
            <network
              class="button is-blue is-rounded is-small"
              network="linkedin"
            >
              <b-icon size="is-small" icon="linkedin"></b-icon>
              <span>LinkedIn</span>
            </network>
            <network
              class="button is-primary is-rounded is-small"
              network="pinterest"
            >
              <b-icon size="is-small" icon="pinterest"></b-icon>
              <span>Pinterest</span>
            </network>
            <network
              class="button  is-info is-rounded is-small"
              network="twitter"
            >
              <b-icon size="is-small" icon="twitter"></b-icon>
              <span>Twitter</span>
            </network>
            <network
              class="button is-success is-rounded is-small"
              network="whatsapp"
            >
              <b-icon size="is-small" icon="whatsapp"></b-icon>
              <span>Whatsapp</span>
            </network>
          </div>
        </social-sharing>
      </div>
    </div>
  </section>
</template>

<script>
import soudEffects from "~/mixins/soundEffects.js";
import soundEffects from "~/mixins/soundEffects.js";

export default {
  mixins: [soundEffects],

  data() {
    return {
      isLoading: false,
      bestScore: 0
    };
  },

  methods: {
    onButtonClick(path) {
      this.isLoading = true;
      this.$router.push(path);
    },

    getBestScore() {
      const bestScore = window.localStorage.getItem("bestscore");
      if (!!bestScore) {
        this.bestScore = bestScore;
      }
    }
  },

  computed: {
    score() {
      return this.$route.params.score;
    },

    appUrl() {
      return window.location.href;
    }
  },

  mounted() {
    this.getBestScore();
    this.mainSoundtrack("gameOver", this.$route.name).play();
  },

  beforeDestroy() {
    this.mainSoundtrack("gameOver", this.$route.name).stop();
  }
};
</script>

<style lang="scss">
.game-over {
  animation: to-black-bg 5s;
  animation-fill-mode: forwards;
}

@keyframes to-black-bg {
  to {
    background-color: #111;
  }
}
</style>
