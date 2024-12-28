import { Platform } from 'react-native';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// iOS ve Android Firebase Configurations
const firebaseConfig = Platform.select({
  ios: {
    apiKey: 'AIzaSyC4CAR2sBqx7N0zAMzx2rwq8XawnyWkvWM', // iOS GoogleService-Info.plist'ten
    authDomain: 'mobilgelistirme-5c9bb.firebaseapp.com',
    projectId: 'mobilgelistirme-5c9bb',
    storageBucket: 'mobilgelistirme-5c9bb.firebasestorage.app',
    messagingSenderId: '320851901208',
    appId: '1:320851901208:ios:e711541b77c51d59adfc6d',
  },
  android: {
    apiKey: 'AIzaSyBbPaLz4RyXLgaOGj9T4AzEwRHAUx20QsQ', // Android google-services.json'dan
    authDomain: 'mobilgelistirme-5c9bb.firebaseapp.com',
    projectId: 'mobilgelistirme-5c9bb',
    storageBucket: 'mobilgelistirme-5c9bb.firebasestorage.app',
    messagingSenderId: '320851901208',
    appId: '1:320851901208:android:17f25b1ea777658eadfc6d',
  },
});

// Initialize Firebase App
const app= !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
