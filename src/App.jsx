import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import CreateMoviePage from "./pages/CreateMoviePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/movies/:movieId" element ={<MovieDetails />} />

        <Route path="/movie/create" element={<CreateMoviePage />} />
        
      </Routes>
    </div>
  );
}

export default App;
