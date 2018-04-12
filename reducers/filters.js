import {
  SET_TEXT_FILTER,
  SET_SORT_BY,
  SET_START_DATE,
  SET_END_DATE,
  SET_TAGS } from '../actions/filters';

const filterDefaults = {
  text: '',
  sortBy: 'distance',
  startDate: undefined,
  endDate: undefined
};

export default (state = filterDefaults, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        text: action.text
      }
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.sortBy
      }
    case SET_START_DATE:
      return {
        ...state,
        startDate: action.date
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state;
  }
}
