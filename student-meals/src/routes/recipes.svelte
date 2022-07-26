<script context="module">
/** @type {import("./__types/recipes").Load} */
export async function load({ url }) {
  const user = url.searchParams.get("user") || "";
  const ingredients = url.searchParams.get("ingredients")?.split(",").map(v => v.toLowerCase()) || [];
  const from = parseInt(url.searchParams.get("from") || "") || 0;
  const to = parseInt(url.searchParams.get("to") || "") || Date.now();
  return {
    status: 200,
    props: {
      user,
      ingredients,
      from,
      to
    }
  }
}
</script>

<script>
import { db } from "$lib/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";


/** @type {string} */
export let user;
/** @type {string[]} */
export let ingredients;
/** @type {number} */
export let from;
/** @type {number} */
export let to;
/** @type {import("$lib/types").Recipe[]} */
let recipes = [];
let error;

async function getRecipes() {
  try {
    const q = await getDocs(query(collection(db, "recipes"), where("created", ">=", from), where("created", "<", to)));
    q.forEach((doc) => {
      const data = doc.data();
      recipes = [...recipes, {
        created: data.created,
        description: data.description,
        id: doc.id,
        ingredients: data.ingredients,
        name: data.name,
        steps: data.steps,
        uid: data.uid,
      }];
    });
    console.log(recipes);
  } catch (err) {
    console.error(err);
    error = err;
  }
}
getRecipes();

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

<p>
recipes by {user}<br>
using {ingredients}<br>
in range {from} - {to}
</p>
<ul>
  {#each ingredients as i}
  <li>{i}</li>
  {/each}
</ul>

<h4>Recipes</h4>

<div class="list-group">
  {#each recipes as recipe (recipe.id)}
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