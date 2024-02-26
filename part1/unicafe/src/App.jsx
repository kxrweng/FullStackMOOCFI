import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const StatisticLine = ({text,value}) => {
  return (
    <tr>
     <td>
      {text === "positive" ? `${text} ${value}\u0025` : `${text} ${value}`}
    </td>
    </tr>
   
  )
}

const Statistics = (props) => {
  const {good,neutral,bad} = props

  const total = good + neutral + bad
  
  const feedbackScoreMap = {
    "good" : 1,
    "neutral" : 0,
    "bad" : -1
  }

  const goodScore = good * feedbackScoreMap["good"]
  const badScore = bad * feedbackScoreMap["bad"]

  const averageScore = (goodScore + badScore)/total

  const positivePercentage = (parseFloat(good)/parseFloat(total)) * 100

  if (total == 0){
    return <div>No feedback given</div>
  }
  else{
     return (
    
      <table>
        <tbody>
        <StatisticLine text = "good" value = {good} />
        <StatisticLine text = "neutral" value = {neutral} />
        <StatisticLine text = "bad" value = {bad} />
        <StatisticLine text = "all" value = {total} />
        <StatisticLine text = "average" value = {averageScore} />
        <StatisticLine text = "positive" value = {positivePercentage} />
        </tbody>
      </table>

  ) 
  }



}

const Button = ({text,handleOperation}) => {
  return (
    <button onClick = {handleOperation}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGood = () => {
    setGood(prevValue => prevValue + 1)
  
  }
  
  const handleNeutral = () => {
    setNeutral(prevValue => prevValue + 1)
    
  }
  
  const handleBad = () => {
    setBad(prevValue => prevValue + 1)
  }
  return (
    <>
    <div>

      <h1>
        give feedback
      </h1>

      <Button text = "good" handleOperation = {handleGood}/>
      <Button text = "neutral" handleOperation = {handleNeutral}/>
      <Button text = "bad" handleOperation = {handleBad}/>

    </div>

    <div>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
     
    </div>
    </>
    
  )
}

export default App
