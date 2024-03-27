import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Filter from "./Components/Filter"
import PersonForm from "./Components/PersonForm"
import Persons from "./Components/Persons"
import axios from 'axios'
import contactService from "./services/contact"
import "./index.css"
import Notification from "./Components/Notifications"
const App = () => {

  const [persons,setPersons] = useState([])

  useEffect( () => {
    contactService.getAll().then(initialPersons => setPersons(initialPersons))
  },[])
  
  const [searchStatus, setSearchStatus] = useState(false)
  const [headerStyle, setHeaderStyle] = useState("header")
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState ('')
  const [searchResults, setSearchResults] = useState(persons)
  const [nameQueried, setNameQueried] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [HeaderMessage, setHeaderMessage] = useState("Welcome to Phonebook")
  const handleNameInput = (event) => {
    let inputName = event.target.value
    setNewName(prevValue => inputName)
  }

  const handleFilter = (event) => {
    let nameSearch = event.target.value
    // if(nameSearch !== ""){
    //   setSearchStatus(prevValue => !prevValue)
    // }
    setNameQueried(prevValue => nameSearch)
    const searchResultArr = persons.filter((person) => 
    person.name.toLowerCase().includes(nameSearch)
    )
    setSearchResults(prevValue => searchResultArr)
    setSearchStatus(nameSearch.length > 0)
  }
  const handleNumberInput = (event) => {
    let inputNumber = event.target.value
    setNewNumber(prevValue => inputNumber)
  }

  const checkIfExist = (inputName) => {
    let existStatus = false
    const arrPerson = persons.filter((person) => person.name === inputName)
    if(arrPerson.length !== 0){
      existStatus = true
    }
    return existStatus
  }

  // const handleOverwriteNum = (inputName) => {
  //   const exist = checkIfExist(inputName)
  //   if(exist){
  //     //Pop up window, if true, then update, else cancel
  //     if(window.confirm(`${inputName} is already added to phonebook, replace the old number with a new one?`)){
  //       const targettedPerson = persons.find((person) => person.id === id)
  //       const updatedPerson = {...targettedPerson, number : newNumber}
  //       const id = targettedPerson["id"]
  //       const updateReq = contactService.update(id,targettedPerson)
  //       updateReq.then(response => setPersons(persons.map(person) => {
  //         person.id !== id ? person : targettedPerson
  //       }))
  //     }
  //   }
  // }

  const handleOverwriteNum = (inputName) => {
    const exist = checkIfExist(inputName)
    if (exist) {
      //Pop up window, if true, then update, else cancel
      if (window.confirm(`${inputName} is already added to phonebook, replace the old number with a new one?`)) {
        const targettedPerson = persons.find((person) => person.name === inputName)
        const id = targettedPerson.id // Define id here
        const updatedPerson = { ...targettedPerson, number: newNumber }
        const updateReq = contactService.update(id, updatedPerson) // Use updatedPerson
        updateReq.then(response => {
          setPersons(persons.map(person => {
            return person.id !== id ? person : updatedPerson
          }))
        }).catch(error => {
          setHeaderMessage(`[ERROR] ${updatedPerson.name} has already been deleted from server`)
          setHeaderStyle(prevValue => "header-error")
          setTimeout(
            () => {
            setHeaderMessage("Welcome to Phonebook")
            setHeaderStyle("header")
          },5000)
        })
      }
    }
  }
  
  const AddToArray = (event) => {
    event.preventDefault()
    if(checkIfExist(newName)){
       handleOverwriteNum(newName)
    }
    else{
      const newObj = {
        name : newName,
        number : newNumber
      }
      
      contactService.post(newObj).then(newPerson => {
        setPersons(persons.concat(newPerson))
        let addedMsg = `Added ${newName}`
        setHeaderMessage(prevValue => addedMsg)
        setTimeout(() => setHeaderMessage(prevValue => "Welcome to Phonebook"),5000)
      })
    }
    setNewNumber(prevValue => "")
    setNewName(filledName => "")
    setNameQueried(prevValue => "")
  }

  const DeleteFromArray = (id) => {
    const person = persons.find((person) => person.id === id)
    if(window.confirm(`Delete ${person.name} ?`)){
      console.log("Deleting...")
      contactService.deletePerson(id).then(personToBeDeleted => {
        setPersons(persons.filter((person) => person.id !== personToBeDeleted.id))
      
      })
    }
    else{
      console.log("Cancel delete operation...")
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {HeaderMessage} headerStyle = {headerStyle} />
      <div>
        filter shown with <input value = {nameQueried}
        type = "text" onChange = {handleFilter}/>
      </div>
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
      <h2>Numbers</h2>
        <div>
    {searchStatus ?
    searchResults.map((person) => <div key = {person.id}>{person.name} {person.number} 
    <button>Delete</button>
    </div>) :
    persons.map((person) => <div key = {person.id}>{person.name} {person.number} <button onClick = {() => DeleteFromArray(person.id)}>Delete</button></div>)  
  }

         </div>
    </div>
  )
  // return (
  //   <div>
  //   <Filter persons = {persons}  />
  //   <PersonForm persons = {persons} />
  //   <Persons persons = {persons} />
  //   </div>

  // )
}

export default App
