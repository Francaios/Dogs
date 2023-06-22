const { Dog, Temperament } = require('../db')
const axios = require ('axios');

const getAllDogs = async () => {
    try {

        const response = await axios(`https://api.thedogapi.com/v1/breeds`);
        let allDogs = response.data;
        allDogs = allDogs.map(dog =>{
            return{
                id: dog.id,
                name: dog.name,
                image: dog.image.url,
                weight: dog.weight.metric,
                temperaments: dog.temperament ? dog.temperament.split(",") : [],                
                origin: "api",
            }
        });
        const dbDogs = await Dog.findAll({ include: Temperament })
        console.log(dbDogs)
        dbDogs.length > 0 ? dbDogs.map(dog => allDogs.push(dog)) : ""
        return allDogs
    } catch (error) {
        return {error: error.message}
    }
};


module.exports = getAllDogs;