import { GET_DOGS, GET_TEMPERAMENTS, POST_DOG, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT, SEARCH_BY_NAME } from "./action-types";
import axios from 'axios'

export const getDogs = () => {
    return async (dispatch) =>{
        const response = await axios('http://localhost:3001/dog')
        const data = response.data;

        return dispatch({
            type: GET_DOGS,
            payload: data
        })
    }
}

export const getTemperaments = () => {
    return async (dispatch) =>{
        const response = await axios('http://localhost:3001/temperament')
        const data = response.data;

        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: data
        })
    }
}

export const addDog = ({name, image, height, weight, lifespan, temperaments}) =>{
    return async (dispatch) =>{
        const response = await axios.post(`http://localhost:3001/dog`, {name:name, height:height, weight:weight, image:image, lifespan:lifespan, temperaments:temperaments})
        const data = response.data;

        return dispatch({
            type: POST_DOG,
            payload: data
        })
    }
}

export const searchVideogamesByName = (name) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:3001/dog/?name=${name}`)
        const data = response.data;

        return dispatch({
            type: SEARCH_BY_NAME,
            payload: data
        })
    }
}

export const filterCardsByOrigin = (origin) => {
    return { type: FILTER_BY_ORIGIN, payload: origin }
}

export const filterCardsByTemperament = (temperament) => {
    return { type: FILTER_BY_TEMPERAMENT, payload: temperament }
}

export const orderCardsByName = (name) => {
    return { type: ORDER_BY_NAME, payload: name }
}

export const orderCardsByWeight = (weight) => {
    return { type: ORDER_BY_WEIGHT, payload: weight }
}