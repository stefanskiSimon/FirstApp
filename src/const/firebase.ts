import firebase from 'firebase/compat';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDbmCbQUeeGtYzNSyVuJIh79fKd882OL8Y",
    authDomain: "testapp-88e5e.firebaseapp.com",
    projectId: "testapp-88e5e",
    storageBucket: "testapp-88e5e.appspot.com",
    messagingSenderId: "643470650056",
    appId: "1:643470650056:web:1f828790698e8c81d693fd"
  };

firebase.initializeApp(firebaseConfig)
var db = firebase.firestore()