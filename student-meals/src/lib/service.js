import createAuth0Client from "@auth0/auth0-spa-js";
import { user } from "$lib/stores";
import config from "$lib/config";

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
  try {
    await client.loginWithPopup(options);
    await setUser(client);
  } catch (e) {
    console.error(e);
  }
}

/** 
 * @param {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/Auth0Client").default} authClient
 */
export async function setUser(authClient) {
  const authUser = await authClient.getUser() || {};
  if (authUser.sub) {
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
    isAuthenticated.set(await authClient.isAuthenticated());
  } else {
    user.set({});
  }
}