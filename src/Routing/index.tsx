import React from "react";
import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Movies from "../pages/MoviesPage/Movies";

const Routing:React.FC = () => {
    return <div>
        <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/home"  element={<Home/>} />
            <Route path="/movies" element={<Movies/>} />
        </Routes>
    </div>;
}

export default Routing;