// setting up firebase with our website
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCCBw0NE6bVkgCrBUxrr0MqmVV4Kb4kRb0",
    authDomain: "ai-music-database.firebaseapp.com",
    projectId: "ai-music-database",
    storageBucket: "ai-music-database.appspot.com",
    messagingSenderId: "763022929573",
    appId: "1:763022929573:web:010de66e1954a3aa4d274c",
    measurementId: "G-XG9FWWJ9KN"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// Sign up function
function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User signed up:', user);
        // Additional actions after sign up if needed
      })
      .catch((error) => {
        console.error('Sign up error:', error.message);
        alert(error.message);
      });
  }
  

// Sign In function
const signIn = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        // Additional actions after login if needed
      // Redirect to dashboard.html after successful login
      window.location.href = 'dashboard.html';
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        alert(error.message);
      });
  }
