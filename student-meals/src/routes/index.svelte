<script>
  import { onMount } from "svelte";
  import { user } from "$lib/stores/auth";

  /** @type {Promise<import("$lib/global").Recipe[]>} */
  let loadRecipes;
  onMount(async () => {
    loadRecipes = fetch("/api/recipes")
    .then((res) => res.json());
  })

  /** @param {import("$lib/global").Recipe} recipe */
  function ago(recipe) {
    let diff = ((Date.now() - Date.parse(recipe.createdAt || new Date())) / 1000) >> 0;
    if (diff < 60) return `${diff} seconds ago`;
    diff = (diff / 60) >> 0;
    if (diff < 60) return `${diff} minutes ago`;
    diff = (diff / 60) >> 0;
    if (diff < 24) return `${diff} hours ago`;
    diff = (diff / 24) >> 0;
    if (diff < 30) return `${diff} days ago`;
    return `${(diff / 30) >> 0} months ago`;
  }
</script>

<div class="container p-2">
  <div class="card shadow-sm">
    <div class="card-body">
      <h5 class="card-title">Recipes</h5>
      {#await loadRecipes}
        <p>Loading...</p>
      {:then recipes}
        <!--<pre>{JSON.stringify(recipes, null, 2)}</pre>-->
        {#if Array.isArray(recipes)}
          <div class="list-group">
            {#each recipes as recipe}
              <a href="/recipes/{recipe.id}" class="list-group-item list-group-item-action">
                <div class="d-flex">
                  <img src={recipe.picture} alt="recipe" class="rounded">
                  <div class="mx-2">
                    <h5>{recipe.name}</h5>
                    <p class="mb-0">{recipe.description}</p>
                    <small>
                      {recipe.steps.length} steps 
                      <i class="fa-solid fa-clock ms-3" />
                      {recipe.steps.map((step) => step.duration).reduce((a, b) => a + b)} min
                    </small>
                  </div>
                  <small class="ms-auto">{ago(recipe)}</small>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      {/await}
    </div>
  </div>
</div>
{JSON.stringify($user)}