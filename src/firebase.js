import { getDocs, getDoc, collection, db, updateDoc, doc } from "../config.js";

export const getPosts = async () => {
  const posts = [];
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`);
    posts.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return posts;
};

export const likeAPost = async (postId) => {
  console.log(postId);
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);
  const currentLikedValue = docSnap.data().liked;
  console.log(docSnap.data());
  await updateDoc(docRef, {
    liked: !currentLikedValue
  });
};
