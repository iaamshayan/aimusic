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
  // Function to identify music
function identifyMusic() {
    const fileInput = document.getElementById('file-input');
    const resultContainer = document.getElementById('result-container');
  
    const file = fileInput.files[0];
  
    if (file) {
      // Perform music identification using machine learning algorithms
      // Simulate a delay for demonstration purposes
      setTimeout(() => {
        const identificationResult = {
          song: 'Example Song',
          artist: 'Example Artist',
          lyrics: 'Example lyrics...',
        };
  
        displayResult(identificationResult);
      }, 2000);
    } else {
      alert('Please select an audio file.');
    }
  }
  
  // Function to display identification results
  function displayResult(result) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
      <h2>Identification Result</h2>
      <p><strong>Song:</strong> ${result.song}</p>
      <p><strong>Artist:</strong> ${result.artist}</p>
      <p><strong>Lyrics:</strong> ${result.lyrics}</p>
    `;
  }

  const logout = () => {
    auth.signOut()
      .then(() => {
        // Redirect to the login page or perform any other actions after logout
        window.location.href = "signIn.html"; // Adjust the URL based on your project structure
      })
      .catch((error) => {
        console.error('Logout error:', error.message);
      });
  };

// Attach the submit event handler to the form
new Vue({
  el: '#app',
  data: {
    user: null,
    isAdmin: false,
    feedback: '',
    feedbackList: []
  },
  mounted() {
    // Check if a user is logged in
    auth.onAuthStateChanged((user) => {
      this.user = user;
      
      // Fetch feedback from Firebase
      this.fetchFeedback();

      // Check if the user is an admin
      if (user) {
        db.collection('admins').doc(user.uid).get()
          .then(doc => {
            this.isAdmin = doc.exists;
          });
      }
    });
  },
  methods: {
    submitFeedback() {
      if (this.feedback.trim() !== '') {
        // Save feedback to Firebase
        db.collection('feedback').add({
          feedback: this.feedback,
          email: this.user ? this.user.email : '',
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          // Clear the feedback input
          this.feedback = '';
        })
        .catch(error => {
          console.error('Error saving feedback:', error);
        });
      }
    },
    fetchFeedback() {
      // Fetch feedback from Firebase
      db.collection('feedback').orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
        this.feedbackList = [];
        querySnapshot.forEach((doc) => {
          this.feedbackList.push({ id: doc.id, ...doc.data() });
        });
      });
    }
  }
});