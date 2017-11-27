import React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import Demo from './Demo'

const mountNode = document.getElementById('root')

const Base = styled.div`
  display: flex;
  justify-content: center;
  width : 100%;
  font-size: 32px;
`

const Root = () => (
  <Base>
    <Demo />
  </Base>
)

render(<Root />, mountNode)
