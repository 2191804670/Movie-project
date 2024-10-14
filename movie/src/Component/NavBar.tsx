import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux/Store/Stroe"; // Fix the import path
import { getALLMovie, SearchMovie } from "../Redux/Action/ActionReduce";

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

export const NavBar = () => {
  const dispatch = useDispatch<AppDispatch>();

  const onsearch = (word: any) => {
    search(word);
  };

  const search = async (word: any) => {
    if (word === "") {
      dispatch(getALLMovie());
    } else {
      dispatch(SearchMovie(word));
    }
  };

  return (
    <div className="nav-style w-100">
      <Container>
        <Row className="pt-2">
          <Col xs="2">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </Col>
          <Col xs="10" lg="10" className="d-flex align-items-center">
            <div className="search w-100">
              <input
                type="text"
                className="form-control text-center"
                placeholder="Search"
                aria-label="Search movies"
                onChange={(e) => onsearch(e.target.value)}
              />
              <i className="fa fa-search"></i>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
