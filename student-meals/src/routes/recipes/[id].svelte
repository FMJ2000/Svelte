<script>
  /** @type {import("$lib/global").Recipe} */
  export let recipe;
  $: progress = recipe.steps.filter((step) => step.complete).length / recipe.steps.length;
</script>

{JSON.stringify(recipe)}

<div class="d-flex container">
  <div class="col-md-8">
    <div class="card m-1 shadow-sm">
      <div class="card-body">
        <h3 class="card-title">{recipe.name}</h3>
        <p class="card-subtitle mb-2 text-muted">{recipe.description}</p>
      </div>
    </div>
    <div class="card m-1 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Steps</h5>
        <div class="progress">
          <div class="progress-bar" class:bg-success={progress === 1} style="width:{progress*100}%" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={1}></div>
        </div>
        <ol class="list-group list-group-flush list-group-numbered">
          {#each recipe.steps as step}
            <li class="list-group-item d-flex">
              <span class="mx-2 me-auto">{step.description}</span>
              {#if step.duration > 1} <span class="text-muted">{step.duration} min</span> {/if}
              <button class="btn btn-sm btn-outline-success" on:click={() => step.complete = !step.complete}>
                <i class="fa-solid {step.complete ? "fa-circle-xmark" : "fa-circle-check"}" />
              </button>
            </li>
          {/each}
        </ol>
        {#if progress === 1}
          <div>
            <button class="btn btn-primary">
              <i class="fa-solid fa-star" /> Rate
            </button>
            <a class="btn btn-light" href="/">Continue</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card m-1 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Ingredients</h5>
        <ul class="list-group list-group-flush">
          {#each recipe.ingredients as ingredient}
            <li class="list-group-item d-flex">
              {ingredient.name}
              <span class="text-muted ms-auto">{ingredient.amount} {ingredient.unit}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>