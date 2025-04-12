// service-worker.js

const CACHE_NAME = 'portfolio-cache-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff',
    '/assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2',
    '/assets/vendor/swiper/swiper-bundle.min.js',
    '/assets/img/certificate/freecodecamp-csharp.webp',
    '/assets/img/certificate/freecodecamp-responsive-web-design.webp',
    '/assets/img/certificate/uom-python-1.webp',
    '/assets/img/projects/csharp.webp',
    '/assets/img/projects/flutter.webp',
    '/assets/img/projects/laravel.webp',
    '/assets/img/logo.webp',
    '/assets/img/my-profile-img.webp',
    '/assets/img/hero-bg-large.webp',
    '/assets/img/hero-bg-medium.webp',
    '/assets/img/hero-bg-small.webp',
    '/assets/img/og-image.webp',
    '/assets/img/twitter-image.webp',
];

// Cache files on install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Serve from cache
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            )
        )
    );
});
