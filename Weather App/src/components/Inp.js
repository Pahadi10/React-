import '../Inp.css';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Out from './Out'
export const Inp = () => {

    const[city, setCity] = useState("")
    const[isEmpty, setIsEmpty] = useState(false)

    function searchHandler(event){
        event.preventDefault();
        const cityName = event.target.elements['city-name'].value;
        if (cityName.trim() === "") {
            setIsEmpty(true)
        }
        else{
            
            setIsEmpty(false)
            setCity(cityName)
        }

    }
  return (
    <div >
    <label className='inpDiv'>
    City Name: 
    <form onSubmit={searchHandler} className='form'>
        <input type='search'
            name='city-name'
            required
            placeholder='Delhi'
        />
        <button className='search-icon'>
        <FaSearch />
        </button>
    </form>
    </label>

    {isEmpty? (<p className='error'>*Enter a Valid City!</p>): (<Out city = {city}/>)}
    
    </div>
  )
}

export default Inp
