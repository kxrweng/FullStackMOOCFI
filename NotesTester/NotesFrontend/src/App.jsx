import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from './components/Notification'
const App = () => {

  const Footer = () => {
    const footerStyle = {
      color : 'green',
      fontStyle : 'italic',
      fontSize : 16
    }
    return (
      <div style = {footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('A new note...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService.getAll()
    .then(fetchedNotes => {
      console.log(fetchedNotes)
      setNotes(fetchedNotes)
    } )
  }, []);

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content : newNote,
      important : Math.random() < 0.5,
    }
    noteService.create(noteObject).then(newNote => {
      setNotes(notes.concat(newNote))
      setNewNote('')
    })
  }
  
  const toggleImportanceOf = (id) => {
    console.log("Out of toggleImportance")
    console.log(id)
    console.log(typeof id)
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important : !note.important}
    noteService.update(id,changedNote)
    .then(updatedNote => {
      console.log("Within toggleImportance")
      console.log(id)
      console.log(typeof id)
      setNotes(notes.map((note) => note.id === id ? updatedNote : note))
    })
    .catch(error => {
      setErrorMessage(`Note '${note.content}' was already removed from the server`)
      setTimeout(()=> {
        setErrorMessage(null)
      },5000)
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  return (
    <div>
      <h1>Notes</h1>
      <Notification message = {errorMessage}/>
      <div>
        <button onClick = {() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => <Note key = {note.id} note = {note} toggleImportance={() => toggleImportanceOf(note.id)}/> )}
      </ul>
      <form onSubmit = {addNote}>
        <input value = {newNote} onChange={handleNoteChange} />
        <button type = "submit">Save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App
