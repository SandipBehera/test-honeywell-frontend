import React, { useEffect, useState } from 'react';
import "./movie.css"


const Movies = () => {
    const [movieList, setMovieList] = useState([]);
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch('http://localhost:3000/api/movies');
            const resData = await response.json();
            setMovieList(resData.data);
            console.log(resData);
        }
        fetchData();
    },[]);
const onsubmit = (movie_id) => {
    window.location.href = `/book/${movie_id}`;
}

    return (
        <div className="movie-list">
            {movieList.map((movie)=>{
                return(
            <div key={movie.id}>
            <img src={movie.image} alt="hello"/>
            <div className="movie-card-content">
                <h3>{movie.movie}</h3>
                <p className="tickets">Tickets Available: {movie.no_of_tickets-movie.booked_tickets}</p>
                <button onClick={()=>onsubmit(movie.id)}>Book Tickets</button>
            </div>
            </div>
                )
            })}
            
        </div>
    )
}
export default Movies;