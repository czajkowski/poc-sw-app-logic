self.addEventListener('install', (event) => {
  console.log('SW: Installed');
});

self.addEventListener('activate', (event) => {
    console.log('SW: Active');

});

self.addEventListener('message', (event) => {
  console.log('SW: Message:', event.data);
});
