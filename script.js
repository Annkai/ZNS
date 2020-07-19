"use strict";

var signUpButton =  document.getElementById('signUpButton');
var signUpListButton =  document.getElementById('signUpListButton');
var signUpCont =  document.getElementById('signUpCont');
var googlePlayButton = document.getElementById('googlePlayButton');
var closeSignUpCont = document.getElementById('closeSignUpCont');
var closeSignInCont = document.getElementById('closeSignInCont');
var signInCont = document.getElementById('signInCont');
var signInButton = document.getElementById('signInButton');
var signInInCont = document.getElementById('signInInCont');
var signUpInCont = document.getElementById('signUpInCont');
var signUpEmail = document.getElementById('signup-email');
var errRegEmailCont =  document.getElementById('errRegEmailCont');
var regEmailSignIn = document.getElementById('regEmailSignIn');

// Регистрация
const signUpForm = document.querySelector('#signup-form');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;

    
    
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            email: signUpForm['signup-email'].value
        });
    }).then(() => {
        signUpForm.reset();
        focusEmailForm();
        document.location.replace("contact_page.html");
    });

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/email-already-in-use') {
    signUpEmail.style.borderColor = '#FF4040';
    errRegEmailCont.style.display = 'block';
    signUpCont.style.height = '605px';
    signUpButton.style.paddingTop = '2px';
  }
  else {
    alert(errorMessage);
  }
  console.log(error);
});


});

//Валидация формы - Зарегистрированная почта

signUpEmail.addEventListener('focus', focusEmailForm, false);
function focusEmailForm (EO) {
  EO=EO||window.event;
  signUpEmail.style.borderColor = '#C4CDD5';
  errRegEmailCont.style.display = 'none';
  signUpCont.style.height = '597px';
}


// Вход в личный кабинет
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
        
    // login the user
    auth.signInWithEmailAndPassword(email, password).then(cred => {
        loginForm.reset();
        document.location.replace("contact_page.html");
    });
});


// -------------------------------------------------------------------------------
// Войти с помощью Google
  var googleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth().signInWithPopup(provider).then(function(result) {

        document.location.replace("contact_page.html");
        console.log("Success! You've signed in with Google");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        var currentUserUid = firebase.auth().currentUser.uid; 
        console.log(result.user.Sb.email);

        db.collection('users').doc(currentUserUid).set({
            firstName: result.user.Sb.displayName,
            lastName: result.user.Sb.displayName,
            email: result.user.Sb.email
        });

        }).catch(function(error) {
            console.log("Fail! You haven't signed in with Google");
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        });
}


// -------------------------------------------------------------------------------
// Войти с помощью Facebook

 var facebookSignIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().useDeviceLanguage();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        document.location.replace("contact_page.html");
        console.log("Success! You've signed in with Facebook");
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        var currentUserUid = firebase.auth().currentUser.uid; 
        console.log(result.user.Sb.email);

        db.collection('users').doc(currentUserUid).set({
            firstName: result.user.Sb.displayName,
            lastName: result.user.Sb.displayName,
            email: result.user.Sb.email
        });

        }).catch(function(error) {
            console.log("Fail! You haven't signed in with Facebook");
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if (errorCode == 'auth/account-exists-with-different-credential') {
             alert('An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.');
            }
           else {
           alert(errorMessage);
            }
           console.log(error);
            });
          }


// var facebookSignUp = document.getElementById('facebookSignUp');

// facebookSignUp.addEventListener('click', signUpFace, false);
// function signUpFace (EO) {
//   EO=EO||window.event;
//   EO.preventDefault();

//  var provider = new firebase.auth.FacebookAuthProvider();
//  provider.addScope('user_birthday');
//  firebase.auth().useDeviceLanguage();
 
// firebase.auth().signInWithPopup(provider).then(function(result) {
//     document.location.replace("contact_page.html");
//   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...


// }).catch(function(error) {
 
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });

// }


// Page 1 - Start Page

signUpInCont.addEventListener('click', signUp, false);
signUpListButton.addEventListener('click', signUp, false);
signUpButton.addEventListener('click', signUp, false);
function signUp (EO) {
  EO=EO||window.event;
  EO.preventDefault();
  signUpCont.style.display = 'block';
  signInCont.style.display = 'none';
}

//Закрытие окна Sign Up
closeSignUpCont.addEventListener('click', closeSignUp, false);
function closeSignUp (EO) {
  EO=EO||window.event;
  signUpCont.style.display = 'none';
}

//Page 3 - Sign In

regEmailSignIn.addEventListener('click', signIn, false);
signInInCont.addEventListener('click', signIn, false);
signInButton.addEventListener('click', signIn, false);
function signIn (EO) {
  EO=EO||window.event;
  EO.preventDefault();
  signInCont.style.display = 'block';
  signUpCont.style.display = 'none';
}

//Закрытие окна Sign In
closeSignInCont.addEventListener('click', closeSignIn, false);
function closeSignIn (EO) {
  EO=EO||window.event;
  signInCont.style.display = 'none';
}


