const { Dog, Temperament }= require('../db')
const axios = require ('axios');

const getDogById = async ( searchedId ) =>{
    try{
        let dbDog = await Dog.findByPk(searchedId,{ include: Temperament });
        console.log(dbDog)
        if (dbDog) return dbDog
        let response = await axios(`https://api.thedogapi.com/v1/breeds/${searchedId}`)
        let dog = response.data
        response = await axios(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`)
        let image = response.data.url
        const result ={
            name:dog.name,
            id:dog.id,
            image: image,
            weight: dog.weight.metric,
            height: dog.height.metric,
            lifespan: dog.life_span,
            temperaments: dog.temperament.split(","),
        }
        return result
    }
    catch (error) {
        return {error: error.message}
    }
}

module.exports = getDogById;