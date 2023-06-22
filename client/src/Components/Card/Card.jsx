import { Link } from 'react-router-dom';
import style from './Card.module.css';

function Card({ name, image, temperament, id}) {
  return (
    <div className={style.tarjeta}>
      <div>
        <Link to={{ pathname: `/dog/${id}`, state: { image } }}>
          <img className={`${style.imagen} ${style.cardImage}`} src={image} alt={name} />
        </Link>
      </div>
      <div>
        <h2>Name: {name}</h2>
      </div>
      <div>
        <h2>Temperamentos:</h2>
        <ul className={style.temperamentList}>
          {temperament.length>1 ? temperament.map((temp) => (
            <li key={temp} className={style.temperamentItem}>{temp}</li>
          )):""}
        </ul>
      </div>
    </div>
  );
}

export default Card;


