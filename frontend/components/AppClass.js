import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
state = {
  x: 2,
  y: 2,
  steps: 0,
  email: '',
  grid: ['(1, 1)', '(2, 1)', '(3, 1)', 
         '(1, 2)', '(2, 2)', '(3, 2)', 
         '(1, 3)', '(2, 3)', '(3, 3)'],
  message: ''
}

setEmail = (evt) => {
  this.setState({
    ...this.state,
    email: evt.target.value
  })
}

resetState = () => {
  this.setState({
    ...this.state,
    x: 2,
    y: 2,
    steps: 0,
    email: '',
    message: ''
  })
}


moveLeft = () => {
  if (this.state.x > 1) {
    this.setState({
      ...this.state,
      x: this.state.x -1,
      steps: this.state.steps + 1
    })
  }
  else {
    this.setState({
      ...this.state,
      message: "You can't go left"
    })
  }
}

moveRight = () => {
  if (this.state.x < 3) {
    this.setState({
      ...this.state,
      x: this.state.x +1,
      steps: this.state.steps + 1
    })
  } else {
    this.setState({
      ...this.state,
      message: "You can't go right"
    })
  }
}

moveUp = () => {
  if (this.state.y > 1) {
    this.setState({
      ...this.state,
      y: this.state.y -1,
      steps: this.state.steps + 1
    })
  } else {
    this.setState({
      ...this.state,
      message: "You can't go up"
    })
  }
}

moveDown = () => {
  if (this.state.y < 3) {
    this.setState({
      ...this.state,
      y: this.state.y +1,
      steps: this.state.steps + 1
    })
  } else {
    this.setState({
      ...this.state,
      message: "You can't go down"
    })
  }
}

stepCounter = () => {
  if(this.state.steps === 1) {
    return (<h3 id="steps">You moved {this.state.steps} time</h3>)
  } else {
    return(<h3 id="steps">You moved {this.state.steps} times</h3>)
  }
}

submit = (evt) => {
  evt.preventDefault();
  axios.post(URL, { x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email })
  .then(res => {
    console.log(res.data)
    this.setState({
      ...this.state,
      message: res.data.message,
      email: ''
    })
  })
  .catch(err => {
    console.error(err.response.data.message)
    this.setState({
      ...this.state.email,
      message: err.response.data.message,
      email: ''
    })
  })
}

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x},{this.state.y})</h3>
          {this.stepCounter()}
        </div>
        <div id="grid">
          {this.state.grid.map((value, idx) => {
            if (value === `(${this.state.x}, ${this.state.y})`) {
              return (<div className='square active' key={idx} name={value}>B</div>)
            }
            else {
              return (<div className='square' key={idx} name={value}></div>)
            }
          })}
        </div>
        <div className="info">
          <h3 id="message" value={this.state.message}>{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.moveLeft}>LEFT</button>
          <button id="up" onClick={this.moveUp}>UP</button>
          <button id="right" onClick={this.moveRight}>RIGHT</button>
          <button id="down" onClick={this.moveDown}>DOWN</button>
          <button id="reset" onClick={this.resetState}>reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input id="email" type="email" placeholder="type email" onChange={this.setEmail} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
