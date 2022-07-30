import { session } from "$app/stores";
import { userStore } from "$lib/store";

/** @type {import("$lib/types").User} */
let user;
const unsubscribe = userStore.subscribe(u => user = u);

/** @type {import("./__types/").RequestHandler} */
export async function GET({ params }) {
  const msg = "hello";
  console.log(user);
  return {
    status: 200,
    headers: {},
    body: {
      msg
    },
  };
}