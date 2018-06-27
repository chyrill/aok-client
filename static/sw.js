importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "aok.client",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.679dda00106c09b9e741e66ee7e4dd3b.css",
    "revision": "679dda00106c09b9e741e66ee7e4dd3b"
  },
  {
    "url": "/_nuxt/app.e61bf81852841b40d44b.js",
    "revision": "a9c3d485595801a760d58cf64444bbd2"
  },
  {
    "url": "/_nuxt/layouts_default.a8c193046cb14f734bec.js",
    "revision": "a2ecf5cfe2d70878d02a08bb4843da65"
  },
  {
    "url": "/_nuxt/manifest.d32b292cbb9c10a5a71c.js",
    "revision": "482f27d080a3342583f2ae253f2697af"
  },
  {
    "url": "/_nuxt/pages_artwork_index.cd1aa0f2227a433209cd.js",
    "revision": "96e0848adfe1158734bea60c8123649d"
  },
  {
    "url": "/_nuxt/pages_index.313e279b3788b5432819.js",
    "revision": "ada5ed5860549b3af0b36d75d8e3228c"
  },
  {
    "url": "/_nuxt/vendor.15d6f21ab708a4fa5caa.js",
    "revision": "3fbd035136642866defbd1982ce67fae"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

