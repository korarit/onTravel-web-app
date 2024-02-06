// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind_main.css',
        '@fortawesome/fontawesome-svg-core/styles.css',
        'vue-final-modal/style.css'
      ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'vue3-carousel-nuxt',
    '@nuxtjs/turnstile',
    ['@nuxtjs/google-fonts',{
      families:{
        Kanit: [100,200,300,400,500,600,700,800,900]
      }
    }]
  ],
  imports:{
    dirs: [
      'composables',
      'composables/*/*.{ts,js,mjs,mts}'
    ]
  },
  turnstile: {
    siteKey: process.env.TURNSTILE_KEY as string,
  },
  runtimeConfig:{
    public:{
      BACKEND_URL: process.env.BACKEND_URL as string,
    }
  }
})