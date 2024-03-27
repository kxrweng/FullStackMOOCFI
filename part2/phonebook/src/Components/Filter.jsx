import React from 'react'
import {useState} from 'react'
const Filter = ({persons}) => {
    const [nameQueried, setNameQueried] = useState('')
    const [searchStatus, setSearchStatus] = useState(false)
    const [searchResults, setSearchResults] = useState(persons)

    const handleFilter = (event) => {
        let nameSearch = event.target.value
        // if(nameSearch !== ""){
        //   setSearchStatus(prevValue => !prevValue)
        // }
        setNameQueried(prevValue => nameSearch)
        const searchResultArr = persons.filter((person) => 
        person.name.toLowerCase().includes((nameSearch).toLowerCase())
        )
        setSearchResults(prevValue => searchResultArr)
        setSearchStatus(nameSearch.length > 0)
      }

    return (
        <div>
            filter shown with 
            <input type = "text"
            value = {nameQueried}
            onChange = {handleFilter} />
        </div>
    )
}

export default Filter