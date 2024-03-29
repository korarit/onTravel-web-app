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
    }],
    '@sidebase/nuxt-auth',
    'nuxt-delay-hydration',

  ],
  auth: {
    globalAppMiddleware: true,
    baseURL: process.env.BACKEND_URL as string + '/authentication',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        register: { path: '/register_user', method: 'post' },
        signOut: { path: '/logout', method: 'delete' },
        getSession: { path: '/session', method: 'get' }
      },
      token: {
        signInResponseTokenPointer: '/login_token',
      },
      pages:{
        login: '/'
      },
      parseResponse: function(response: any){
        return {
          success: response.success,
          message: response.message,
          login_token: response.login_token,
          name: response.name,
          last_name: response.last_name,
          profile_img: response.profile_img
        }
      }
    }

  },
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

    },
  },
  delayHydration: { 
    mode: 'init',
    // enables nuxt-delay-hydration in dev mode for testing  
    debug: false
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  },
  app: {
    head: {
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }]
    }
  },
  vite: {
    define: {
      'process.env': {},
      global: 'globalThis',
    },
  },
})