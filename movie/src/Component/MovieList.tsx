import React, { useEffect, useState } from "react";
import { CardMovie } from "./CardMovie";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Zoom } from "react-awesome-reveal";
import { useDispatch, useSelector } from "react-redux";
import { getALLMovie } from "../Redux/Action/ActionReduce";
import { RootState, AppDispatch } from "../Redux/Store/Stroe"; // Correct types
import { PaginationComponent } from "./PaginationComponent";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  original_title: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
}
export const MovieList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [movie, setMovie] = useState<Movie[]>([]);

  useEffect(() => {
    dispatch(getALLMovie());
  }, []);
  const moviee = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    setMovie(moviee);
  }, [moviee]);
  useEffect(() => {
    if (movie.length === 0) {
      Swal.fire({
        title: "Loading...",
        text: "Wait until bring the Data.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    const timer = setTimeout(() => {
      Swal.close();
    }, 2000);

    return () => {
      clearTimeout(timer);
      Swal.close();
    };
  }, [movie]);

  return (
    <Zoom triggerOnce>
      <Row className="mt-3">
        {movie.length > 0 ? (
          movie.map((el: Movie) => <CardMovie key={el.id} movie={el} />)
        ) : (
          <p className="text-center p-5 fs-1 fw-bold ">No movies available.</p>
        )}

        {movie.length >= 1 ? <PaginationComponent /> : ""}
      </Row>
    </Zoom>
  );
};
