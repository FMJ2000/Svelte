import { writable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, db } from "$lib/firebase";

/** @type {import("$lib/types").User} */
const initUser = {
  displayName: null,
  email: null,
  emailVerified: false,
  phoneNumber: null,
  photoURL: null,
  recipes: [],
  uid: null,
};

export const userStore = writable(initUser, set => {
  onAuthStateChanged(auth, u => u
    ? set({
      displayName: u.displayName,
      email: u.email,
      emailVerified: u.emailVerified,
      phoneNumber: u.phoneNumber,
      photoURL: u.photoURL,
      recipes: [],
      uid: u.uid,
    })
    : set(initUser)
  );
});

/** @param {import("$lib/types").User} user */
export async function getRecipes(user) {
  const uq = await getDocs(query(collection(db, "users"), where("uid", "==", user.uid)));
  uq.forEach((doc) => {
    const q = query(collection(db, "recipes"), where("uid", "==", doc.id), orderBy("created"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      /** @type {import("$lib/types").Recipe[]} */
      let recipes = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        recipes.push({
          created: data.created,
          description: data.description,
          id: doc.id,
          ingredients: data.ingredients,
          name: data.name,
          steps: data.steps,
          uid: data.uid,
        });
      });
      userStore.update(user => user = {...user, recipes: recipes});
    })
  });
}