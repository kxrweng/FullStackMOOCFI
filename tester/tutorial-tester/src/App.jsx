import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
   
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [anecdoteVote, setVote] = useState({
    0 : 0,
    1 : 0,
    2 : 0,
    3 : 0,
    4 : 0,
    5 : 0,
    6 : 0,
    7 : 0,
  })
  const [maxVote, setMaxVote] = useState(0)
  const [bestIndex,setIndex] = useState(0)
  const [selected, setSelected] = useState(0)
  const handleNext = () => {
    let randomNum = Math.floor( (Math.random()) * 8)
    setSelected(prevValue => randomNum)
  }

  const handleVote = () => {
    setVote(prevObj => ({...prevObj, [selected] : prevObj[selected] + 1})
    )
    if(anecdoteVote[selected] > maxVote){
      setMaxVote(prevValue => anecdoteVote[selected])
      setIndex(prevValue => selected)
    }

  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {anecdoteVote[selected]} votes</p>
      <button onClick = {handleVote}>Vote</button>
      <button onClick = {handleNext}>Next Anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[bestIndex]}</p>
      <p>has {anecdoteVote[bestIndex]} votes</p>
    </div>
  )
}

export default App
