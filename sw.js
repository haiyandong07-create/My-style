
const CACHE_NAME = 'style-genie-v1.1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.tsx',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap'
];

// 安装阶段：预缓存资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在预缓存核心资源...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});

// 拦截请求：优先从缓存读取，实现离线使用
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // 对于外部 API 请求或图片，动态缓存
        if (event.request.url.includes('unsplash') || event.request.url.includes('flaticon')) {
           return caches.open(CACHE_NAME).then((cache) => {
             cache.put(event.request, fetchResponse.clone());
             return fetchResponse;
           });
        }
        return fetchResponse;
      });
    }).catch(() => {
      // 离线时如果没找到资源，可以返回一个备用页面或资源
      console.log('Fetch 失败，处于离线状态且资源未缓存');
    })
  );
});
