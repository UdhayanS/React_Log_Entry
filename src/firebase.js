

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, update, remove, get } from 'firebase/database';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCwh35Hcglkq8gnsgOXlHGoqW4rbhQQYE0",
    authDomain: "expanse-e4c46.firebaseapp.com",
    databaseURL: "https://expanse-e4c46-default-rtdb.firebaseio.com",
    projectId: "expanse-e4c46",
    storageBucket: "expanse-e4c46.appspot.com",
    messagingSenderId: "425816980765",
    appId: "1:425816980765:web:ff1a7731ad7255814375f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to add a shift log
export const addShiftLog = async (shiftLog) => {
  try {
    const shiftLogsRef = ref(database, 'shiftLogs');
    const newShiftLogRef = ref(database, 'shiftLogs/' + new Date().getTime());
    await set(newShiftLogRef, shiftLog);
  } catch (error) {
    console.error('Error adding shift log: ', error);
  }
};

// Function to fetch shift logs
export const fetchShiftLogs = async (callback) => {
  try {
    const shiftLogsRef = ref(database, 'shiftLogs');
    const snapshot = await get(shiftLogsRef);
    if (snapshot.exists()) {
      callback(snapshot.val());
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Error fetching shift logs: ', error);
  }
};

// Function to delete a shift log
export const deleteShiftLog = async (id) => {
  try {
    const shiftLogRef = ref(database, 'shiftLogs/' + id);
    await remove(shiftLogRef);
  } catch (error) {
    console.error('Error deleting shift log: ', error);
  }
};
