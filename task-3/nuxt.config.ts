// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  css: ["~/assets/css/global.scss"],
  vite: {
      css: {
          preprocessorOptions: {
              scss: {
                  additionalData: `@import "~/assets/css/utils/_variables.scss";`,
              },
          },
      },
  },
  alias:{
    "assets": "/assets",
    "public": "/public"
  },
})
