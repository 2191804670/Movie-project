import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { all, SEARCH_MOVIE } from "../type/ApiType";
interface ApiErrorResponse {
  status_message: string;
}
export const getALLMovie = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=59451d7e2175571f1ffca5a52cd05a4d&page=1`
      );
      dispatch({
        type: all,
        data: res.data.results,
        page: res.data.total_pages,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as ApiErrorResponse;

      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: errorMessage?.status_message || axiosError.message,
      });
    }
  };
};
export const SearchMovie = (word: any) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=59451d7e2175571f1ffca5a52cd05a4d&query=${word}`
      );

      if (res.data.results.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No Movies Found",
          text: `No movies found for ${word}. Please try a different search.`,
        });
      }

      dispatch({
        type: SEARCH_MOVIE,
        data: res.data.results,
        page: res.data.total_pages,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as ApiErrorResponse;

      Swal.fire({
        icon: "error",
        title: "Search Failed",
        text: errorMessage?.status_message || axiosError.message,
      });
    }
  };
};

export const getpage = async (page: number) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?59451d7e2175571f1ffca5a52cd05a4d&page=${page}`
      );
      dispatch({
        type: all,
        data: response.data.results,
        total: response.data.total_pages, // Ensure this returns total pages correctly
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage = axiosError.response?.data as ApiErrorResponse;

      Swal.fire({
        icon: "error",
        title: "Failed to fetch movies",
        text: errorMessage?.status_message || axiosError.message,
      });
    }
  };
};
