import { getPosts } from "./firebase";
import { getPostsHtml } from "./Posts";
import "./styles.css";

const printPosts = async () => {
  const posts = await getPosts();
  // console.log({posts})
  // getPostsHtml()
  const rootEl = document.getElementById("root");
  rootEl.appendChild(getPostsHtml(posts));
  // postsEl.innerHTML = await getPostsHtml(posts);
};

printPosts();
