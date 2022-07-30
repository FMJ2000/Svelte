<script>
  import cookie from "cookie";
  let user = cookie.user;
</script>

<svelte:head>
  <title>Student Meals</title>
</svelte:head>

<header>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <a class="navbar-brand" href="/#">Student Meals</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/recipes">Recipes</a>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          {#if user}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {user.displayName}
            </a>
            <ul class="dropdown-menu" aria-labelledby="profileDropdown">  
              <li><a class="dropdown-item" href="/profile">Profile</a></li>
              <li><a class="dropdown-item" href="/auth/logout">Logout</a></li>
            </ul>
          </li>
          {:else}
          <li class="nav-item"><a class="nav-link" href="/auth/login">Login</a></li>
          {/if}
        </ul>
      </div>
    </div>
  </nav>
</header>

<main class="p-2">
  <slot />
</main>