<script>
  import TodoItem from "./TodoItem.svelte"
  import { collection, doc, setDoc, orderBy, query, where, updateDoc, onSnapshot, deleteDoc } from "firebase/firestore";
  import { db } from "./firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  export let uid;

  let text = "some task";
  var todos = [];
  const q = query(collection(db, "Todos"), where("uid", "==", uid), orderBy("created"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    todos = [];
    snapshot.forEach((doc) => todos.push({...doc.data(), id: doc.id}));
    console.log("todos", todos);
  }); 

  async function add() {
    await setDoc(doc(collection(db, "Todos")), { uid, text, complete: false, created: Date.now() });
    text = "";
  }

  async function updateStatus(event) {
    console.log(event);
    const { id, newStatus } = event.detail;
    await updateDoc(doc(db, "Todos", id), { complete: newStatus });
  }

  async function removeItem(event) {
    const { id } = event.detail;
    await deleteDoc(doc(db, "Todos", id));
  }
</script>

<style>
  input {
    display: block;
  }
</style>

<ul>
  {#each todos as todo}
    <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
  {/each}
</ul>
<input bind:value={text}>
<button on:click={add}>Add Task</button>