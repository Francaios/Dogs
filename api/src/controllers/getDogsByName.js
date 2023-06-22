const { API_KEY } = process.env;
const { Op } = require('sequelize');
const { Dog, Temperament }= require('../db')
const axios = require ('axios');

const getDogsByName = async ( searchedName ) =>{
    try{
        let dbDogs = await Dog.findAll({
            where:{
                name: {
                    [Op.iLike]: '%'+searchedName+'%',
                }
            },
            include: Temperament
        });
        const apiDogs = await axios(`https://api.thedogapi.com/v1/breeds/search?name=${searchedName}`)
        const dogPromises = apiDogs.data.map(async dog =>{
            const imageResponse = await axios(`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`);
            const image = imageResponse.data.url;
            return{
                id: dog.id,
                name: dog.name,
                image: image,
                temperaments:dog.temperament ? dog.temperament.split(",") : [],
            }
        });
        const dogs = await Promise.all(dogPromises);
        return dbDogs.concat(dogs);
    }
    catch (error) {
        return {error: error.message}
    }
}

module.exports = getDogsByName;