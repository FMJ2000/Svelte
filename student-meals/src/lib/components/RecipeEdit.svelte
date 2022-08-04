<script>
/** @type {import("$lib/global").Recipe} */
export let recipe;

/** @type {Promise<Response> | null} */
let submit;
function handleSubmit() {
  submit = fetch("/recipes/edit", {
    method: "POST",
    body: JSON.stringify({
      ...recipe,
      steps: recipe.steps.filter((step) => step.description.length),
      ingredients: recipe.ingredients.filter((ingredient) => ingredient.name.length)
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());
}

/** @param {number} index */
function addStep(index) {
  if (recipe.steps.length-1 === index) {
    recipe.steps = [...recipe.steps, {
      description: "",
      duration: 1.0,
    }];
  }
}

/** @param {number} index */
function addIngredient(index) {
  if (recipe.ingredients.length-1 === index) {
    recipe.ingredients = [...recipe.ingredients, {
      name: "",
      amount: 1.0,
      unit: "p",
    }];
  }
}
</script>

<div class="container p-2">
  <div class="card shadow-sm mx-auto" style="max-width:48rem;">
    <div class="card-body">
      <form on:submit|preventDefault={handleSubmit}>
        <div class="d-flex mb-2">
          <div>
            <img src={recipe.picture} alt="recipe" class="rounded">
          </div>
          <div class="mx-2 flex-grow-1 row">
            <div class="card-title">
              <label class="visually-hidden" for="name">Recipe name</label>
              <input class="form-control-plaintext form-control-lg bg-light px-1" type="text" id="name" placeholder="Recipe name" bind:value={recipe.name} required>
            </div>
            <div class="card-subtitle">
              <label for="description" class="visually-hidden">Recipe description</label>
              <textarea class="form-control-plaintext bg-light px-1" placeholder="Recipe name" bind:value={recipe.description} required />
            </div>
          </div>
        </div>
        <ul class="list-group list-group-flush px-1" style="max-width:32rem;">
          <li class="list-group-item">
            <h5>Ingredients</h5>
            <small class="text-muted">Add name, amount and unit</small>
          </li>
          {#each recipe.ingredients as ingredient (ingredient)}
            <li class="list-group-item d-flex">
              <div class="input-group">
                <input class="form-control form-control-plaintext bg-light px-1" id={`in${recipe.ingredients.indexOf(ingredient)}`} type="text" placeholder="Name" bind:value={ingredient.name} on:input={() => addIngredient(recipe.ingredients.indexOf(ingredient))}>
                <input class="form-control form-control-plaintext bg-light flex-grow-0" style="min-width:3rem;" type="number" placeholder="Amount" bind:value={ingredient.amount} min="0">
                <select class="form-select bg-light flex-grow-0 me-4" style="min-width:3rem;" aria-label="Unit" bind:value={ingredient.unit}>
                  <option selected value="ml">ml</option>
                  <option selected value="g">g</option>
                  <option selected value="p">p</option>
                </select>
              </div>
              <div class="my-auto">
                <button class="btn btn-sm btn-outline-danger" type="button" on:click={() => { if (recipe.steps.length > 1) recipe.ingredients = recipe.ingredients.filter((s) => s != ingredient) }}>
                  <i class="fa-solid fa-trash" />
                </button> 
              </div>
            </li>
          {/each}
        </ul>
        <ul class="list-group list-group-flush px-1">
          <li class="list-group-item">
            <h5>Steps</h5>
            <small class="text-muted">Add description and duration in minutes</small>
          </li>
          {#each recipe.steps as step (step)}
            <li class="list-group-item d-flex">
              <span class="my-auto me-2">{recipe.steps.indexOf(step) + 1}.</span>
              <div class="input-group">
                <input class="form-control form-control-plaintext bg-light px-1" rows={1} id={`st${recipe.steps.indexOf(step)}`} type="text" placeholder="Description" bind:value={step.description} required={recipe.steps.indexOf(step) === 0} on:input={() => addStep(recipe.steps.indexOf(step))}>
                <input class="form-control form-control-plaintext bg-light flex-grow-0" style="min-width:3rem;" type="number" placeholder="min" bind:value={step.duration} min="0" max="720">
              </div>
              <span class="my-auto mx-2">min</span>
              <div class="my-auto">
                <button class="btn btn-sm btn-outline-danger" type="button" on:click={() => { if (recipe.steps.length > 1) recipe.steps = recipe.steps.filter((s) => s != step) }}>
                  <i class="fa-solid fa-trash" />
                </button> 
              </div>
            </li>
          {/each}
        </ul>
        <div class="mt-4">
          <button type="submit" class="btn btn-success" class:disabled={!recipe.steps.length}>
            <i class="fa-solid fa-plus me-2" />Create
          </button>
          <a href="/" class="btn btn-light" on:click={() => confirm('Are you sure you want to discard the recipe?')}>Cancel</a>
        </div>
      </form>
    </div>
  </div>
</div>

{#if submit}
  <div class="modal fade show" id="saveModal" tabindex="-1" role="dialog" aria-hidden={false}>
    <div class="modal-dialog" role="document">
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
  <div class="modal-backdrop show" />
{/if}

<style>
  select {
    border: none;
    padding: 6px 0px;
  }

  .modal {
    display: block;
  }
</style>