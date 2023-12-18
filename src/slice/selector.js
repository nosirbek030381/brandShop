// selectors.js
import { createSelector } from 'reselect';

const getLikedProducts = state => state.like.likes;

export const memoizedGetLikedProducts = createSelector([getLikedProducts], likes => likes);
