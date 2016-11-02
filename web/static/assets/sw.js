self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("install event listener")
});


setInterval(function(){
  console.log("helloasd from sw", self);
  fetch("/api/weeks")
  .then(function(response){
    console.log('response', response)
    return response.json()
  })
  .then(function(body){
    console.log("got the data", body, self)
    // Notification.requestPermission(function(status){
    //   new Notification("Hello")
    // })
    // var event = new NotificationEvent("hello", console.log)
    // ServiceWorkerRegistration.getNotification

  })
}, 3000);
