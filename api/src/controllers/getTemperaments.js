const { Temperament }= require('../db');

const getTemperaments = async () => {
    try {
        const allTemperaments = await Temperament.findAll();
        return allTemperaments;
    } catch (error) {
        return {error: error.message}
    }
};


module.exports = getTemperaments;