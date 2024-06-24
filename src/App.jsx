import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Homepage from "./pages/Homepage";

import Navbar from "./components/Navbar";
import FavoritePage from "./pages/FavoritePage";
import WatchedPage from "./pages/WatchedPage";
import MyListPage from "./pages/MyListPage";

import MovieDetails from "./pages/MovieDetails";
import CreateMoviePage from "./pages/CreateMoviePage";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/mylist" element={<MyListPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/watched" element={<WatchedPage />} />

        <Route path="/movies/:movieId" element={<MovieDetails />} />

        <Route path="/movie/create" element={<CreateMoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
