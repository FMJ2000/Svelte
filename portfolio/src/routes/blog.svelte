<svelte:head>
  <title>Blog</title>
</svelte:head>

<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const blogposts = await res.json();
    return {
      props: {
        blogposts,
      }
    };
  }
</script>

<script>
  export let blogposts;
</script>

<div class="container">
  <h1>My Articles</h1>
  <div class="blogposts">
    {#each blogposts as post}
    <div class="post">
      <h2>{post.title.substring(0, 20)}</h2>
      <p>{post.body.substring(0, 80)}</p>
      <p class="readmore">
        <a style="color: rgb(10, 10, 139);" href={`/blog/${post.id}`}>Read more</a>
      </p>
    </div>
    {/each}
  </div>
</div>