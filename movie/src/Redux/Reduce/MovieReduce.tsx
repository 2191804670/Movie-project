import { all, SEARCH_MOVIE } from "../type/ApiType";

const initialState = { movie: [], page: 1 };

export const movieReduce = (state = initialState, action: any) => {
  switch (action.type) {
    case all:
      return { ...state, movie: action.data, page: action.page };

    case SEARCH_MOVIE:
      return { ...state, movie: action.data, page: action.page };

    default:
      return state;
  }
};
