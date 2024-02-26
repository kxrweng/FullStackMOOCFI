import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const History = (props) => {
  if (props.allClicks.length == 0){
    return (
      <div>
        The app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      Button Press History : {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick,text}) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(prevState => prevState.concat('L')) //Do I have to copy all the elements of the prev array?
    setLeft(prevValue => prevValue + 1)
  }

  const handleRightClick = () => {
    setAll(prevState => prevState.concat('R'))
    setRight(prevValue => prevValue + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick = {handleLeftClick} text = "Left" />
      <Button handleClick = {handleRightClick} text = "Right" />
      {right}
      <History allClicks = {allClicks}/>
    </div>
  )
}
   
 

export default App
