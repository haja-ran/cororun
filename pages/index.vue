<template>
  <div>
    <section
      ref="scene"
      class="start-screen hero is-fullheight is-black has-background-black-bis"
    >
      <div ref="box" class="hero-body ">
        <div class="container has-text-centered">
          <Logo class="title" />
          <p class="subtitle">Get some toilet paper or die trying</p>
          <div class="buttons is-centered">
            <nuxt-link to="/play" class="button is-warning is-large is-rounded">
              Start running
            </nuxt-link>
            <div class="button is-warning is-outlined is-large is-rounded">
              Help
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Howl, Howler } from "howler";
import Logo from "~/components/Logo";

export default {
  components: {
    Logo
  },

  data() {
    return {
      soundTrack: new Howl({
        src: ["/sound-effects/Hero_In_Peril.mp3"],
        autoplay: false,
        loop: true,
        volume: 0.5
      }),
      soundPlaying: false
    };
  },

  methods: {
    trackMouse() {
      const ratio = 0.08;
      const box = this.$refs.box;
      const scene = this.$refs.scene;
      let sceneWidth = scene.offsetWidth;
      let sceneHeight = scene.offsetHeight;

      window.addEventListener(
        "resize",
        () => {
          sceneWidth = scene.offsetWidth;
          sceneHeight = scene.offsetHeight;
        },
        { passive: true }
      );

      function trackMouse() {
        scene.addEventListener("mousemove", event => {
          const mouseX = event.clientX;
          const mouseY = event.clientY;
          const rotateX = (sceneHeight / 2 - mouseY) * ratio;
          const rotateY = -(sceneWidth / 2 - mouseX) * ratio;
          box.style.transform = ` rotateX(${rotateX}deg) rotateY(${rotateY}deg) `;
        });
      }
      trackMouse();
    }
  },

  mounted() {
    this.soundTrack.play();
    this.trackMouse();
  },

  beforeDestroy() {
    this.soundTrack.stop();
    this.soundPlaying = false;
  }
};
</script>

<style scoped>
.start-screen {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-image: url("/img/background@2x.jpg");
  background-size: cover;
  background-position: center;
}
</style>

<style scoped lang="scss">
.hero {
  height: 100vh;
  width: 100vw;
  perspective: 500px;
}
</style>
