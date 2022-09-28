import { updateDoc } from "../config.js";
import { getPosts, likeAPost } from "./firebase.js";

jest.mock("../config", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(()=> {
    return Promise.resolve([
      {
        id: 1,
        data: jest.fn(()=>({
          userName: 'Daniel',
          description: 'Este es un post de prueba',
          like: false,
        }))
      }
    ])
  }),
  getDoc: jest.fn(()=>{
    return Promise.resolve({
      data: jest.fn(()=>{
        return {
          liked: true
        }
      })
    })
  }),
  updateDoc: jest.fn(),
  doc: jest.fn(),
  db: jest.fn()
}));

const testPosts = [
  {
    id: 1,
    userName: 'Daniel',
    description: 'Este es un post de prueba',
    like: false
  }
];

describe("Firestore", () => {
  it("calls getPosts and return the list of posts", async () => {
    const posts = await getPosts();
    expect(posts).toStrictEqual(testPosts);
  });

  it("calls updateDoc firebase function when likeAPost function is called", async () => {
    const postId = "AqAFwFeeRFaSxA"
    await likeAPost(postId)
    expect(updateDoc).toHaveBeenCalled();
  })
});
