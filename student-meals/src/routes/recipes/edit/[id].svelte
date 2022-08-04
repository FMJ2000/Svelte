<script>
import RecipeEdit from "$lib/components/RecipeEdit.svelte";

/** @type {import("$lib/global").Recipe} */
export let recipe;
recipe = {...recipe, steps: [...recipe.steps, {
    description: "",
    duration: 0.0,
  }],
  ingredients: [...recipe.ingredients, {
    name: "",
    amount: 1.0,
    unit: "p",
  }]
};
</script>

<RecipeEdit {recipe} />