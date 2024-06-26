import { createContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [movies, setMovies] = useState(null);
  const [watchlist, setWatchlist] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [favorites, setFavorites] = useState(null)
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

  const getWatchlist = async () => {
    try {
      const response = await api.get("/user/watchlist");
      console.log("Watchlist response:", response.data.watchlist);
      setWatchlist(response.data.watchlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const response = await api.delete(`user/watchlist/${movieId}`);
      if (response.status === 200) {
        toast.success("Movie removed from watchlist");
      }
    } catch (error) {
      console.log("Error removing movie from watchlist", error);
      toast.error("Error removing move from watchlist");
    }
  };

  const addToFavorites = async (movieId) => {
    try {
      const response = await api.post(`user/favorites/${movieId}`);
      if (response.status === 200 || response.status === 201) {
        toast.success("Movie added to favorites");
      }
    } catch (error) {
      console.log("Error adding movie to favorites", error);
      toast.error("Error adding movie to favorites");
    }
  };

  const getFavorites = async () => {
    try {
      const response = await api.get("/user/favorites");
      console.log("Favorites response:", response.data.favorites);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFavorites = async (movieId) => {
    try {
      const response = await api.delete(`user/favorites/${movieId}`);
      if (response.status === 200) {
        toast.success("Movie removed from favorites");
      }
    } catch (error) {
      console.log("Error removing movie from favorites", error);
      toast.error("Error removing move from favorites");
    }
  };


  const searchMovies = async (query) => {
    try {
      const response = await api.get(`/movie/search?query=${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.log("Error searching movies", error);
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
        getWatchlist,
        watchlist,
        removeFromWatchlist,
        searchMovies,
        searchResults,
        favorites,
        addToFavorites,
        removeFromFavorites,
        getFavorites,
        
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
