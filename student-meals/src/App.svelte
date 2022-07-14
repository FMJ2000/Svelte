<script>
import { onAuthStateChanged, } from "firebase/auth";
import router from "page";
import { auth } from "./firebase";
import Header from "./Header.svelte";
import Home from "./Home.svelte";
import Profile from "./Profile.svelte";
import Recipe from "./Recipe.svelte";


let user;
onAuthStateChanged(auth, (u) => {
	user = u;
});

let page;
let props = {};
router("/", () => page = Home);
router("/profile", () => page = Profile);
router("/recipe/:id", (p) => {
	page = Recipe;
	props = p.params;
});
router.start();
</script>

<Header {user} />
<main class="p-2">
	<svelte:component this={page} {user} {...props}/>
</main>