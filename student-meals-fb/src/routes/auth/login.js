import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "$lib/firebase";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function GET() {
  try {
    const response = await signInWithPopup(auth, provider);
    const token = GoogleAuthProvider.credentialFromResult(response) || "";
    console.log(token);
    return {
      headers: {
        //'set-cookie': token,
      },

    };
  } catch (error) {
    return {
      status: 403,
      body: {
        error: "error"
      }
    }
  }
}