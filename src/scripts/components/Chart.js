import React from 'react'
import pure from 'recompose/pure'
import Points from './Points'
import Line from './Line'

import styles from './Chart.css'

class Chart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        { cy: 50, timeStamp: 2 },
        { cy: 30, timeStamp: 1 },
        { cy: 10, timeStamp: 0 },
      ],
    }
  }

  onClick = () => {
    const date = new Date()
    const newDataPoint = {
      cy: Math.floor((Math.random() * 100) + 1),
      timeStamp: date.valueOf(),
    }

    this.setState({
      data: [
        newDataPoint,
        ...this.state.data,
      ],
    })
  }

  render() {
    return (
      <div>
        <svg className={styles.base}>
          <Line
            data={this.state.data}
          />
          <Points
            data={this.state.data}
          />
        </svg>
        <button onClick={this.onClick}>Click</button>
      </div>
    )
  }
}

export default pure(Chart)
