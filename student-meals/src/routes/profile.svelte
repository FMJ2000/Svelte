<script>
import { userStore } from "$lib/store";

/** @type {import("$lib/types").User} */
let user;
const unsubscribe = userStore.subscribe(u => user = u);
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