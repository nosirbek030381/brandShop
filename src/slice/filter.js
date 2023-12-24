// filtersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryFilter: '',
	brandFilters: [],
	featureFilters: [],
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryFilter(state, action) {
			state.categoryFilter = action.payload;
		},
		toggleBrandFilter(state, action) {
			const brand = action.payload;
			const brandIndex = state.brandFilters.indexOf(brand);
			if (brandIndex !== -1) {
				state.brandFilters.splice(brandIndex, 1);
			} else {
				state.brandFilters.push(brand);
			}
		},
		toggleFeatureFilter(state, action) {
			const feature = action.payload;
			const featureIndex = state.featureFilters.indexOf(feature);
			if (featureIndex !== -1) {
				state.featureFilters.splice(featureIndex, 1);
			} else {
				state.featureFilters.push(feature);
			}
		},
	},
});

export const { setCategoryFilter, toggleBrandFilter, toggleFeatureFilter } = filterSlice.actions;
export default filterSlice.reducer;
