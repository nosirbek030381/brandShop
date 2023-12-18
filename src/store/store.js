import { configureStore } from '@reduxjs/toolkit';
import LikeReducer from '../slice/like';

const store = configureStore({
	reducer: {
		like: LikeReducer,
	},
	devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
