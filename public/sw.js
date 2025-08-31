// Service Worker for Baa Language Documentation
const CACHE_NAME = 'baa-wiki-v1.0.0'
const STATIC_CACHE = 'baa-wiki-static-v1.0.0'
const DYNAMIC_CACHE = 'baa-wiki-dynamic-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/baa-wiki/',
  '/baa-wiki/index.html',
  '/baa-wiki/assets/',
  '/baa-wiki/logo.svg',
  '/baa-wiki/favicon.ico',
  '/baa-wiki/manifest.json'
]

// Install event - cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('Static files cached successfully')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('Error caching static files:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip external requests
  if (!url.origin.includes('omaraglan.github.io')) {
    return
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // Handle page requests
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached version and update in background
            fetch(request)
              .then(response => {
                if (response.status === 200) {
                  caches.open(DYNAMIC_CACHE)
                    .then(cache => cache.put(request, response.clone()))
                }
              })
              .catch(() => {
                // Network failed, keep using cached version
              })
            return cachedResponse
          }
          
          // No cache, fetch from network
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone))
              }
              return response
            })
        })
        .catch(() => {
          // Both cache and network failed, return offline page
          return caches.match('/baa-wiki/offline.html')
        })
    )
  } else if (request.destination === 'style' || request.destination === 'script') {
    // Handle CSS and JS files
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse
          }
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(STATIC_CACHE)
                  .then(cache => cache.put(request, responseClone))
              }
              return response
            })
        })
    )
  } else if (request.destination === 'image') {
    // Handle images
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse
          }
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone()
                caches.open(DYNAMIC_CACHE)
                  .then(cache => cache.put(request, responseClone))
              }
              return response
            })
        })
    )
  } else {
    // Handle other requests (API calls, etc.)
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE)
              .then(cache => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request)
        })
    )
  }
})

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle background sync tasks
      console.log('Background sync triggered')
    )
  }
})

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'تحديث جديد في لغة باء!',
    icon: '/baa-wiki/logo-192.png',
    badge: '/baa-wiki/logo-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'استكشف',
        icon: '/baa-wiki/icon-explore.png'
      },
      {
        action: 'close',
        title: 'إغلاق',
        icon: '/baa-wiki/icon-close.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('لغة باء', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/baa-wiki/')
    )
  }
})

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})