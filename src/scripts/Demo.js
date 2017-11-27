import React from 'react'
import pure from 'recompose/pure'
import Button from './components/Button'
import Chart from './components/Chart'

class Demo extends React.Component {
  componentWillMount() {
    this.setState({ data: [] })
  }

  onClick = () => {
    const date = new Date()
    const newDataPoint = {
      cy: Math.floor((Math.random() * 100) + 1),
      timeStamp: date.valueOf(),
    }

    this.setState({
      data: [
        ...this.state.data,
        newDataPoint,
      ],
    })
  }

  render() {
    return (
      <div>
        <Chart data={this.state.data} />
        <Button onClick={this.onClick}>Click</Button>
      </div>
    )
  }
}

export default pure(Demo)
