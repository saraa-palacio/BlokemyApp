import { BrowserRouter, Route, Routes } from "react-router-dom";
import Listado from "./components/Listado";
import Login from "./components/Login";
import Header from "./components/Header";
import Resultados from "./components/Resultados";
import 'bootstrap/dist/css/bootstrap.min.css';
import Detalle from "./components/Detalle";

//Styles
import './css/app.css'

function App() {
 return (
  <>
    <BrowserRouter>
  <Header/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/listado" element={<Listado/>} />
        <Route path="/detalle" element={<Detalle/>} />
        <Route path="/resultados" element={<Resultados/>} />
      </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
