<script>
import { onMount } from "svelte";
import createAuth0Client from "@auth0/auth0-spa-js";
import config from "$lib/config";
import { user } from "$lib/stores";
import Navbar from "$lib/components/Navbar.svelte";

/** @type {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/Auth0Client").default} */
let client;
/** @type {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/global").User} */
let authUser;
$: setUser(authUser);

onMount(async () => {
  client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
  authUser = await client.getUser() || {};
});

async function login() {
  try {
    await client.loginWithPopup();
    authUser = await client.getUser() || {};
  } catch (e) {
    console.error(e);
  }
}

async function logout() {
  try {
    await client.logout({ returnTo: window.location.origin });
    authUser = await client.getUser() || {};
    await fetch("/api/logout", {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    user.set(null);
  } catch (e) {
    console.error(e);
  }
}

/** @param {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/global").User} authUser */
async function setUser(authUser) {
  if (authUser?.sub) {
    const response = await fetch("/api/login", {
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
}
</script>


<Navbar {login} {logout}/>
<main class="p-2">
  {#if $user}
    <slot />
  {:else}
    <div class="container p-2 d-flex">
      <div class="card shadow-sm mx-auto" style="max-width:25rem;">
        <div class="card-body text-center">
          <p>Please sign in to use app</p>
        </div>
      </div>
    </div>
  {/if}
</main>