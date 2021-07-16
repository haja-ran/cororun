export default {
  mode: "spa",
  server: {
    port: 8000, // par défaut: 3000
    host: "0.0.0.0" // par défaut: localhost
  },
  /*
   ** Headers of the page
   */
  head: {
    title: "Cororun - The Game",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, height=height, initial-scale=1, user-scalable=no"
      },
      {
        hid: "description",
        name: "description",
        content: "Get that toilet paper or die trying"
      },
      // Open Graph
      { name: "og:title", content: "Cororun - The Game" },
      {
        name: "og:description",
        content: "Get that toilet paper or die trying"
      },
      { name: "og:type", content: "website" },
      { name: "og:url", content: "https://nuxtjs.org" },
      { name: "og:image", content: "/img/background@2x.jpg" },
      // Twitter Card
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@cororun" },
      { name: "twitter:creator", content: "@cororun" },
      { name: "twitter:title", content: "Cororun - The Game" },
      {
        name: "twitter:description",
        content: "Get that toilet paper or die trying"
      },
      { name: "twitter:image", content: "/img/background@2x.jpg" }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "57x57",
        href: "/apple-icon-57x57.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "60x60",
        href: "/apple-icon-60x60.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "72x72",
        href: "/apple-icon-72x72.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/apple-icon-76x76.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "114x114",
        href: "/apple-icon-114x114.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "120x120",
        href: "/apple-icon-120x120.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/apple-icon-144x144.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "152x152",
        href: "/apple-icon-152x152.png"
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-icon-180x180.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/android-icon-192x192.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96x96.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      {
        rel: "manifest",
        href: "/manifest.json"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["~/assets/styles/main.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/vue-social-sharing.js", "~/plugins/game-patch.js"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/google-analytics"],
  googleAnalytics: {
    id: "UA-160152676-1"
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    ["nuxt-buefy", { css: false }],
    "@nuxtjs/pwa"
  ],
  manifest: {
    name: "Cororun - The game",
    short_name: "Cororun",
    theme_color: "#210E1C",
    background_color: "#210E1C",
    lang: "en",
    display: "standalone"
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
