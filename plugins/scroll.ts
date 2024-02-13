import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    //console.log("Page finished loading..");
    let main = document.getElementById('main');
    if (main) {
      main.scrollTo(0, 0);
    }
  })
})