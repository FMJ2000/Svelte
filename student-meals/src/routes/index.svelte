<script>
  import { onMount } from "svelte";

  /** @type {Promise<Response> | null} */
  let loadRecipes;
  onMount(async () => {
    loadRecipes = fetch("/api/recipes")
    .then((res) => res.json())
  })
</script>

<div class="container p-2">
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Recipes</h5>
      {#await loadRecipes}
        <p>Loading...</p>
      {:then recipes}
        <pre>{JSON.stringify(recipes, null, 2)}</pre>
      {/await}
    </div>
  </div>
</div>