import { writable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "$lib/firebase";

/** @type {import("$lib/types").User} */
const initUser = {
  displayName: null,
  email: null,
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  uid: null,
  loggedIn: false,
};

export const userStore = writable(initUser, set => {
  onAuthStateChanged(auth, async (u) => {
    if (u) {
        set({
        displayName: u.displayName,
        email: u.email,
        emailVerified: u.emailVerified,
        phoneNumber: u.phoneNumber,
        photoURL: u.photoURL,
        uid: u.uid,
        loggedIn: true,
      });
    } else {
      set(initUser);
    }
  });
});