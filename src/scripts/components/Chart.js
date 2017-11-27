import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Points from './Points'
import Line from './Line'

const Svg = styled.svg`
  background-color: #FAFAFA;
  display: block;
  width: 600px;
`

const Chart = ({ data }) => (
  <Svg>
    {/* <Line data={data} /> */}
    <Points data={data} />
  </Svg>
)

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
}

Chart.defaultProps = {
  data: [],
}

export default Chart
