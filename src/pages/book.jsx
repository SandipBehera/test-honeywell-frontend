import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./movie.css";
import { useForm } from 'react-hook-form';

const Book = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { movie_id } = useParams();
    const [seatData, setSeatData] = useState(null);
    const userid = localStorage.getItem('user_id');
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:3000/api/movies/${movie_id}`);
        const resData = await response.json();
        setSeatData(resData.data);
      };
      fetchData();
    }, [movie_id]);
  
    const onSubmit = (data) => {
        const selectedSeats = Object.keys(data).filter(key => data[key]);
        const postData = {
            movie_id,
            user_id: userid,
            tickets: selectedSeats
        }
        fetch('http://localhost:3000/api/book',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }).then(response => response.json()).then(resData => {
            if(resData.message==='Tickets booked successfully'){
                alert('Tickets booked successfully');
                window.location.href = `/movies`;
            }
            else{
              alert('Not enough tickets available');
            }
        });
    };
  
    return (
      <div className="checkbox-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          {seatData && Array.from({ length: Number(seatData.no_of_tickets) }).map((_, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`seat-${index}`}
                value={`seat-${index}`}
                {...register(`seat-${index}`)}
              />
              <label htmlFor={`seat-${index}`}>Seat {index + 1}</label>
            </div>
          ))}
          <br />
          <br />
          <input type="submit" value="Book Tickets" />
        </form>
      </div>
    );
  };
export default Book;