import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";
import swAlert from '@sweetalert/with-react'


let query = new URLSearchParams(window.location.search);
let searchword = query.get('searchword');
console.log(searchword)

function Resultados() {
  const [movieResult, setMovieResult] = useState([]);

useEffect(() => {
  
  const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=b9b8f01cf10467bb105fe2dcbc240863&language=es-ES%3E&page=1&include_adult=false&query=${searchword}`;

    axios.get(endPoint).then(response => {
      const movieArray = response.data.results;
      if (movieArray.length === 0){
        swAlert(<h2>Tu búsqueda no arrojó ningún resultado</h2>)
        searchword = '';
      }
      //console.log(movieArray, 'Data de la búsqueda')
      setMovieResult(movieArray);
    })
      .catch(error => console.warn("Hubo errores, intenta nuevamente"))

}, [searchword]);

  return (
    <>
      <h2>Sección de Resultados</h2>
      <p>Búsqueda: <em>{searchword} </em></p>
      {movieResult.length === 0 && <h3>No hay resultados para mostrar</h3>}

      <div className='row'>
        {
          movieResult.map((oneMovie, idx) => {
            return(
              <div className='col-3' key={idx}>
              <img src={`https://image.tmdb.org/t/p/w300/${oneMovie.poster_path}`} className='img-fluid' alt='movie poster' />
            
              <div className='card my-4'>

                <h3>{oneMovie.title} </h3>
                <h4>Título original: {oneMovie.original_title} </h4>
                <h6>Fecha de lanzamiento: {oneMovie.release_date} </h6>
                <p>Reseña: {oneMovie.overview.substring(0,150)}</p>
                {/* <h5>Idioma original: {oneMovie.original_language}</h5> */}
                <Link to={`/detalle?movieID=${oneMovie.id}`}>
                  <Button variant="outline-danger">Ver más detalles</Button>
                </Link>
              </div>
            </div>
              )
          })
        }
      </div>
    </>
  )
}

export default Resultados