<script>
import RecipeView from "$lib/components/RecipeView.svelte";

/** @type {import("$lib/global").Recipe} */
export let recipe;
</script>

<RecipeView {recipe} />