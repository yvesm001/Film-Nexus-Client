import { createContext, useEffect, useState } from "react";
import api from "../services/api";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState(null);

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
  return (
    <MovieContext.Provider value={{ movies }}>{children}</MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
