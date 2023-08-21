require("dotenv").config();
const routes = require("./routes/index.js");
const webpack = require("webpack");

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode

  env: {
    apiUrl: process.env.API_URL,
    monoPublicKey: process.env.MONO_PUBLIC_KEY,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: process.env.APP_NAME,
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/assets/img/favicon.png" },
      {
        rel: "apple-touch-icon",
        sizes: "76x76",
        href: "/assets/img/apple-icon.png",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700",
      },
      { rel: "stylesheet", href: "/assets/css/nucleo-icons.css" },
      { rel: "stylesheet", href: "/assets/css/nucleo-svg.css" },
      { rel: "stylesheet", href: "/assets/css/nucleo-svg.css" },
      { rel: "stylesheet", href: "/assets/css/soft-ui-dashboard.css" },
    ],
    script: [
      {
        src: "https://kit.fontawesome.com/42d5adcbca.js",
        crossorigin: "anonymous",
      },
      { src: "/assets/js/core/popper.min.js" },
      { src: "/assets/js/core/bootstrap.min.js" },
      { src: "/assets/js/plugins/perfect-scrollbar.min.js" },
      { src: "/assets/js/plugins/smooth-scrollbar.min.js" },
      { src: "/assets/js/plugins/chartjs.min.js" },
      { src: "https://buttons.github.io/buttons.js", async: true, defer: true },
      { src: "/assets/js/soft-ui-dashboard.min.js?v=1.0.3" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axios",
    "~/plugins/vform.js",
    { src: "@/plugins/sweetalert", ssr: false },
    { src: "@/plugins/moment", ssr: false },
    { src: "@/plugins/mono", ssr: false },
    { src: "@/plugins/phone-number", ssr: false },
    { src: "@/plugins/date-picker", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    [
      "@netsells/nuxt-hotjar",
      {
        id: "3259930",
        sv: "6",
      },
    ],
  ],

  axios: {
    baseURL: process.env.API_URL,
  },

  module: {
    rules: [
      {
        test: /\.postcss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
          },
        ],
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
        moment: "moment",
        // $: 'jquery',
        // jQuery: 'jquery'
      }),
    ],
  },

  extend(config, ctx) {
    config.resolve.symlinks = false;
  },

  router: {
    middleware: "check-auth",
    linkExactActiveClass: "active",
    extendRoutes(nuxtRoutes, resolve) {
      routes.forEach((route) => {
        nuxtRoutes.push({
          name: route.name,
          path: route.path,
          component: resolve(__dirname, route.component),
        });
      });
    },
  },

  hooks: {
    build: {
      done(builder) {
        // Copy dist files to public/_nuxt
        if (
          builder.nuxt.options.dev === false &&
          builder.nuxt.options.mode === "spa"
        ) {
          const publicDir = join(
            builder.nuxt.options.rootDir,
            "public",
            "_nuxt"
          );
          removeSync(publicDir);
          copySync(join(builder.nuxt.options.generate.dir, "_nuxt"), publicDir);
          copySync(
            join(builder.nuxt.options.generate.dir, "200.html"),
            join(publicDir, "index.html")
          );
        }
      },
    },
  },
};
