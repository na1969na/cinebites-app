import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


const Movie = () => {
  const location = useLocation();
  const { movieId } = location.state || {};

  
  return (
    <div>

      
    </div>
  )
}

export default Movie
