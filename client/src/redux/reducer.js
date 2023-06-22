import { GET_DOGS, GET_TEMPERAMENTS, POST_DOG, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENT, ORDER_BY_NAME, ORDER_BY_WEIGHT } from "./action-types";

const initialState = {
    allDogs: [],
    allTemperaments: [],
    allDogsShown: [],
    dogsSearched: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                allDogs:action.payload,
                allDogsShown:action.payload
            };

        case GET_TEMPERAMENTS:
            return {
                ...state,
                allTemperaments: action.payload
            };
        
        case POST_DOG:
            return{
                ...state,
                allDogs: [...state.allDogs, action.payload],
                allDogsShown: [...state.allDogs, action.payload]
            };

        case FILTER_BY_ORIGIN:
            if(action.payload==="none") return {...state, allDogsShown: [...state.allDogs]};
            const allDogsByOrigin = state.allDogs.filter(dog => dog?.origin === action.payload)
            return{
                ...state,
                allDogsShown: allDogsByOrigin
            };

        case FILTER_BY_TEMPERAMENT:
            if(action.payload==="none") return {...state, allDogsShown: [...state.allDogs]};
            const allDogsFilteredByTemperament = state.allDogs.filter((dog) =>
                  dog.temperaments.includes(action.payload)
              );
            const dbFilteredDogs = state.allDogs.filter((dog) => {
                const hasTemperament = dog.temperaments.some(
                  (temperament) => temperament.name === action.payload
                );
                return hasTemperament;
              });
            return{
                ...state,
                allDogsShown: [...allDogsFilteredByTemperament,...dbFilteredDogs]
            };

        case ORDER_BY_NAME:
            if(action.payload === "order") return{
                ...state
            };
            const allDogsOrderedByName = action.payload === "Ascendente"
            ? state.allDogsShown.sort((a,b) => a.name.localeCompare(b.name))
            : state.allDogsShown.sort((a,b) => b.name.localeCompare(a.name))

            return {
                ...state,
                allDogsShown: 
                    [...allDogsOrderedByName]
            };

        case ORDER_BY_WEIGHT:
            if(action.payload=== "order") return{
                ...state
            };
            const allDogsOrderedByWeight = action.payload === "Ascendente"
            ? state.allDogsShown.sort((a, b) => {
                const weightA = parseInt(a.weight.split(" - ")[0]);
                const weightB = parseInt(b.weight.split(" - ")[0]);
                return weightA - weightB;
              })
            : state.allDogsShown.sort((a, b) => {
                const weightA = parseInt(a.weight.split(" - ")[0]);
                const weightB = parseInt(b.weight.split(" - ")[0]);
                return weightB - weightA;
              })
            return {
                ...state,
                allDogsShown: [...allDogsOrderedByWeight]
              }; 

        default:
            return {...state}
    }
}


export default reducer;