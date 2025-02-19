import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

// Define the Movie interface
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  homepage?: string; // Optional if the homepage might not exist
}

export const MovieDetails = () => {
  const param = useParams();
  const [movie, setMovie] = useState<Movie | null>(null); // Use Movie type or null

  // Get movie by details
  const getMovieDetails = async () => {
    try {
      // Show loading alert
      Swal.fire({
        title: "Loading...",
        text: "Fetching movie details, please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Show loading spinner
        },
      });

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.id}?api_key=59451d7e2175571f1ffca5a52cd05a4d`
      );
      setMovie(res.data); // Set the movie data

      // Close the loading alert once data is fetched
      Swal.close();
    } catch (error) {
      console.error("Failed to fetch movie details:", error);

      // Show error message using SweetAlert
      Swal.fire({
        icon: "error",
        title: "Failed to fetch movie details",
        text: "An error occurred while fetching the movie details. Please try again later.",
      });
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, [param.id]);

  // If the movie is not yet loaded, don't return anything since loading is handled by SweetAlert
  if (!movie) {
    return null; // Do not return anything while the loading alert is active
  }

  return (
    <div>
      <Row className="justify-content-center mt-3 mb-3">
        <Col md="12" xs="12" sm="12" className="mt-4 ">
          <div className="card-detalis d-flex align-items-center ">
            <img
              className="img-movie w-30"
              src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
              alt={movie.title}
            />
            <div className="justify-content-center text-center mx-auto">
              <p className="card-text-details border-bottom">
                اسم الفيلم: {movie.title}
              </p>
              <p className="card-text-details border-bottom">
                تاريخ الفيلم: {movie.release_date}
              </p>
              <p className="card-text-details border-bottom">
                عدد المقيمين: {movie.vote_count}
              </p>
              <p className="card-text-details border-bottom">
                التقييم: {movie.vote_average}
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="12" xs="12" sm="12" className="mt-3 mb-3">
          <div className="card-story d-flex flex-column align-items-start">
            <div className="text-end p-4 ">
              <p className="card-text-title border-bottom">القصة:</p>
            </div>
            <div className="text-end px-2">
              <p className="card-text-story">{movie.overview}</p>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center  mb-2">
        <Col
          md="10"
          xs="12"
          sm="12"
          className="mt-2 mb-3 d-flex justify-content-center "
        >
          <Link to="/">
            <button
              style={{ backgroundColor: "#b45b35", border: "none" }}
              className="btn btn-primary mx-2"
            >
              Main Page
            </button>
          </Link>
          {movie.homepage && (
            <a href={movie.homepage}>
              <button
                style={{ backgroundColor: "#b45b35", border: "none" }}
                className="btn btn-primary"
              >
                Watch Now
              </button>
            </a>
          )}
        </Col>
      </Row>
    </div>
  );
};
