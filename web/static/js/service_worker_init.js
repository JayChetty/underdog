// export default function init(){
//   console.log("starting service worker")
//   var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === '[::1]' ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//       /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//     )
//   );
//
//   //SW setup
//   if ('serviceWorker' in navigator &&
//       (window.location.protocol === 'https:' || isLocalhost)) {
//     navigator.serviceWorker.register('/sw.js')
//     .then(function(registration) {
//       // var config = {
//       //   apiKey: "AIzaSyAzIdDH3G6RkLKFNkZP3xjRnQgjmSD6Upc",
//       //   authDomain: "underdog-messenger.firebaseapp.com",
//       //   databaseURL: "https://underdog-messenger.firebaseio.com",
//       //   storageBucket: "underdog-messenger.appspot.com",
//       //   messagingSenderId: "861414133939"
//       // };
//       // firebase.initializeApp(config);
//       // messaging = firebase.messaging();
//       // messaging.useServiceWorker(registration)
//       //
//       // messaging.getToken()
//       // .then(function(token){
//       //   console.log("mytoken", token)
//       // })
//
//       // messaging.onTokenRefresh(function(){
//       //   console.log('token refresh')
//       //   messaging.getToken()
//       //   .then(function(refreshedToken){
//       //     console.log("refreshedtoke", refreshedToken)
//       //   })
//       // })
//       // updatefound is fired if service-worker.js changes.
//       registration.onupdatefound = function() {
//         // updatefound is also fired the very first time the SW is installed,
//         // and there's no need to prompt for a reload at that point.
//         // So check here to see if the page is already controlled,
//         // i.e. whether there's an existing service worker.
//         if (navigator.serviceWorker.controller) {
//           // The updatefound event implies that registration.installing is set:
//           // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
//           var installingWorker = registration.installing;
//
//           installingWorker.onstatechange = function() {
//             switch (installingWorker.state) {
//               case 'installed':
//                 // At this point, the old content will have been purged and the
//                 // fresh content will have been added to the cache.
//                 // It's the perfect time to display a "New content is
//                 // available; please refresh." message in the page's interface.
//                 break;
//
//               case 'redundant':
//                 throw new Error('The installing ' +
//                                 'service worker became redundant.');
//
//               default:
//                 // Ignore
//             }
//           };
//         }
//       };
//     }).catch(function(e) {
//       console.error('Error during service worker registration:', e);
//     });
//   }
//
//   //NOTIFICATION
//   // if (Notification.requestPermission) {
//   //   Notification.requestPermission(function(result) {
//   //       console.log("Notificationission : ", result);
//   //   });
//   // } else {
//   //     console.log("Notificationssupported by this browser.");
//   // }
//
//
//   //PUSH
//   // if (navigator.serviceWorker.controller) {
//   //   navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
//   //       serviceWorkerRegistration.pushManager.subscribe({
//   //               userVisibleOnly: true
//   //           })
//   //           .then(function(subscription) {
//   //               console.log("SubscriptionPush successful: ", subscription);
//   //           })
//   //           .catch(function(error) {
//   //               console.log("SubscriptionPush failed", error);
//   //           });
//   //   });
//   // } else {
//   //     console.log("Nove ServiceWorker");
//   // }
// }
//
// // dF15A3EGiu4:APA91bGBU022bOa_0xlzBf9…2OJl3-N1qU3mGFOQWWuN6zB8h7IbypYbySZ_Xgn52ccKMpiRYb-9KPOLfjj0kBLp7ra7YqZLkf


//curl --header "Authorization: key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"registration_ids\":[\"cNWRozMIF1U:APA91bHzlqXEEG0_T1zZ_61Inyq0anuv3ZVw73kgk09OPXXD_kXH3E_QWnc1QKrtMvPTKiMxUvwDD5xGKYW1F9ijvMv6Yjqo0S2nctfkGFwXBwvn19N0sWkdD5JFI-kav4R4RNv3vrFi\"]}"
