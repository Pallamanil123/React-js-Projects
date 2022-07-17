import { NavLink, useParams } from "react-router-dom";
import React,{ useEffect, useState} from "react";
import { API_URL } from "./context";

const SingleMovie = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] =useState(true);
    const [movie,setMovie] = useState("")
   
   
    
    const getMovies = async(url) => {
        setIsLoading(true)
        try {
            const res =await fetch(url);
            const data = await res.json();
            console.log(data);

        if (data.Response === "True") {
            setIsLoading (false)
            setMovie(data)
        }
        } catch (error) {
            console.log(error)
        }
    }

   useEffect(() => {
    let timerOut = setTimeout (() => {
        getMovies(`${API_URL}&i=${id}`);
    },500);

    return () => clearTimeout(timerOut);
    
   },[id]);

   if ( isLoading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    )
   }

   return (
      <section className="movie-section">
       <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>

        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text"><b>Released : </b>{movie.Released}</p>
          <p className="card-text"> <b>IMDB Rating :</b> {movie.imdbRating}</p>
          <p className="card-text"> <b>Genre :</b> {movie.Genre}</p>
          <p className="card-text"> <b>Country :</b> {movie.Country}</p>
          <p className="card-text"> <b>Director :</b> {movie.Director}</p>
          <NavLink to="/" className="back-btn">Go Back</NavLink>
        </div>
       </div>

      </section>
   )
 
}


export default SingleMovie;