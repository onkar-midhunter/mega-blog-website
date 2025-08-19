import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postData: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.postData = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePost: (state, action) => {
      state.postData = state.postData.filter(
        (post) => post.$id !== action.payload.$id
      );
    },
    addPost: (state, action) => {
      state.postData.push(action.payload);
    },
    updatePost: (state, action) => {
    console.log("update in redux")
    const index = state.postData.findIndex(
      (post) => post.$id === action.payload.$id
    );
    if (index !== -1) {
      state.postData[index] = action.payload; // replace with updated post
    }
  },
  },
  
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  deletePost,
  addPost,
  updatePost
} = postSlice.actions;

export default postSlice.reducer;
