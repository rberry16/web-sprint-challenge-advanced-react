import React, {useState} from 'react'
import axios from 'axios'
const URL = 'http://localhost:9000/api/result'

export default function AppFunctional(props) {

  const [state, setState] = useState({
    x: 2,
    y: 2,
    steps: 0,
    email: '',
    grid: ['(1, 1)', '(2, 1)', '(3, 1)', 
         '(1, 2)', '(2, 2)', '(3, 2)', 
         '(1, 3)', '(2, 3)', '(3, 3)'],
    message: ''
  })
  

  const setEmail = (evt) => {
    setState({
      ...state,
      email: evt.target.value
    })
  }
  
  const submit = (evt) => {
    evt.preventDefault();
    axios.post(URL, { x: state.x, y: state.y, steps: state.steps, email: state.email })
    .then(res => {
      console.log(res.data)
      setState({
        ...state,
        message: res.data.message,
        email: '',
        
      })
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message,
        email: ''
      })
    })
  }
  
  const resetState = () => {
    setState({
      ...state,
      x: 2,
      y: 2,
      steps: 0,
      email: '',
      message: ''
    })
  }
  
  
  const moveLeft = () => {
    if (state.x > 1) {
      setState({
        ...state,
        x: state.x -1,
        steps: state.steps + 1
      })
    }
    else {
      setState({
        ...state,
        message: "You can't go left"
      })
    }
  }
  
  const moveRight = () => {
    if (state.x < 3) {
      setState({
        ...state,
        x: state.x +1,
        steps: state.steps + 1
      })
    } else {
      setState({
        ...state,
        message: "You can't go right"
      })
    }
  }
  
  const moveUp = () => {
    if (state.y > 1) {
      setState({
        ...state,
        y: state.y -1,
        steps: state.steps + 1
      })
    } else {
      setState({
        ...state,
        message: "You can't go up"
      })
    }
  }
  
  const moveDown = () => {
    if (state.y < 3) {
      setState({
        ...state,
        y: state.y +1,
        steps: state.steps + 1
      })
    } else {
      setState({
        ...state,
        message: "You can't go down"
      })
    }
  }

  const stepCounter = () => {
    if(state.steps === 1) {
      return (<h3 id="steps">You moved {state.steps} time</h3>)
    } else {
      return(<h3 id="steps">You moved {state.steps} times</h3>)
    }
  }

  return (
    <div id="wrapper" className={props.className}>
              <div className="info">
          <h3 id="coordinates">Coordinates ({state.x},{state.y})</h3>
          {stepCounter()}
        </div>
        <div id="grid">
          {state.grid.map((value, idx) => {
            if (value === `(${state.x}, ${state.y})`) {
              return (<div className='square active' key={idx} name={value}>B</div>)
            }
            else {
              return (<div className='square' key={idx} name={value}></div>)
            }
          })}
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={moveLeft}>LEFT</button>
          <button id="up" onClick={moveUp}>UP</button>
          <button id="right" onClick={moveRight}>RIGHT</button>
          <button id="down" onClick={moveDown}>DOWN</button>
          <button id="reset" onClick={resetState}>reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={setEmail} value={state.email}></input>
          <input id="submit" type="submit" onClick={submit}></input>
        </form>
    </div>
  )
}
