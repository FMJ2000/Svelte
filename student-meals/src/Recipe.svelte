<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export let user;
export let id;

const promise = getDoc(doc(db, "recipes", id)).then((doc) => doc.data());
</script>

{#await promise}
<p>Loading</p>
{:then recipe}
{JSON.stringify(recipe)}
<h4>{recipe.name}</h4>


<div class="d-flex">
  <div class="col">
    <h6>Ingredients</h6>
    <ol class="list-group list-group-numbered">
      {#each Object.entries(recipe.ingredients) as [name, ingredient]}
      <li class="list-group-item">{name}</li>
      {/each}
    </ol>
  </div>
  <div class="col d-flex p-auto">
    {recipe.description}
  </div>
</div>

{:catch error}
<p>{error}</p>
{/await}