const dogsRouter = require('express').Router();
const getAllDogs = require('../controllers/getAllDogs');
const getDogById = require('../controllers/getDogById');
const getDogsByName = require('../controllers/getDogsByName');
const postDog= require('../controllers/postDog')



dogsRouter.get('/', async ( req, res ) => {
    const { name } =req.query;
    
    if(name){
        try {
    
            const response = await getDogsByName( name );
    
            res.status(200).json(response);
    
        } catch (error) {
            res.status(404).send(error.message);
        }
        
    }
    else{
        try {
            const allDogs= await getAllDogs();

            res.status(200).json(allDogs);
        } catch (error) {
            res.status(404).send(error.message)
        }
    }

})

dogsRouter.get('/:id', async ( req, res) => {
    try {
        const { id } = req.params;

        const response = await getDogById( id );

        const dog = {
            name: response.name,
            height: response.height,
            weight: response.weight,
            image: response.image,
            lifespan: response.lifespan,
            temperaments: response.temperaments
        }

        res.status(200).json(response);

    } catch (error) {
        res.status(404).send(error.message);
    }
})

dogsRouter.post('/', async (req, res) =>{
    try{
        console.log(req.body)
        const dog = await postDog(req.body)

        if(dog.error) throw new Error(dog.error)

        res.status(200).json(dog)
    }
    catch(error){
        res.status(404).send(error.message)
    }
})

module.exports = dogsRouter