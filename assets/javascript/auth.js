 // Initialize Firebase
 var config = {
   apiKey: "AIzaSyDjD05ntWCf-Ww_TdGeCa9_JhfEc_tbUh4",
   authDomain: "project1-8d4f2.firebaseapp.com",
   databaseURL: "https://project1-8d4f2.firebaseio.com",
   projectId: "project1-8d4f2",
   storageBucket: "project1-8d4f2.appspot.com",
   messagingSenderId: "933735402646"
 };
 firebase.initializeApp(config);

 // Initialize the FirebaseUI Widget using Firebase.
 var ui = new firebaseui.auth.AuthUI(firebase.auth());

 var uiConfig = {

   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.

   signInSuccessUrl: 'search.html',
   signInOptions: [
     // Leave the lines as is for the providers you want to offer your users.
     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
     firebase.auth.GithubAuthProvider.PROVIDER_ID,

     //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
     //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
     
     firebase.auth.EmailAuthProvider.PROVIDER_ID,
     firebase.auth.PhoneAuthProvider.PROVIDER_ID
   ],
 };

 // The start method will wait until the DOM is loaded.
 ui.start('#firebaseui-auth-container', uiConfig);