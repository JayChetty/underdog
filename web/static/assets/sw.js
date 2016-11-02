

self.addEventListener('install', function(event) {
  console.log("install event listener")
});


// setInterval(function(){
//   console.log("helloasd from sw", self);
//   fetch("/api/weeks")
//   .then(function(response){
//     console.log('response', response)
//     return response.json()
//   })
//   .then(function(body){
//     self.registration.showNotification("Lalala")
//   })
// }, 3000);
//curl --header "Authorization: key=AIzaSyCc96PYoEamdZQNxh-SJDEqemTGFPhf_pM" --header "Content-Type: application/json" https://fcm.googleapis.com/fcm/send -d "{\"registration_ids\":[\"dF15A3EGiu4:APA91bGBU022bOa_0xlzBf9…2OJl3-N1qU3mGFOQWWuN6zB8h7IbypYbySZ_Xgn52ccKMpiRYb-9KPOLfjj0kBLp7ra7YqZLkf\"]}"
// self.addEventListener("push", function(event){
//   console.log('got push');
//   event.waitUntil(
//     self.registration.showNotification("SENDING A MESSAGE FROM PUSH")
//   );
// })



// var config = {
//   messagingSenderId: "861414133939"
// };
// firebase.initializeApp(config);
// var messaging = firebase.messaging();
//
//
// messaging.setBackgroundMessageHandler(function(payload){
//   self.registration.showNotification("SENDING A MESSAGE FROM PUSH")
// })
