import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";

function Detalle() {

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get('movieID');

  const [movie, setMovie ]= useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=b9b8f01cf10467bb105fe2dcbc240863&language=es-ES`;
    //console.log(endPoint);
    axios.get(endPoint).then(response => {
      const movieData = response.data
      //console.log(movieID)
      console.log(movieData, 'Data de la movie')
      setMovie(movieData);
    })
      .catch(error => console.warn("Hubo errores, intenta nuevamente"))
    console.log(movieID);
    

  }, []);  

  return ( 
    <>
    {
      movie && (
        <>
        <div class="d-flex p-2 mb-3 bd-highlight justify-content-around">
          <h2>Detalle de la película</h2>
          {/* <Link to={`/listado`}>
                  <Button variant="btn btn-outline-success">Home</Button>
          </Link> */}
        </div>

          <div className='row'>
            <div className='col-4'>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className='img-fluid' alt='movie poster' />
            </div>
            <div className='col-8'>
              <h4>{movie.title} </h4>
              <h6>Fecha de lanzamiento: {movie.release_date} </h6>
              <p>Reseña: {movie.overview}</p>
              <h5>Género: </h5>
                <ul>
                  { movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                </ul>
            </div>
          </div>
          
        </>
        )
    }
          
        </>
  )
}

export default Detalle;