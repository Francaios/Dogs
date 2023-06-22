const temperamentRouter = require('express').Router();
const getTemperaments = require('../controllers/getTemperaments');

temperamentRouter.get('/', async (req, res) =>{
    try {
        const temperaments = await getTemperaments();

        res.status(200).json(temperaments);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = temperamentRouter