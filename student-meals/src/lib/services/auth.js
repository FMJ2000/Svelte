import createAuth0Client from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "$lib/stores/auth";
import config from "$lib/config/auth_config";

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
  try {
    await client.loginWithPopup(options);
    await setUser(client);
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

/** 
 * @param {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/Auth0Client").default} client
 */
export async function setUser(client) {
  const authUser = await client.getUser() || {};
  const response = await fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
      id: authUser.sub,
      name: authUser.nickname,
      email: authUser.email,
      verified: authUser.email_verified,
      picture: authUser.picture,
    }),
    headers: { "content-type": "application/json" },
  });
  const dbUser = await response.json();
  user.set(dbUser);
}