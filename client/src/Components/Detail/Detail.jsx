import style from "./Detail.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { detailId } = useParams();
  const [dog, setDog] = useState({});
  const location = useLocation();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dog/${detailId}`)
      .then((response) => {
        const dog = response.data;
        if (dog.name) {
          setDog(dog);
        } else {
          alert("No hay perro con ese ID");
        }
      })
      .catch((error) => {
        alert("No hay perro con ese ID");
      });
  }, [detailId]);

  console.log(detailId);

  return (
    <div className={style.container}>
      <div>
        <div>
          <button>
            <Link to="/dog" className={style.link}>
              Home
            </Link>
          </button>
          <h1>{dog?.name}</h1>
        </div>

        <div className={style.detail}>
          <div className={style.containerImg}>
            <img src={location.state.image} alt={dog?.name} />
          </div>

          <div>
            <label htmlFor="weight">Peso: </label>
            <p>{dog?.weight}</p>
            <label htmlFor="height">Altura: </label>
            <p>{dog?.height}</p>
            <label htmlFor="lifeSpan">Años de Vida: </label>
            <p>{dog?.lifespan}</p>
            <label htmlFor="temperaments">Temperamentos: </label>

              {dog?.temperaments?.map((temperament) => {
                
                return <p>{temperament.name ? temperament.name : temperament}</p>;
              })}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

