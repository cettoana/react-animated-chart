import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { scaleLinear } from 'd3-scale'

const getXScale = R.pipe(
  R.takeLast(10),
  R.juxt([R.head, R.last]),
  R.pluck('timeStamp'),
  data => scaleLinear()
    .domain(data)
    .range([10, 590]),
)

class Points extends React.Component {
  componentWillMount() {
    const { data } = this.props

    const xScale = getXScale(data)

    this.setState({ xScale })
  }

  componentWillReceiveProps(nextProps) {
    const { data } = this.props
    const { data: newData = [] } = nextProps

    R.takeLast(10, data).forEach((d) => {
      const component = this[`p-${d.timeStamp}`]
      const boundingBox = component.getBoundingClientRect()

      this.setState({
        [`p-${d.timeStamp}`]: boundingBox,
      })
    })

    const xScale = getXScale(newData)
    this.standbyP.key = R.last(newData).timeStamp

    this.setState({
      standbyP: this.standbyP.getBoundingClientRect(),
      xScale,
    })
  }

  componentDidUpdate(prevProps) {
    R.takeLast(10, prevProps.data).forEach((d) => {
      const component = this[`p-${d.timeStamp}`]

      const newBox = component.getBoundingClientRect()
      const oldBox = this.state[`p-${d.timeStamp}`]

      const deltaX = oldBox.left - newBox.left
      const deltaY = oldBox.top - newBox.top

      requestAnimationFrame(() => {
        component.style.transform = `translate(${deltaX}px, ${deltaY}px)`
        component.style.transition = 'transform 0s'

        requestAnimationFrame(() => {
          component.style.transform = ''
          component.style.transition = 'transform 750ms'
          component.style.transitionTimingFunction = 'ease'
        })
      })
    })

    const newDataPoint = R.last(this.props.data)
    const component = this[`p-${newDataPoint.timeStamp}`]

    const newBox = component.getBoundingClientRect()
    const oldBox = this.state.standbyP
    const deltaX = oldBox.left - newBox.left
    const deltaY = oldBox.top - newBox.top

    requestAnimationFrame(() => {
      component.style.transform = `translate(${deltaX}px, ${deltaY}px)`
      component.style.opacity = 0
      component.style.transition = 'transform 0s'

      requestAnimationFrame(() => {
        component.style.transform = ''
        component.style.opacity = 1
        component.style.transition = 'transform 750ms, opacity 750ms'
        component.style.transitionTimingFunction = 'ease'
      })
    })
  }

  render() {
    return (
      <g>
        {
          R.takeLast(11, this.props.data).map(d => (
            <circle
              cy={150 - d.cy}
              cx={this.state.xScale(d.timeStamp)}
              r="4"
              ref={(c) => { this[`p-${d.timeStamp}`] = c }}
              key={d.timeStamp}
              strokeWidth="1"
              fill="#00A1DE"
              stroke="#FFFFFF"
            />
          ))
        }
        <circle
          cy={-10}
          cx={590}
          r="4"
          ref={(c) => { this.standbyP = c }}
          strokeWidth="1"
          fill="#00A1DE"
          stroke="#FFFFFF"
        />
      </g>
    )
  }
}

Points.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

Points.defaultProps = {
  data: [],
}

export default Points
