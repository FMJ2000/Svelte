<script>
import { page } from "$app/stores";
import { user } from "$lib/stores";

/** @type {() => Promise<void>} */
export let login;
/** @type {() => Promise<void>} */
export let logout;
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
        {#if $user}
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === "/recipes"} href="/recipes">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === "/recipes/user"} href="/recipes/user">My Recipes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" class:active={$page.url.pathname === "/recipes/edit"} href="/recipes/edit">Create</a>
            </li>
          </ul>
        {/if}
        <ul class="navbar-nav ms-auto">
          {#if $user}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {$user.name}
            </a>
            <ul class="dropdown-menu" aria-labelledby="profileDropdown">  
              <li><a class="dropdown-item" href="/user/profile">Profile</a></li>
              <li><a class="dropdown-item" on:click={logout} href="/#">Logout</a></li>
            </ul>
          </li>
          {:else}
          <li class="nav-item"><a class="nav-link" on:click={login} href="/">Login</a></li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
</header>