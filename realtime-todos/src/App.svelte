<script>
	import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
	import Profile from "./Profile.svelte";
	import Todos from "./Todos.svelte";

	import { auth, provider } from "./firebase";
	import { authState } from "rxfire/auth";

	let user;

	const unsubscribe = authState(auth).subscribe(u => user = u);

	function login() {
		signInWithPopup(auth, provider)
		.then((result) => {
			const credential = GoogleAuthProvider.credentialFromResult(result);
			console.log(credential);
		})
		.catch((error) => {
			console.log(errror);
		});
	}
</script>

<section>
	{#if user}
		<Profile {...user} />
		<button on:click={() => auth.signOut()}>Logout</button>
		<hr>
		<Todos uid={user.uid} />
	{:else}
		<button on:click={login}>Signin with Google</button>
	{/if}
</section>