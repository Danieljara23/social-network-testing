import { getPosts } from "./firebase.js";
import { getPostsHtml } from "./Posts.js";

const printPosts = async () => {
  const posts = await getPosts();
  // console.log({posts})
  // getPostsHtml()
  const rootEl = document.getElementById("root");
  rootEl.appendChild(getPostsHtml(posts));
  // postsEl.innerHTML = await getPostsHtml(posts);
};

printPosts();
