<script>
  import RecipeList from "$lib/components/RecipeList.svelte";

  /** @type {import("$lib/global").Recipe[]} */
  export let recipes;
</script>

<div class="container p-2">
  <RecipeList recipes={recipes} />
</div>