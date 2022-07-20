<script>
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { getRecipes, userStore } from "$lib/store";

/** @type {import("$lib/types").User} */
let user;
const unsubscribe = userStore.subscribe(u => user = u);

/** @param {import("$lib/types").Recipe} recipe */
function ago(recipe) {
  let diff = ((Date.now() - recipe.created) / 1000) >> 0;
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

<h4>Recipes</h4>

<div class="list-group">
  {#each user.recipes as recipe}
  <a href="/recipe/{recipe.id}" class="list-group-item list-group-item-action">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">{recipe.name}</h5>
      <small>{ago(recipe)}</small>
    </div>
    <p class="mb-1">{recipe.description}</p>
    <small>{recipe.steps.length} steps</small>
  </a>
  {/each}
</div>