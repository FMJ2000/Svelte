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
    user.set(await client.getUser() || {});
    isAuthenticated.set(true);
  } catch (e) {
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}