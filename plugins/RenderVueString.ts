// plugins/RenderVueString.ts
import { defineNuxtPlugin } from '#app'
import { h, compile } from 'vue'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('RenderVueString', {
    props: {
      html: {
        type: String,
        required: true
      }
    },
    render() {
      return h(compile(this.html), {$emit: this.$emit})
    }
  })
})
