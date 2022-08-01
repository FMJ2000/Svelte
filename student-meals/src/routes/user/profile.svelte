<script>
  import { user } from "$lib/stores/auth";
</script>

<h4>Profile</h4>

<div class="card">
  <div class="card-body">
    <div class="d-flex">
      <img src={$user.picture} alt="profile" class="rounded-circle">
      <div class="flex-grow-1 px-2">
        <p>
          <span class="text-muted">name: </span>{$user.name}<br>
          <span class="text-muted">email: </span>{$user.email}
          {#if $user.verified}
            <i class="fa-solid fa-check text-success" />
          {:else}
            <i class="fa-solid fa-exclamation text-danger" />
          {/if}<br>
          <span class="text-muted">id: </span>{$user.id}
        </p>
      </div>
    </div>
  </div>
</div>
