import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Platform-specific Firebase configurations
const firebaseConfig = Platform.select({
  ios: {
    apiKey: 'AlzaSyC4CAR2sBqx7N0zAMzx2rwq8XawnyWkvWM',
    authDomain: 'mobilgelistirme-5c9bb.firebaseapp.com',
    projectId: 'mobilgelistirme-5c9bb',
    storageBucket: 'mobilgelistirme-5c9bb.firebasestorage.app',
    messagingSenderId: '320851901208',
    appId: '1:320851901208:ios:e711541b77c51d59adfc6d',
  },
  android: {
    apiKey: 'AlzaSyDxWsz81yqa6FngJhDCKtdXOgSEow76Ou4',
    authDomain: 'mobilgelistirme-5c9bb.firebaseapp.com',
    projectId: 'mobilgelistirme-5c9bb',
    storageBucket: 'mobilgelistirme-5c9bb.firebasestorage.app',
    messagingSenderId: '320851901208',
    appId: '1:320851901208:android:17f25b1ea777658eadfc6d',
  },
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
