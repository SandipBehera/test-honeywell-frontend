import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './pages/login';
import Movies from './pages/movies';
import Book from './pages/book';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/book/:movie_id" element={<Book />} />
        {/* <Route path="/booking/:user_id" element={<Booking />} /> */}
      </Routes>
   </Router>
  );
}

export default App;
