<script>
  import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
  import { db } from "./firebase";
  export let user;
  $: user && subscribe();
  var recipes = [];

  function subscribe() {
    console.log(user.uid);
    const q = query(collection(db, "recipes"), where("uid", "==", user.uid), orderBy("created"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      recipes = [];
      snapshot.forEach((doc) => recipes.push({...doc.data(), id: doc.id}));
      console.log(recipes);
    })
  }

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
  {#each recipes as recipe}
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