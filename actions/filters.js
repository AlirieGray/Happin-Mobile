export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_TEXT_FILTER = 'SET_TEXT_FILTER';
export const SET_START_DATE = 'SET_START_DATE';
export const SET_END_DATE = 'SET_END_DATE';
export const SET_TAGS = 'SET_TAGS';

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  sortBy
})

export const setTextFilter = (text) => ({
  type: SET_TEXT_FILTER,
  text
})

// export function setTextFilter(text) {
//   console.log("set text filter action!!")
//   return {
//     type: SET_TEXT_FILTER,
//     text
//   }
// }

//
// export function setSearch(query) {
//   return dispatch => {
//     dispatch(setTextFilter(query));
//   }
// }
