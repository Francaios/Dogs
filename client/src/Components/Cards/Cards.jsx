import Card from '../Card/Card';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { orderCardsByName, filterCardsByOrigin, getTemperaments, filterCardsByTemperament, orderCardsByWeight } from '../../redux/actions';
import style from './Cards.module.css'


function Cards({data, search}) {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTemperaments())
  },[dispatch])


  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const [filteredData, setFilteredData] = useState([]);

   let allTemperaments = useSelector((state) => state.allTemperaments)

   
   const handlerOrderByName = useCallback(
      (event) => {
        dispatch(orderCardsByName(event.target.value));
      },
      [dispatch]
    );
  
    const handlerOrderByWeight = useCallback(
      (event) => {
        dispatch(orderCardsByWeight(event.target.value));
      },
      [dispatch]
    );
  
    const handlerFilterByTemperament = useCallback(
      (event) => {
        dispatch(filterCardsByTemperament(event.target.value));
      },
      [dispatch]
    );
  
    const handlerFilterByOrigin = useCallback(
      (event) => {
        dispatch(filterCardsByOrigin(event.target.value));
      },
      [dispatch]
    );

    
   useEffect(() => {
      setFilteredData(search.length > 0 ? search : data);
   }, [search, data]);
   
   

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div>
         <div>
            <select className={style.select} onChange={handlerOrderByName} >
               <option value="order">Order By Name</option>
               <option value="Ascendente">Ascendente</option>
               <option value="Descendente">Descendente</option>
            </select>
            <select className={style.select} onChange={handlerOrderByWeight} >
               <option value="order">Order By Weight</option>
               <option value="Ascendente">Ascendente</option>
               <option value="Descendente">Descendente</option>
            </select>
            <select className={style.select} onChange={handlerFilterByOrigin} >
               <option value="none" >Filter By Origin</option>
               <option value="api">Api</option>
               <option value="db">Database</option>
       
            </select>
            <select className={style.select} onChange={handlerFilterByTemperament} >
               <option value="none" >Filter By Temperament</option>
               {allTemperaments.map((temp) => {
                  return <option
                  value={temp.name} key={temp.id}>{temp.name}</option>
               })}        
            </select>            
         </div>
         <div className={style.pagination}>
            <button
               onClick={() => setCurrentPage(currentPage - 1)}
               disabled={currentPage === 1}
            >
               Anterior
            </button>
            <button
               onClick={() => setCurrentPage(currentPage + 1)}
               disabled={indexOfLastItem >= filteredData.length}
            >
               Siguiente
            </button>
         </div>
         <div>
            { 
               currentItems.map(({id, name, temperaments, image,origin}) => {
                  //if(origin === "api"){
                  return <Card
                     key={id}
                     name={name}
                     temperament={temperaments ? temperaments.map(temp => {
                        return temp.name ? temp.name : temp
                      }) :
                     ""
                     }
                     image={image}
                     id={id}
                  />
                  /*}
                  else{
                     return <Card
                     key={id}
                     name={name}
                     temperament={temperaments ? temperaments.map(temp => {
                        return temp?.name
                      }) :
                     ""
                     }
                     image={image}
                     id={id}
                  />   
                  }*/
               })
             
            }
            
         </div>
         
         <div className={style.pagination}>
            <button
               onClick={() => setCurrentPage(currentPage - 1)}
               disabled={currentPage === 1}
            >
               Anterior
            </button>
            <button
               onClick={() => setCurrentPage(currentPage + 1)}
               disabled={indexOfLastItem >= filteredData.length}
            >
               Siguiente
            </button>
         </div>
      </div>
   )
}

export default Cards;

