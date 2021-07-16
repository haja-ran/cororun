<template>
  <div>
    <section
      ref="scene"
      class="start-screen hero is-fullheight is-black has-background-black-bis"
    > 
      <div class="hero-background"></div>

      <div class="animation-wrapper">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
      </div>

      <b-modal :active.sync="instructions">
        <div class="container">
          <div class="card" style="margin: 0 1rem">
            <div class="card-content">
              <p class="title is-2 has-text-dark">
                Instructions
              </p>
              <p class="subtitle is-4 has-text-grey">
                Get that paper !
              </p>
              <div class="is-size-5 content">
                <ul>
                  <li>
                    Get as many <strong>toilet paper</strong> as you can ! Each
                    one gives you <strong> + 15 points</strong>.
                  </li>
                  <li>
                    <strong>Jump</strong> in order to avoid the
                    <strong>viruses</strong>. <br />
                    <strong>Bumping in to a virus</strong> removes
                    <strong>1 health point</strong>. If you loose all you health
                    points, <strong>you won't get home...</strong>.
                  </li>
                  <li>
                    <strong>Touch the screen</strong> to jump or press the
                    <strong>space bar</strong> on desktop.
                  </li>
                  <li>
                    <strong>Have fun and good luck my friend !</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-footer">
              <a @click="instructions = false" class="card-footer-item">
                <strong>Okay</strong>
              </a>
            </div>
          </div>
        </div>
      </b-modal>

      <b-modal :active.sync="credit">
        <div class="container" style="max-width: 400px">
          <div
            class="box has-text-centered is-size-7 has-text-white has-background-black-bis"
            style="margin: 0 1rem;"
          >
            <p class="title is-5 has-text-white" style="margin-bottom: .5rem">
              Credits
            </p>
            Designed & Coded by
            <a target="_blank" class="has-text-primary" href="https://hajar.dev"
              >Haja Randriakoto</a
            >
            <br />
            <a
              target="_blank"
              class="has-text-primary"
              href="https://www.vecteezy.com/free-vector/character"
              >Character Vectors by Vecteezy</a
            >
            <br />
            Textures & Photos from
            <a
              class="has-text-primary"
              target="_blank"
              href="https://unsplash.com/"
              >Unsplash</a
            >
            <br />
            Music & Sound Effects : Youtube AudioLibrary
            <br />
            Stack: Vue.js, Nuxt.js, Anime.js, Bulma
          </div>
        </div>
      </b-modal>
      <div class="hero-head box has-text-centered is-borderless is-marginless" style="background: transparent">
        <div
          @click="toggleMute()"
          class="button is-black is-rounded">
          <b-icon v-if="isMuted" icon="volume-off"></b-icon>
          <b-icon v-else icon="volume-high"></b-icon>
          <span v-if="isMuted" >Sound Off</span>
          <span v-else >Sound On</span>
        </div>
      </div>
      <div ref="box" class="hero-body ">
        <div class="container has-text-centered" style="margin-top: auto;">
          <Logo class="title" style="margin-bottom: .5rem" />
          <p class="subtitle">Get that toilet paper or die trying</p>
          <div style="margin-top: 1.5rem" class="buttons is-centered">
            <nuxt-link to="/play" class="button is-warning is-large is-rounded">
              <b-icon icon="run"></b-icon>
              <span>Play</span>
            </nuxt-link>
            <div
              @click="instructions = !instructions"
              class="button is-warning is-outlined is-large is-rounded"
            >
              <b-icon icon="help"></b-icon>
              <span>Help</span>
            </div>
          </div>
          <div class="heading " style="margin-top: 1.5rem">
            <a class="has-text-light" @click="credit = !credit">About</a> | <nuxt-link class="has-text-light" to="/privacy">Privacy</nuxt-link>
          </div>
        </div>
      </div>

      <div class="hero-foot">
        <div
          class="box is-borderless is-radiusless is-shadowless has-text-centered"
          style="background-color: transparent"
        >
          <p class="has-text-light is-size-7 content is-relative">
            Share this with your friends !
          </p>
          <social-sharing :url="appUrl" inline-template>
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
  </div>
</template>

<script>
import Logo from "~/components/Logo";
import soundEffects from "~/mixins/soundEffects.js";

export default {
  components: {
    Logo
  },

  mixins: [soundEffects],

  data() {
    return {
      soundPlaying: false,
      instructions: false,
      credit: false
    };
  },

  computed: {
    appUrl() {
      return window.location.href;
    }
  },

  mounted() {
    this.mainSoundtrack("theme", this.$route.name).play();
  },

  beforeDestroy() {
    this.mainSoundtrack("theme", this.$route.name).stop();
  }
};
</script>

<style lang="scss" scoped>
.start-screen {
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  .hero-background {
    background-image: url("/img/background@2x.jpg");
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: bottom center;
    transform: scale(1.2) rotate(3deg);
    animation: bg-scale-effect 15s ease-out;
    animation-fill-mode: forwards;
    opacity: 0;
  }
}

@keyframes bg-scale-effect {
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

<style scoped lang="scss">
.hero {
  perspective: 500px;
}
</style>
