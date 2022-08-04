<script>
import { user } from "$lib/stores";

  /** @type {import("$lib/global").Recipe[]} */
  export let recipes;

  /** @param {import("$lib/global").Recipe} recipe */
  function ago(recipe) {
    let diff = ((Date.now() - Date.parse(recipe.createdAt || new Date().toISOString())) / 1000) >> 0;
    if (diff < 60) return `${diff} seconds ago`;
    diff = (diff / 60) >> 0;
    if (diff < 60) return `${diff} minutes ago`;
    diff = (diff / 60) >> 0;
    if (diff < 24) return `${diff} hours ago`;
    diff = (diff / 24) >> 0;
    if (diff < 30) return `${diff} days ago`;
    return `${(diff / 30) >> 0} months ago`;
  }

  /** @param {import("$lib/global").Recipe} recipe */
  async function deleteRecipe(recipe) {
    if (confirm("Are you sure you want to delete the recipe?")) {
      await fetch("api/recipe", {
        method: "DELETE",
        body: JSON.stringify(recipe),
      });
      location.reload();
    }
  }
</script>


<div class="card shadow-sm">
  <div class="card-body">
    <h5 class="card-title">Recipes</h5>
    <div class="list-group list-group-flush ">
      {#if recipes.length === 0}
        <li class="list-group-item">No recipes yet - click <a href="/user/recipes/create">here</a> to add one!</li>
      {/if}
      {#each recipes as recipe}
        <li class="list-group-item">
          <div class="d-flex">
            <img src={recipe.picture} alt="recipe" class="rounded">
            <div class="mx-2">
              <a href="/recipes/{recipe.id}" class="fs-5">{recipe.name}</a>
              <p class="mb-0">{recipe.description}</p>
              <small>
                {recipe.steps?.length} steps 
                <i class="fa-solid fa-clock ms-3" />
                {recipe.steps?.map((step) => step.duration).reduce((a, b) => a + b)} min
              </small>
            </div>
            <div class="ms-auto">
              <small class="d-block">{ago(recipe)}</small>
              {#if recipe.userId === $user?.id}
                <a class="btn btn-sm btn-outline-secondary ms-auto my-1" href="/recipes/edit/{recipe.id}">
                  <i class="fa-solid fa-gear" />
                </a>
                <button class="btn btn-sm btn-outline-danger ms-auto my-1" on:click={() => deleteRecipe(recipe)}>
                  <i class="fa-solid fa-trash" />
                </button>
              {/if}
            </div>
          </div>
        </li>
      {/each}
    </div>
  </div>
</div>
  

<style>
  a.fs-5 {
    text-decoration: inherit;
  }
</style>