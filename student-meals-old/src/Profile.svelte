<script>
  export let user;
</script>

{#if user}
<h4>Profile</h4>
<img src={user.photoURL} alt="profile">
<p>
  Name: {user.displayName}<br>
  Email: {user.email}
  {#if user.emailVerified} (verified)
  {:else} (unverified)
  {/if}<br>
  Phone: {user.phoneNumber}
</p>
{/if}