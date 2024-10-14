import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  original_title: string; // Required property
  vote_count: number; // Required property
  vote_average: number; // Required property
}

interface CardMovieProps {
  movie: Movie;
}

export const CardMovie: React.FC<CardMovieProps> = ({ movie }) => {
  // Base URL for TMDB images
  const imageUrl = "https://image.tmdb.org/t/p/w500"; // Adjust size as needed

  return (
    <Col xs="6" sm="6" lg="3" className="mt-3">
      <Link to={`/movie/${movie.id}`}>
        <div className="card">
          <img
            src={`${imageUrl}${movie.poster_path}`} // Use full URL for the image
            alt={movie.title} // Updated alt text for accessibility
            className="card__image"
          />
          <div className="card__overlay">
            <div className="overlay__text text-center w-100 p-2">
              <p>Movie Name: {movie.original_title}</p>
              <p>Date: {movie.release_date}</p>
              <p>Number of Votes: {movie.vote_count}</p>
              <p>Rate: {movie.vote_average}</p>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
};
