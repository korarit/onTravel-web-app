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
    '@nuxtjs/cloudinary',
    'vue3-carousel-nuxt',
    '@nuxtjs/turnstile',
    'nuxt3-leaflet',
    '@nuxt/image',
    '@samk-dev/nuxt-vcalendar',
    ['@nuxtjs/google-fonts',{
      families:{
        Kanit: [100,200,300,400,500,600,700,800,900]
      }
    }]
  ],
  build: {
    transpile: ['@fortawesome/vue-fontawesome']
  },
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
      WEB_URL: process.env.WEB_URL as string,
      BACKEND_URL: process.env.BACKEND_URL as string,
    }
  }
})