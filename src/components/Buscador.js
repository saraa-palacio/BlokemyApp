import React from "react";
import {Button } from 'react-bootstrap';
import swAlert from '@sweetalert/with-react'
import { useNavigate } from 'react-router-dom';

function Buscador() {
  const navigate = useNavigate();

  const submitHandler = (e) => {
      e.preventDefault();
      const searchword = e.currentTarget.searchword.value.trim();
      //console.log(searchword);

      if(searchword.length === 0){
        swAlert(<h2>Tienes que escribir una palabra para tu búsqueda</h2>)
      } else if(searchword.length < 3 ){
        swAlert(<h2>Tienes que escribir al menos 3 caracteres</h2>)
      } else {
        e.currentTarget.searchword.value = '';
        navigate(`/resultados?searchword=${searchword}`)
      }
  }

  return (
    <>
      <form onSubmit={submitHandler} className="gap-2" >
        <label>
          <input className="form-control" type="text" name="searchword" />
        </label>
        <Button type="submit" variant="outline-success">
          Buscar
        </Button>
      </form>
    </>
  );
}

export default Buscador;
