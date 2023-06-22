import { useState } from "react";
import style from './SearchBar.module.css';

function SearchBar({onSearch}) {
   const [dog, setDog] = useState('')

   const handleChange = (event) => {
      setDog(event.target.value);
   }

   return (
      <div className={style.container}>
         <input className={style.search} type='search' value={dog} onChange={handleChange} />
         <button onClick={() => onSearch(dog)}>Search</button>
      </div>
   );
}

export default SearchBar;