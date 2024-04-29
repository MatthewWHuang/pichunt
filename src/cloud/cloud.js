// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from "firebase/storage";
import { getDatabase, ref as databaseRef, set, get } from "firebase/database";

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
    databaseURL: "https://pichunt-fa4db-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);

function uploadFile(file, gameID, task, user) {
    const storageRef = ref(storage, `/${gameID}/${task}/${user}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file);
}

function getFileRef(gameID, task, user) {
    return ref(storage, `/${gameID}/${task}/${user}`);
}

function downloadFile(ref) {
    return getDownloadURL(ref);
}

async function getUsersForTask(gameID, task) {
    const storageRef = ref(storage, `/${gameID}/${task}`);
    return await listAll(storageRef);
}

function setWinner(gameID, task, winner) {
    const ref = databaseRef(database, `/${gameID}/${task}/winner`);
    set(ref, winner);
}

async function gameExists(gameID) {
    const ref = databaseRef(database, `/${gameID}`);
    return (await get(ref)).exists();
}

async function loadGame(gameID) {
    const ref = databaseRef(database, `/${gameID}`);
    return Object.values((await get(ref)).toJSON()).map((task) => {
        return { ...task, completed: false };
    });
}

export {
    uploadFile,
    downloadFile,
    getUsersForTask,
    setWinner,
    loadGame,
    gameExists,
    getFileRef,
};
