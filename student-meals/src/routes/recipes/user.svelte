<script>
import RecipeList from "$lib/components/RecipeList.svelte";

/** @type {import("$lib/global").Recipe[]} */
export let recipes;
</script>

<RecipeList recipes={recipes} />