<script>
  import { createClient } from "$lib/service";
  import RecipeList from "$lib/components/RecipeList.svelte";

  /** @type {import("$lib/global").Recipe[]} */
  export let recipes;

  //let client = await createClient();
</script>

<div class="container p-2">
  <RecipeList recipes={recipes} />
</div>