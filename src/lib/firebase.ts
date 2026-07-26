import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import config from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(config);
export const db = getFirestore(app, config.firestoreDatabaseId || undefined);

export { doc, getDoc, setDoc, onSnapshot };
