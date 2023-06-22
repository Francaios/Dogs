const axios = require ('axios');
const { Temperament } = require ('../db');

const getApiData = async () => {
    try{
        const apiData = await axios.get("https://api.thedogapi.com/v1/breeds");
        console.log("Hice la llamada a la API exitosamente");
        const temperaments = apiData.data.map(dog => ({
            temperaments: dog.temperament ? dog.temperament.split(",") : []
        }));
        const allTemperaments = temperaments.reduce((result, dog) => {
            return [...result, ...dog.temperaments];
        }, []).filter((value, index, self) => self.indexOf(value) === index);
    
        const responseArray = allTemperaments.map((value) => ({name: value}))
        return responseArray;

    }
    catch(error){
        console.log("Error en getApiData")
        return {error: error.message}

    }
}

const saveApiData = async () => {
    try {
        console.log("Entre a saveApiData")
        const allTemperaments = await getApiData();
        console.log("Volvi a saveApiData despues de llamar getApiData")
        allTemperaments.map( async temp => await Temperament.create(temp));

        return allTemperaments;
        
    } catch (error) {
        console.log("Error en saveApiData")
        return {error: error.message}
    } 
}

module.exports = saveApiData;