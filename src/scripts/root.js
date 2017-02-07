import React from 'react'
import { render } from 'react-dom'
import Chart from './components/Chart'

import styles from './root.css'

const mountNode = document.getElementById('root')

const Root = () => (
  <div className={styles.root}>
    <Chart />
  </div>
)

render(<Root />, mountNode)
