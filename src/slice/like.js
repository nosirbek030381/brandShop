import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	likes: [],
};

const likeSlice = createSlice({
	name: 'like',
	initialState,
	reducers: {
		addLike(state, action) {
			state.likes.push(action.payload);
		},
		removeLike(state, action) {
			state.likes = state.likes.filter(like => like.id !== action.payload);
		},
	},
});
export const { addLike, removeLike } = likeSlice.actions;
export default likeSlice.reducer;
