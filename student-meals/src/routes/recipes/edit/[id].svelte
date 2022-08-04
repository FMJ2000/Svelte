<script>
import RecipeEdit from "$lib/components/RecipeEdit.svelte";

/** @type {import("$lib/global").Recipe} */
export let recipe;
</script>

<RecipeEdit {recipe} />