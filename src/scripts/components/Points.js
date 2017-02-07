import React, { PropTypes } from 'react'

class Points extends React.Component {
  componentWillReceiveProps() {
    this.props.data.forEach((d) => {
      const component = this[`p-${d.timeStamp}`]
      const boundingBox = component.getBoundingClientRect()

      this.setState({
        [`p-${d.timeStamp}`]: boundingBox,
      })
    })
  }

  componentDidUpdate(prevProps) {
    prevProps.data.forEach((d) => {
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
          component.style.transition = 'transform 1000ms'
          component.style.transitionTimingFunction = 'ease'
        })
      })
    })

    const newDataPoint = this.props.data[0]
    const component = this[`p-${newDataPoint.timeStamp}`]

    requestAnimationFrame(() => {
      component.style.transform = 'translate(20px, 0px)'
      component.style.transition = 'transform 0s'

      requestAnimationFrame(() => {
        component.style.transform = ''
        component.style.transition = 'transform 1000ms'
        component.style.transitionTimingFunction = 'ease'
      })
    })
  }

  render() {
    return (
      <g>
        {
          this.props.data.map((d, index) => (
            <circle
              cy={150 - d.cy}
              cx={300 - (index * 20)}
              r="3"
              ref={(c) => { this[`p-${d.timeStamp}`] = c }}
              key={d.timeStamp}
              strokeWidth="1"
              fill="#00A1DE"
              stroke="#FFFFFF"
            />
          ))
        }
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
