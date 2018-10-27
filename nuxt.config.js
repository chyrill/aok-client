module.exports = {
  /*
     ** Headers of the page
     */
  head: {
    title: "aok.client",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: "Artwork gallery"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/brand.ico"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Nunito+Sans:400,900,600"
      }
    ],
    script: [
      {
        src: "https://checkout.stripe.com/checkout.js"
      },
      {
        src: "https://js.stripe.com/v3/"
      }
    ]
  },
  plugins: ["~/plugins/vuetify.js"],
  css: ["~/assets/style/app.styl"],
  /*
     ** Customize the progress bar color
     */
  loading: {
    color: "#3B8070"
  },
  /*
     ** Build configuration
     */
  build: {
    vendor: ["~/plugins/vuetify.js",'graphql-tag','apollo-client'],
    extractCSS: true,
    /*
         ** Run ESLint on save
         */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        });
      }
    }
  },
  modules: ["@nuxtjs/pwa", "@nuxtjs/apollo"],
  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: "http://aok-backend.al:4000/graphql"
      }
    },
    errorHandler(error) {
      console.log(error)
    }
  }
};
