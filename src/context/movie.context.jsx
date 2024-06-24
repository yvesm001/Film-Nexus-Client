import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState(null);
  const navigate = useNavigate();

  const getAllMovies = async () => {
    try {
      const response = await api.get("/movie/all");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  const createMovie = async (body) => {
    try {
      const response = await api.post("/movie", body);

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log("Error while adding new movie", error);
    }
  };

  return (
    <MovieContext.Provider value={{ movies, createMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
