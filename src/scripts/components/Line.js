import React from 'react'
import PropTypes from 'prop-types'
import { line, area } from 'd3-shape'

class Line extends React.Component {
  componentWillReceiveProps() {
    const lineC = this.line
    const areaC = this.area
    const lineBox = lineC.getBoundingClientRect()
    const areaBox = areaC.getBoundingClientRect()

    this.setState({
      line: lineBox,
      area: areaBox,
    })
  }

  componentDidUpdate() {
    const lineC = this.line
    const areaC = this.area

    const newLineBox = lineC.getBoundingClientRect()
    const oldLineBox = this.state.line
    const newAreaBox = areaC.getBoundingClientRect()
    const oldAreaBox = this.state.area

    const lineDeltaX = oldLineBox.left - newLineBox.left
    const lineDeltaY = 0
    const areaDeltaX = oldAreaBox.left - newAreaBox.left
    const areaDeltaY = 0

    requestAnimationFrame(() => {
      lineC.style.transform = `translate(${lineDeltaX}px, ${lineDeltaY}px)`
      lineC.style.transition = 'transform 0s'

      areaC.style.transform = `translate(${areaDeltaX}px, ${areaDeltaY}px)`
      areaC.style.transition = 'transform 0s'

      requestAnimationFrame(() => {
        lineC.style.transform = ''
        lineC.style.transition = 'transform 1000ms'
        lineC.style.transitionTimingFunction = 'ease'

        areaC.style.transform = ''
        areaC.style.transition = 'transform 1000ms'
        areaC.style.transitionTimingFunction = 'ease'
      })
    })
  }

  render() {
    const data = this.props.data.map((d, index) => ({
      x: 300 - (index * 20),
      y: 150 - d.cy,
    }))

    const pathGenerator = line()
      .x(d => d.x)
      .y(d => d.y)

    const areaGenerator = area()
      .x(d => d.x)
      .y1(d => d.y)
      .y0(() => 150)

    return (
      <g>
        <defs>
          <linearGradient id="areaGradient" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0" stopColor="#00A1DE" stopOpacity="0.5" />
            <stop offset="1" stopColor="#88D2EE" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d={pathGenerator(data)}
          stroke="#00A1DE"
          fill="none"
          ref={(c) => { this.line = c }}
        />
        <path
          d={areaGenerator(data)}
          strokeWidth="0"
          fill="url(#areaGradient)"
          ref={(c) => { this.area = c }}
        />
      </g>
    )
  }
}

Line.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

Line.defaultProps = {
  data: [],
}

export default Line
