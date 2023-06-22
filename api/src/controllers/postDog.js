const { Dog, Temperament }= require('../db.js')


const postDog = async (form) => { 
    try {
        const id= Date.now().toString();
        console.log(id)
        const { name,image, weight, height, lifespan, temperaments } = form;
        console.log(form)
        if(  !name || !image || !weight || !lifespan || !height || !temperaments.length ) throw new Error('Faltan datos obligatorios')
        
        
        let newDog = await Dog.create({
            name,image, weight, height, lifespan,id
        });


        await newDog.addTemperaments(temperaments)

        return newDog;

    } catch (error) {
        return {error: error.message};
    }
    
}

module.exports = postDog;