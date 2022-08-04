<script>
import { user } from "$lib/stores";

/** @type {import("$lib/global").Recipe}*/
export let recipe;
$: progress = recipe.steps.filter((step) => step.complete).length / recipe.steps.length;
</script>

<div class="d-flex container">
  <div class="col-md-8">
    <div class="card m-1 shadow-sm">
      <div class="card-body">
        <div class="d-flex mb-2">
          <div>
            <img src={recipe.picture} alt="recipe" class="rounded">
          </div>
          <div class="ms-2 flex-grow-1">
            <h3 class="card-title">{recipe.name}</h3>
            <p class="card-subtitle mb-2 text-muted">{recipe.description}</p>
          </div>
        </div>
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
              {#if step.duration > 1} <span class="text-muted me-2">{step.duration} min</span> {/if}
              <button class="btn btn-sm {step.complete ? "btn-outline-success" : "btn-outline-secondary"}" on:click={() => step.complete = !step.complete}>
                <i class="fa-solid {step.complete ? "fa-circle-xmark" : "fa-circle-check"}" />
              </button>
            </li>
          {/each}
        </ol>
      </div>
    </div>
    {#if progress === 1} 
      <div class="card m-1 shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Recipe complete!</h5>
          <p class="card-subtitle">Would you like to rate the recipe?</p>
          <div class="mt-2">
            <button class="btn btn-success">
              <i class="fa-solid fa-star" /> Rate
            </button>
            <a class="btn btn-light" href="/">Continue</a>
          </div>
        </div>
      </div>
    {/if}
  </div>
  <div class="col-md-4">
    <div class="card m-1 shadow-sm">
      <div class="card-body">
        <h5 class="card-title">Ingredients</h5>
        <ul class="list-group list-group-flush">
          {#if recipe.ingredients.length === 0}
            <li class="list-group-item">No ingredients</li>
          {/if}
          {#each recipe.ingredients as ingredient}
            <li class="list-group-item d-flex">
              {ingredient.name}
              <span class="text-muted ms-auto">{ingredient.amount} {ingredient.unit}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    {#if recipe.userId === $user?.id}
      <div class="card m-1 shadow-sm">
        <div class="card-body d-flex align-items-center">
          <span class="card-subtitle">Additional actions</span>
          <a class="btn btn-sm btn-outline-secondary ms-auto my-1" href="/recipes/edit/{recipe.id}">
            <i class="fa-solid fa-gear" />
          </a>
          <button class="btn btn-sm btn-outline-danger ms-2 my-1">
            <i class="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>