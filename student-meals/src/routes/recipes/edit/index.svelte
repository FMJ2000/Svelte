<script>
import { user } from "$lib/stores";
import RecipeEdit from "$lib/components/RecipeEdit.svelte";

/** @type {import("$lib/global").Recipe} */
let recipe = {
  userId: $user?.id,
  name: "",
  description: "",
  picture: `https://picsum.photos/id/${Math.floor(Math.random()*1000)}/128/128`,
  steps: [{
    description: "",
    duration: 0.0,
  }],
  ingredients: [{
    name: "",
    amount: 1.0,
    unit: "p",
  }],
};
</script>

<RecipeEdit {recipe} />