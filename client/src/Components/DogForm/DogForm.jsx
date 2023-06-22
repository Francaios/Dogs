import { useState, useEffect } from 'react'
import { addDog, getTemperaments } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import './DogForm.modules.css';
import Select from "react-select";

const nameRegex = /^[^0-9]+$/;


export const validate = (inputs) => {
  let errors = {}; 

  if(!inputs.name){
    errors.name = 'Se requiere un nombre';
  }else if(!nameRegex.test(inputs.name)){
    errors.name = 'No se pueden usar numero en el nombre'
  }
  if(!inputs.image){
    errors.description = 'Se requiere una imagen'
  }
  if(!inputs.minWeight){
    errors.minWeight = 'Se requiere un peso minimo'
  }else if(inputs.minWeight>inputs.maxWeight){
    errors.minWeight = 'El valor tiene que ser menor al peso maximo'
  }
  if(!inputs.maxWeight){
    errors.maxWeight = 'Se requiere un peso maximo'
  }else if(inputs.maxWeight<inputs.minWeight){
    errors.maxWeight = 'El valor tiene que ser mayor al peso minimo'
  }
  if(!inputs.minHeight){
    errors.minHeight = 'Se requiere una altura minima'
  }else if(inputs.minHeight>inputs.maxHeight){
    errors.minHeight = 'El valor tiene que ser menor a la altura maxima'
  }
  if(!inputs.maxHeight){
    errors.maxHeight = 'Se requiere una altura maxima'
  }else if(inputs.maxHeight<inputs.minHeight){
    errors.maxHeight = 'El valor tiene que ser mayor a la altura minima'
  }
  if(!inputs.minLifespan){
    errors.minLifespan = 'Se requiere una esperanza de vida minima'
  }else if(inputs.minLifespan>inputs.maxLifespan){
    errors.minLifespan = 'El valor tiene que ser menor a los años de vida maxima'
  }
  if(!inputs.maxLifespan){
    errors.maxLifespan = 'Se requiere una esperanza de vida maxima'
  }else if(inputs.maxLifespan<inputs.minLifespan){
    errors.maxLifespan = 'El valor tiene que ser mayor a los años de vida minima'
  }
  if(!inputs.temperaments.length){
    errors.temperaments = 'Se requiere/n temperamento/s'
  }  

  return errors;
}

export default function Contact () {
    const dispatch = useDispatch();

    let allTemperaments = useSelector((state) => state.allTemperaments);

    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        dispatch(getTemperaments())
    },[dispatch])




  const [inputs, setInputs] = useState({
    name: '',
    image: '',
    minWeight: '',
    maxWeight: '',
    minHeight: '',
    maxHeight: '',
    minLifespan:'',
    maxLifespan: '',
    temperaments: [],
  })

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    minWeight: '',
    maxWeight: '',
    minHeight: '',
    maxHeight: '',
    minLifespan:'',
    maxLifespan: '',
    temperaments: '',
  })

  function handleSelect(data) {
    let i = data.length -1;
    setSelectedOptions(data);
    setInputs({
        ...inputs,
        temperaments:[...inputs.temperaments, data[i].value]
    })
  }

  const handleChange = (event) =>{
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    })

    setErrors(validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputs)
    if(!Object.values(errors).length){
      const updatedForm = {
        name: inputs.name,
        image: inputs.image,
        weight: inputs.minWeight + ' - ' + inputs.maxWeight,
        height: inputs.minHeight + ' - ' + inputs.maxHeight,
        lifespan: inputs.minLifespan + ' - ' + inputs.maxLifespan,
        temperaments: inputs.temperaments,
      }

      dispatch(addDog(updatedForm))
      setInputs({
        name: '',
        image: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minLifespan:'',
        maxLifespan: '',
        temperaments: [],
      })
      setErrors({
        name: '',
        image: '',
        minWeight: '',
        maxWeight: '',
        minHeight: '',
        maxHeight: '',
        minLifespan:'',
        maxLifespan: '',
        temperaments: '',
      })
    } else{
      alert("Te dije que tenias que llenar todos los campos")
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="container">
      <label htmlFor="name" className='col-25'>Nombre:</label>
      <input className="input" type="text" name='name' placeholder='Escribe el nombre de la raza' value={inputs.name}  onChange={handleChange} />
      {errors.name && <p className='danger' >{errors.name}</p>}
      <hr />

      <label htmlFor="image" className='label'>Imagen:</label>
      <input className="input" type="text" name='image' placeholder='Ingrese url de una imagen de la raza' value={inputs.image}  onChange={handleChange} />
      {errors.image && <p className='danger' >{errors.image}</p>}
      <hr />

      <label htmlFor="minWeight" className='label'>Peso Minimo:</label>
      <input className="input" type="text" name='minWeight' placeholder='Ingrese peso minimo de la raza' value={inputs.minWeight}  onChange={handleChange} />
      {errors.minWeight && <p className='danger' >{errors.minWeight}</p>}
      <hr />

      <label htmlFor="maxWeight" className='label'>Peso Maximo:</label>
      <input className="input" type="text" name='maxWeight' placeholder='Ingrese peso maximo de la raza' value={inputs.maxWeight}  onChange={handleChange} />
      {errors.maxWeight && <p className='danger' >{errors.maxWeight}</p>}
      <hr />

      <label htmlFor="minHeight" className='label'>Altura Minima:</label>
      <input className="input" type="text" name='minHeight' placeholder='Ingrese altura minima de la raza' value={inputs.minHeight}  onChange={handleChange} />
      {errors.minHeight && <p className='danger' >{errors.minHeight}</p>}
      <hr />

      <label htmlFor="maxHeight" className='label'>Altura Maxima:</label>
      <input className="input" type="text" name='maxHeight' placeholder='Ingrese altura maxima de la raza' value={inputs.maxHeight}  onChange={handleChange} />
      {errors.maxHeight && <p className='danger' >{errors.maxHeight}</p>}
      <hr />

      <label htmlFor="minLifespan" className='label'>Años de vida Minima:</label>
      <input className="input" type="text" name='minLifespan' placeholder='Ingrese años de vida minima de la raza' value={inputs.minLifespan}  onChange={handleChange} />
      {errors.minLifespan && <p className='danger' >{errors.minLifespan}</p>}
      <hr />

      <label htmlFor="maxLifespan" className='label'>Años de vida Maxima:</label>
      <input className="input" type="text" name='maxLifespan' placeholder='Ingrese años de vida maximos de la raza' value={inputs.maxLifespan}  onChange={handleChange} />
      {errors.maxLifespan && <p className='danger' >{errors.maxLifespan}</p>}
      <hr />

      <label htmlFor="temperaments" className='col-25'>Temperamento/s:</label>
      <Select
            name="temperaments"
            className={errors.temperaments && 'warning'}
          options={allTemperaments.map(temp => ({label: temp.name, value: temp.id}))}
          placeholder="Selecciona temperamento/s"
          value={selectedOptions}
          onChange={handleSelect}
          isMulti
        />
        {errors.temperaments && <p className='danger' >{errors.temperaments}</p>}
      <hr />

      <button type='submit' className={Object.values(errors).length ? "disabled" : 'submit'}>{Object.values(errors).length ? "Debe llenar todos los campos" : "Submit"}</button>
    </form>

  )
}

