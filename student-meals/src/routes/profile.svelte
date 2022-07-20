<script>
import { getContext } from "svelte";

/** @type {import('.pnpm/@firebase+auth@0.20.5_@firebase+app@0.7.28/node_modules/@firebase/auth/dist/auth-public').User | null}*/
const user = getContext("user");
</script>

{#if user}
<h4>Profile</h4>

<div class="d-flex">
  <img src={user.photoURL} alt="profile" class="rounded">
  <div class="mx-2">
    <p>
    Name: {user.displayName}<br>
    Email: {user.email}
    {#if user.emailVerified} (verified)
    {:else} (unverified)
    {/if}<br>
    Phone: {user.phoneNumber}
    </p>
  </div>
</div>
{/if}