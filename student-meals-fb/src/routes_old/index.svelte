<script>
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "$lib/firebase";
import { userStore } from "$lib/store";

/** @type {import("$lib/types").User} */
let user;
const unsubscribe = userStore.subscribe(u => user = u);
/** @type {string} */
export let msg;

</script>

<!--
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
-->
<h4>Welcome!</h4>
{JSON.stringify(user)}
<p>{msg}</p>