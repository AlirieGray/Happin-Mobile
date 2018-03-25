const SET_SORT_BY = 'SET_SORT_BY';
const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
const SET_START_DATE = 'SET_START_DATE';
const SET_END_DATE = 'SET_END_DATE';
const SET_TAGS = 'SET_TAGS';

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy
})

export const setTextFilter = (text) => ({
  type: SET_TEXT_FILTER,
  text
})

//
// export function setSearch(query) {
//   return dispatch => {
//     dispatch(setTextFilter(query));
//   }
// }
