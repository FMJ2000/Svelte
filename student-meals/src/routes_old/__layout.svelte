<script>
  import { onMount } from "svelte";
  import { page, session } from "$app/stores";
  import { createClient, loginWithPopup, setUser } from "$lib/service";
  import { isAuthenticated, user } from "$lib/stores/auth";

  /** @type {import(".pnpm/@auth0+auth0-spa-js@1.22.2/node_modules/@auth0/auth0-spa-js/dist/typings/Auth0Client").default} */
  let auth0Client;

  onMount(async () => {
    auth0Client = await createClient();
    await setUser(auth0Client);
    $session.user = $user.id;
  })
</script>

<svelte:head>
  <title>Student Meals</title>
</svelte:head>

<header>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="/#">Student Meals</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        {#if $isAuthenticated}
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === "/"} href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === `/user/${$user.id}/recipes/`} href="/user/{$user.id}/recipes">My Recipes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === `/user/${$user.id}/recipes/create`} href="/user/{$user.id}/recipes/create">Create</a>
            </li>
          </ul>
        {/if}
        <ul class="navbar-nav ms-auto">
          {#if $isAuthenticated}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {$user.name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="profileDropdown">  
              <li><a class="dropdown-item" href="/user/profile">Profile</a></li>
              <li><a class="dropdown-item" on:click={() => auth0Client.logout({ returnTo: window.location.origin })} href="/#">Logout</a></li>
            </ul>
          </li>
          {:else}
          <li class="nav-item"><a class="nav-link" on:click={() => loginWithPopup(auth0Client, {})} href="/#">Login</a></li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
</header>

<main class="p-2">
  {#if $isAuthenticated}
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