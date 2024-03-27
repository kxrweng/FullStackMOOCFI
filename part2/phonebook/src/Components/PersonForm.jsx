import React from 'react'
import Persons from "./Persons"
import {useState} from 'react'
const PersonForm = ({persons}) => {

    const [peopleInfo,setPeopleInfo] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber,setNewNumber] = useState ('')
    //   const [searchResults, setSearchResults] = useState(persons)
    //   const [nameQueried, setNameQueried] = useState('')


    const handleNameInput = (event) => {
    let inputName = event.target.value
    setNewName(prevValue => inputName)
    }

    const handleNumberInput = (event) => {
    let inputNumber = event.target.value
    setNewNumber(prevValue => inputNumber)
    }

    const checkIfExist = (inputName) => {
    let existStatus = false
    const arrPerson = peopleInfo.filter((person) => person.name === inputName)
    if(arrPerson.length !== 0){
        existStatus = true
    }
    return existStatus

    }


    const AddToArray = (event) => {
    event.preventDefault()
    if(checkIfExist(newName)){
        alert(`${newName} is already added to phonebook`)
    }
    else{
        const newObj = {
        name : newName,
        number : newNumber
        }
        setPeopleInfo(prevArray => prevArray.concat(newObj))
    }

    setNewName(filledName => "")
    setNewNumber(prevValue => "")
    // setNameQueried(prevValue => "")
    }


    return (
        <form  onSubmit={AddToArray}>
        <h2>Add a new</h2>
        <div>
          name: <input value = {newName} 
              onChange={handleNameInput}
          />
        </div>
        <div>
          number :
           <input value = {newNumber}
            onChange = {handleNumberInput}
          />

        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm