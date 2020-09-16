import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [found, setFound] = useState(false)

  useEffect(()=>{
    if(name){
      try {
        axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then(response => {
          setCountry(response.data)  
          setFound(true)
        })
        
      } catch (error) {
        setFound(false)
        console.log(error.message);        
    }
  }
  },[name])

  return {
    country,
    found
  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.country[0].name} </h3>
      <div>capital {country.country[0].capital} </div>
      <div>population {country.country[0].population}</div> 
      <img src={country.country[0].flag} height='100' alt={`flag of ${country.country[0].name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App