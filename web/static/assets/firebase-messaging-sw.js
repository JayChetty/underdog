importScripts("https://www.gstatic.com/firebasejs/3.5.3/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js")

var config = {
  apiKey: "AIzaSyAzIdDH3G6RkLKFNkZP3xjRnQgjmSD6Upc",
  authDomain: "underdog-messenger.firebaseapp.com",
  databaseURL: "https://underdog-messenger.firebaseio.com",
  storageBucket: "underdog-messenger.appspot.com",
  messagingSenderId: "861414133939"
};
firebase.initializeApp(config);

var messaging = firebase.messaging();
