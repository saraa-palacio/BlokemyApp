import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Button} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import swal from '@sweetalert/with-react';
import Header from "./Header";

function Listado(props) {
  const navigate = useNavigate();

  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const endPoint = 'https://api.themoviedb.org/3/movie/now_playing?api_key=b9b8f01cf10467bb105fe2dcbc240863&language=es-ES'
    axios.get(endPoint)
    .then(response => {
      const apiData = response.data
      setMovieList(apiData.results)
    })
    .catch(error => {
      //console.log(error)
      swal(
        <h2>Ha ocurrido un error. Intenta más tarde</h2>
      )
    })
  }, [setMovieList]);

  //console.log(movieList)
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      console.log(token, "vacio");
      navigate("/");
    }
  }, []);

  const favMovies = localStorage.getItem('favs')
  //console.log(favMovies);

  let tempMovieFav;

  if (favMovies === null ){
    tempMovieFav = [];
  } else {
    //console.log('Hay favs')
    tempMovieFav = JSON.parse(favMovies)
  }

  //console.log(tempMovieFav)

 const addOrRemoveFav = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h2').innerText;
    const movieData = {
      imgURL, title,
      id: btn.dataset.movieId
    }
    
    let movieIsInArray = tempMovieFav.find(movie => {
      return movie.id === movieData.id
    })

    if (!movieIsInArray) {
      tempMovieFav.push(movieData)
      //console.log(tempMovieFav)
      localStorage.setItem('favs', JSON.stringify(tempMovieFav))
      console.log("Peli agregada")
    } else {
      let moviesLeft = tempMovieFav.filter(movie => {
        return movie.id !== movieData.id
      })
      localStorage.setItem('favs', JSON.stringify(moviesLeft))
      console.log('Se elimino la peli')
    }
  }

  return (
      <>
    {/* <Header/> */}
    <div className="row justify-content-md-center">
      <h1 className="text-center">Últimos lanzamientos- Películas en cartelera</h1>
      {
        movieList.map( (movie, idx) => {
          return (
            <div className="col-3"  key={idx}>
              <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
              <button 
                className='fav-btn'
                onClick={addOrRemoveFav} 
                data-movie-id = {movie.id}
              >🖤</button>
              <Card.Body>
                <h2>{movie.original_title}</h2>
                <Card.Text>
                  {movie.overview.substring(0,150)}...
                </Card.Text>
                <Link to={`/detalle?movieID=${movie.id}`}>
                  <Button variant="outline-danger">Ver más detalles</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          )
        })
      }
      <Footer />
    </div>
      </>
  );
}

export default Listado;
