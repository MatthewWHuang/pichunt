// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqilpIziE6w7O-5SKuIFW6WL6hG4nyYxY",
    authDomain: "pichunt-fa4db.firebaseapp.com",
    projectId: "pichunt-fa4db",
    storageBucket: "pichunt-fa4db.appspot.com",
    messagingSenderId: "998626021513",
    appId: "1:998626021513:web:7362387e68dd4303a3b658",
    measurementId: "G-0K7QB2X46S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

function uploadFile(file, gameID, task, user) {
    const storageRef = ref(storage, `/${gameID}/${task}/${user}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded image!");
    });
}

export { uploadFile };
