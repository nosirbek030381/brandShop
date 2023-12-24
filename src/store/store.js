import { configureStore } from '@reduxjs/toolkit';
import FilterReducer from '../slice/filter';
import LikeReducer from '../slice/like';

const store = configureStore({
	reducer: {
		like: LikeReducer,
		filter: FilterReducer,
	},
	devTools: import.meta.env.NODE_ENV !== 'production',
});

export default store;
