import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "$lib/stores/auth";
import config from "$lib/config/auth_config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createClient() {
  return await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
}

/** 
 * @param {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/Auth0Client").default} client
 * @param {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/global").PopupLoginOptions} options
 */
export async function loginWithPopup(client, options) {
  popupOpen.set(true);
  console.log("options", options)
  try {
    await client.loginWithPopup(options);
    const authUser = await client.getUser() || {};
    const dbUser = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        id: authUser.sub,
        name: authUser.nickname,
        email: authUser.email,
      }),
      headers: { "content-type": "application/json" },
    });
    console.log(dbUser);
    user.set(dbUser);
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}