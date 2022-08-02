<script context="module">
  import { browser } from "$app/env";
  import { PrismaClient } from "@prisma/client";

  /** @type {import("../../../.svelte-kit/types/src/routes/user/__types/profile").Load}*/
  export async function load({ session }) {
    if (!browser) {
      const prisma = new PrismaClient();
      const recipes = await prisma.recipe.findMany({
        where: {
          userId: session.user,
        }
      });
      return {
        status: 200,
        props: {
          id: recipes,
        }
      };
    }
  }
</script>

<script>
  import { user } from "$lib/stores/auth";

  export let id;
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
{id}
