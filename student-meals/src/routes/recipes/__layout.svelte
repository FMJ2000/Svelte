<script>
  import { page } from "$app/stores";
  import { user } from "$lib/stores";

  /** @type {Promise<import("$lib/global").Recipe[]>} */
  let fetchRecipes = fetch(`/api${$page.url.pathname}`, {
    method: "GET",
    headers: {
      userId: $user?.id ?? "",
    }
  }).then((res) => res.json());
</script>

{#await fetchRecipes}
<p>Loading...</p>
{:then recipes}
<div class="container p-2">
  <slot recipes={recipes} />
</div>
{/await}