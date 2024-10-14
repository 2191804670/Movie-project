import "./App.css";
import { NavBar } from "./Component/NavBar";
import { Container } from "react-bootstrap";
import { MovieList } from "./Component/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MovieDetails } from "./Component/MovieDetails";

function App() {
  return (
    <div className="font color-body">
      <BrowserRouter>
        <NavBar />
        <Container>
          <Routes>
            <Route path="" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
