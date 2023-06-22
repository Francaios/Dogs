import './App.css';
import Cards from './Components/Cards/Cards'
import Detail from './Components/Detail/Detail';
import NavBar from './Components/NavBar/NavBar';
import Landing from './Components/Landing/Landing.jsx';
import DogForm from './Components/DogForm/DogForm'
//import Home from './Components/Home/Home'
import { Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getDogs } from "./redux/actions";

function App() {

  const dispatch= useDispatch()

  const[search, setSearch]= useState([])

  const onSearch = async (dog) =>{
     const response = await axios(`http://localhost:3001/dog/`, {params :{name: dog}})
      setSearch(response.data)
  }

  let apiData = useSelector((state) => state.allDogsShown);
  
  useEffect(() => {
    dispatch(getDogs())
   },[dispatch])

  return (
    <div>
          <Route exact path='/'>{<Landing/>}</Route>
          <Route exaxct path='/dog'>{<NavBar onSearch={onSearch}/>}</Route>
          <Route exact path='/dog' >{apiData.length ? <Cards data={apiData} search={search}/> : null}</Route>
          <Route exact path='/dog/:detailId'>{<Detail/>}</Route>
          <Route path='/form'>{<DogForm/>}</Route>
    </div>
  );
}

export default App;

