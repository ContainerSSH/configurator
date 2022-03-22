module.exports = {
  integrity: true,

  transpileDependencies: [
    'vuetify'
  ],

  pages: {
    index: {
      entry: "./src/main.ts",
      template: "public/index.html",
      title: "Web Configurator",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },

  pwa: {
    name: 'Web Configurator'
  }
}
