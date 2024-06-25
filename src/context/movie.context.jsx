import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

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
        toast.success(body.title + " added successfully");
        getAllMovies();
        navigate("/");
      }
    } catch (error) {
      console.log("Error while adding new movie", error);
    }
  };

  const updateMovie = async (body, id, toggle) => {
    try {
      const response = await api.put("/movie/" + id, body);
      if (response.status === 200 || response.status === 201) {
        toast.success(
          (response.data.updated.name = " was updated successfully")
        );
        getAllMovies();
        toggle(false);
      }
    } catch (error) {
      toast.error("Error updating this movie");
      console.log(error);
    }
  };

  const deleteMovie = async (id) => {
    try {
      const check = confirm("Delete this movie?");
      if (check) {
        const response = await api.delete("/movie/" + id);

        if (response.status === 200) {
          toast.success("Movie deleted successfully");
          getAllMovies();
          navigate(-1);
        }
      }
    } catch (error) {
      console.log("Error deleting movie", error);
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      const response = await api.post(`user/watchlist/${movieId}`);
      if (response.status === 200 || response.status === 201) {
        toast.success("Movie added to watchlist");
      }
    } catch (error) {
      console.log("Error adding movie to watchlist", error);
      toast.error("Error adding movie to watchlist");
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        createMovie,
        updateMovie,
        deleteMovie,
        getAllMovies,
        addToWatchlist,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
