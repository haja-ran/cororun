<template>
  <div class="window is-relative" :style="style">
    <nuxt />

  </div>
</template>

<script>
export default {
  data() {
    return {
      viewportHeight: 0
    };
  },

  computed: {
    style() {
      return `min-height: ${this.viewportHeight}px; `;
    }
  },

  methods: {
    adjustHeight() {
      this.viewportHeight = document.documentElement.clientHeight;
      window.addEventListener("resize", () => {
        this.viewportHeight = this.viewportHeight =
          document.documentElement.clientHeight;
      });
    },

    getCookieConsent() {
      this.$buefy.snackbar.open({
        indefinite: true,
        message: `
          This website uses cookies 
          as a method of collecting website 
          statistics and to save you score. 
          By continuing to use this website, 
          or by returning to it at any time, 
          you accept our 
          <a href="/privacy">Privacy policy</a>`,
        type: "is-warning",
        position: "is-bottom-left",
        actionText: "Okay",
        queue: false,
        onAction: () => {
          window.localStorage.setItem("COOKIECONSENT", "yes");
        }
      });
    }
  },

  mounted() {
    this.adjustHeight();
    const cookieConsent = window.localStorage.getItem("COOKIECONSENT");
    if (!cookieConsent) {
      this.getCookieConsent();
    }
  }
};
</script>

<style lang="scss">
.window {
  overflow: hidden;
}
</style>