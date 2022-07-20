<script>
import { doc, getDoc, getDocFromCache } from "firebase/firestore";
import { db } from "./firebase";

export let user;
export let id;

var recipe;
var chef;

try {
  recipe = getDocFromCache(doc(db, "recipes", id)).then((doc) => doc.data());
} catch (e) {
  recipe = getDoc(doc(db, "recipes", id)).then((doc) => doc.data());
}
getChef();

async function getChef() {
  try {
    const r = await recipe;
    console.log(r);
    chef = getDocFromCache(doc(db, "users", r.uid)).then((doc) => doc.data());
  } catch (e) {
    chef = getDoc(doc(db, "users", r.uid)).then((doc) => doc.data());
  }
}
</script>

{#await recipe}
<p>Loading</p>
{:then recipe}
<div class="d-flex">
  <div class="col">
    <div class="card m-1">
      <div class="card-body">
        <h3 class="card-title">{recipe.name}</h3>
        <p class="card-subtitle mb-2 text-muted">{recipe.description}</p>
        {#await chef}
        <p>Loading chef</p>
        {:then chef}
        <p>
          Created by: {chef.name}
        </p>
        {/await}
      </div>
    </div>
    <div class="card m-1">
      <div class="card-body">
        <h5>Steps</h5>
        <ol class="list-group list-group-flush list-group-numbered">
          {#each recipe.steps as step}
          <li class="list-group-item d-flex">
            <span class="mx-2">{step.name}</span>
            {#if step.min > 1}
            <span class="ms-auto text-muted">{step.min} min</span>
            {/if}
          </li>
          {/each}
        </ol>
      </div>
    </div>
  </div>
  <div class="col-4">
    <div class="card m-1">
      <div class="card-body">
        <h5>Ingredients</h5>
        <ul class="list-group list-group-flush">
          {#each Object.entries(recipe.ingredients) as [name, ingredient]}
          <li class="list-group-item d-flex">{name} <span class="text-muted ms-auto">{ingredient.join(" ")}</span></li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>
{:catch error}
<p>{error}</p>
{/await}