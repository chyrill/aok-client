importScripts('/_nuxt/workbox.3de3418b.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "aok.client",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.24b09acabb6d025827f1.js",
    "revision": "1de378f705a36d42d9b10ff259c11dd6"
  },
  {
    "url": "/_nuxt/app.679dda00106c09b9e741e66ee7e4dd3b.css",
    "revision": "679dda00106c09b9e741e66ee7e4dd3b"
  },
  {
    "url": "/_nuxt/layouts_default.9808969dc0ea9f1c733f.js",
    "revision": "3ee2aa54185a5773229e00b9dbcf03fc"
  },
  {
    "url": "/_nuxt/manifest.b32e92b5ae41a32d1b2b.js",
    "revision": "0db217c4b2e7bd99ff7544fc1e668ea1"
  },
  {
    "url": "/_nuxt/pages_artist_index.c830d7d7984c0d703edd.js",
    "revision": "593b4f0edeee3496923284e352da379e"
  },
  {
    "url": "/_nuxt/pages_artwork__category_index.07a0518fce68466614d3.js",
    "revision": "86a19b19946d41f7716ef4efef44a6c7"
  },
  {
    "url": "/_nuxt/pages_artwork_index.6f3755da24079a991f3c.js",
    "revision": "ddb3be4fc6cf9a3f58c67c09d7bfd304"
  },
  {
    "url": "/_nuxt/pages_charity__id_index.8af4ca8d0863eb95727b.js",
    "revision": "27e44936caa5eb09a8106ea75140beb0"
  },
  {
    "url": "/_nuxt/pages_charity_index.0804f93800ea0bbda799.js",
    "revision": "9d988214b19d48e87d93564a29bb5708"
  },
  {
    "url": "/_nuxt/pages_index.b4c51c8ed7861fbc3b21.js",
    "revision": "5b85d82875e51dc2ca5ea08ad7fc55f6"
  },
  {
    "url": "/_nuxt/vendor.f08166ac9b8abddd7e52.js",
    "revision": "11c87ccfcb4b299a7878bc898d0c10e6"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

