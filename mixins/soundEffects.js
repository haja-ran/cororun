import { Howl, Howler } from "howler";

export default {
  data() {
    return {
      isMuted: false,

      sound: {
        theme: new Howl({
          src: ["/sound-effects/Hero_In_Peril.m4a"],
          autoplay: false,
          loop: true,
          volume: 0.5,
          html5: true,
          pool: 1,
          mute: this.isMuted
        }),

        breathing: new Howl({
          src: ["/sound-effects/breathing.m4a"],
          autoplay: false,
          loop: true,
          volume: 0.3,
          html5: true,
          pool: 1,
          mute: this.isMuted
        }),

        cough: new Howl({
          src: ["/sound-effects/small-cough.m4a"],
          loop: false,
          volume: 0.5,
          html5: true,
          pool: 1,
          mute: this.isMuted
        }),

        stack: new Howl({
          src: ["/sound-effects/stacking.m4a"],
          loop: false,
          volume: 0.5,
          html5: true,
          pool: 1,
          mute: this.isMuted
        }),

        gameOver: new Howl({
          src: ["/sound-effects/looser.m4a"],
          loop: false,
          volume: 0.5,
          html5: true,
          pool: 1,
          mute: this.isMuted
        })
      }
    };
  },

  methods: {
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.$store.commit("ui/TOGGLE_MUTE");
      Object.keys(this.sound).forEach(key => {
        const item = this.sound[key];
        item.mute();
        if (this.isMuted) {
          item.stop();
        }
      });
    },

    mainSoundtrack(track, route) {
      return {
        play: () => {
          if (!this.isMuted) {
            this.sound[track].play();
          }

          window.onblur = () => {
            this.sound[track].stop();
          };

          window.onfocus = () => {
            if (this.$route.name === route && !this.isMuted) {
              this.sound[track].play();
            }
          };
        },

        stop: () => {
          this.sound[track].stop();
        }
      };
    }
  },

  created() {
    this.isMuted = this.$store.state.ui.muteSound;
  }
};
