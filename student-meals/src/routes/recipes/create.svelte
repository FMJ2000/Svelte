<script>
  import { goto } from "$app/navigation";
  import { isAuthenticated, user } from "$lib/stores/auth";

  /** @type {import("$lib/global").Recipe} */
  let recipe = {
    ownerId: $user.sub,
    name: "",
    description: "",
    steps: [],
    ingredients: [],
  }

  /** @type {Promise<Response> | null} */
  let submit;
  function handleSubmit() {
    submit = fetch("/api/recipe", {
      method: "POST",
      body: JSON.stringify(recipe),
      headers: { "content-type": "application/json" },
    })
    .then((res) => res.json());
  }

  function addStep() {
    recipe.steps = [...recipe.steps, {
      description: "",
      duration: 1.0,
    }];
    setTimeout(() => document.getElementById(`st${recipe.steps.length-1}`)?.focus(), 100);
  }

  function addIngredient() {
    recipe.ingredients = [...recipe.ingredients, {
      name: "",
      amount: 1.0,
      unit: "p",
    }];
    setTimeout(() => document.getElementById(`in${recipe.ingredients.length-1}`)?.focus(), 100);
  }
</script>

{#if isAuthenticated}
  <div class="container p-2">
    <div class="card">
      <div class="card-body">
        <form on:submit|preventDefault={handleSubmit}>
          <h4 class="card-title">Create Recipe</h4>
          <div class="mb-2">
            <label for="name" class="form-label">Name</label>
            <input class="form-control" type="text" placeholder="Recipe name" bind:value={recipe.name} required>
          </div>
          <div class="mb-4">
            <label for="name" class="form-label">Description</label>
            <input class="form-control" type="text" placeholder="Recipe description" bind:value={recipe.description}>
          </div>
          <p>Recipe has {recipe.steps.length} steps and {recipe.ingredients.length} ingredients</p>
          <div class="row">
            <div class="col-lg-7 col-xl-8 text-center">
              <ul class="list-group list-group-flush px-1">
                <li class="list-group-item"><b>Steps</b></li>
                {#if recipe.steps.length == 0} No steps yet {/if}
                {#each recipe.steps as step (step)}
                  <li class="list-group-item">
                    <div class="input-group">
                      <span class="input-group-text">{recipe.steps.indexOf(step) + 1}.</span>
                      <textarea class="form-control" id={`st${recipe.steps.indexOf(step)}`} type="text" placeholder="Description" bind:value={step.description} required />
                      <input class="form-control flex-grow-0" style="min-width:5rem;" type="number" placeholder="Duration" bind:value={step.duration} min="0" max="720">
                      <span class="input-group-text">min</span>
                      <button class="btn btn-outline-danger" type="button" on:click={() => recipe.steps = recipe.steps.filter((s) => s != step)}>
                        <i class="fa-solid fa-trash" />
                      </button> 
                    </div>
                  </li>
                {/each}
              </ul>
              <button type="button" class="btn btn-sm btn-outline-success" on:click={addStep}>
                <i class="fa-solid fa-plus" /> step
              </button>
            </div>
            <div class="col-lg-5 col-xl-4 text-center">
              <ul class="list-group list-group-flush px-1">
                <li class="list-group-item"><b>Ingredients</b></li>
                {#if recipe.ingredients.length == 0} No ingredients yet {/if}
                {#each recipe.ingredients as ingredient (ingredient)}
                  <li class="list-group-item">
                    <div class="input-group">
                      <input class="form-control" id={`in${recipe.ingredients.indexOf(ingredient)}`} type="text" placeholder="Name" bind:value={ingredient.name} required>
                      <input class="form-control flex-grow-0" style="min-width:5rem;" type="number" placeholder="Amount" bind:value={ingredient.amount} min="0">
                      <select class="form-select flex-grow-0" style="min-width:5rem;" aria-label="Unit" bind:value={ingredient.unit}>
                        <option selected value="ml">ml</option>
                        <option selected value="g">g</option>
                        <option selected value="p">p</option>
                      </select>
                      <button class="btn btn-outline-danger" type="button" on:click={() => recipe.ingredients = recipe.ingredients.filter((s) => s != ingredient)}>
                        <i class="fa-solid fa-trash" />
                      </button> 
                    </div>
                  </li>
                {/each}
              </ul>
              <button type="button" class="btn btn-sm btn-outline-success" on:click={addIngredient}>
                <i class="fa-solid fa-plus" /> ingredient
              </button>
            </div>
          </div>
          <div class="mt-4">
            <button type="submit" class="btn btn-primary" class:disabled={!recipe.steps.length} data-bs-toggle="modal" data-bs-target="#saveModal">Create</button>
            <button type="button" class="btn btn-light" on:click={() => { 
              if (confirm("Are you sure you want to discard the recipe?")) goto("/");
            }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="modal fade" id="saveModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{recipe.name}</h5>
        </div>
        {#await submit}
          <div class="modal-body">Saving...</div>
        {:then res}
          <div class="modal-body">Saved!</div>
          <div class="modal-footer">
            <a class="btn btn-primary" data-bs-dismiss="modal" href="/">Continue</a>
          </div>
        {:catch err}
          <div class="modal-body text-danger">Error: {err}</div>
          <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal" on:click={() => submit=null}>Retry</button>
            <a class="btn btn-light" data-bs-dismiss="modal" href="/">Cancel</a>
          </div>
        {/await}
      </div>
    </div>
  </div>
{:else}
  You need to log in to create recipes
{/if}