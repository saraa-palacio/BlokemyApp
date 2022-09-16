import React from 'react'
import Buscador from './Buscador'
import { Link } from "react-router-dom";
import { Button} from "react-bootstrap";

function Header() {

  return (
    <>
        <h1 className="bg-primary" >Blockemy App</h1>
        <div className="d-flex p-2 mb-3 bd-highlight justify-content-around">
          <Buscador/>
          <Link to={`/listado`}>
                  <Button variant="btn btn-outline-success">Home</Button>
          </Link>
        </div>
    </>
  )
}

export default Header