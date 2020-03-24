<template>
  <section class="game-over hero is-fullheight is-danger">
    <div class="hero-body has-text-centered">
      <div class="container">
        <p>{{ score }}</p>
        <p class="title is-1">
          Game over
        </p>
        <p class="subtitle">
          You got waisted !
        </p>
        <div class="buttons is-centered">
          <nuxt-link to="/play" class="button is-large is-rounded is-white">
            Try again
          </nuxt-link>
          <nuxt-link
            to="/"
            class="button is-large is-rounded is-white is-outlined"
          >
            Back to home
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Howl, Howler } from "howler";
import SimpleCrypto from "simple-crypto-js";

const _secretKey = "covid-19";
const simpleCrypto = new SimpleCrypto(_secretKey);

export default {
  data() {
    return {
      soundTrack: new Howl({
        src: ["/sound-effects/looser.wav"],
        loop: false,
        volume: 0.5
      })
    };
  },

  computed: {
    score() {
      const encryptedScore = this.$route.params.score;
      const decryptedScore = simpleCrypto.decrypt(encryptedScore);

      return decryptedScore;
    }
  },

  mounted() {
    this.soundTrack.play();
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
