import { likeAPost } from "./firebase.js";
import { getRandomName, getRandomPicture } from "./utils.js";

export const getPostsHtml = (posts) => {

  const postsHtml = posts
    .map((post) => {
      const randomImageUrl = `https://avatars.dicebear.com/api/avataaars/${getRandomName()}.svg`;
      return `
    <div class="post-item">
      <img src="${randomImageUrl}"/>
      <div>
        <h4>${post.userName}</h4>
        <p>${post.description}</p>
        <button
          class="like-button ${post.liked ? "liked" : ""}"
          id="${post.id}"
        >
          <span class="material-icons red600">
          ${post.liked ? "favorite" : "favorite_border"}
          </span>
        </button>
      </div>
    </div>
  `;
    })
    .join("");

  const postsEl = document.createElement("div");
  postsEl.classList.add("posts");
  postsEl.innerHTML = postsHtml;
  const likeButtons = postsEl.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", (e) => {
      const postEl = e.currentTarget;
      likeAPost(postEl.id);
      const spanEl = postEl.querySelector("span");
      if (postEl.classList.contains("liked")) {
        postEl.classList.remove("liked");
        spanEl.textContent = "favorite_border";
      } else {
        postEl.classList.add("liked");
        spanEl.textContent = "favorite";

        spanEl.classList.remove("animate");
        spanEl.classList.add("animate");
        setTimeout(function () {
          spanEl.classList.remove("animate");
        }, 1500);
      }
    });
  });

  return postsEl;
};
