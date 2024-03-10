import { createSlice } from "@reduxjs/toolkit";
import { Post, User } from "types";



const initialState: {
    mode: string;
    user: User | null;
    token: string | null;
    posts: Post[];
} = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode(state) {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin(state, action) {
            state.user = action.payload.user as User; 
            state.token = action.payload.token as string; 
        },
        setLogout(state) {
            state.user = null;
            state.token = null;
        },
        setFriends(state, action) {
            if (state.user) {
                state.user.friends = action.payload.friends as string[]; 
            } else {
                console.log("user friends not found");
            }
        },
        setPosts(state, action) {
            state.posts = action.payload.posts as Post[]; 
        },
        setPost(state, action) {
            const updatedPosts = state.posts.map((post)=>{
                if(post.id === action.payload.postId) return action.payload.post;
                return post
            })
          state.posts = updatedPosts
        },
    },
});

export const {setMode,setLogin,setLogout,setFriends,setPosts,setPost} = authSlice.actions
export default authSlice.reducer
