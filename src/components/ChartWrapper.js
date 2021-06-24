import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import useWindowSize from '../hooks/useWindowSize'

const useStyles = makeStyles({
  fullHeight: {
    height: '100%',
  },
  chartWrapper: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: '100%',
  },
})

const ChartWrapper = ({
  Chart, // ES6 class for chart
  initProps, // object of props to pass to init
  updateProps, // object of props to pass to update
  margin, // object for margins
}) => {
  const classes = useStyles()
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
  const [chartSet, setChartSet] = useState(null)
  const { width, height } = useWindowSize()

  // init + update
  useEffect(() => {
    if (!chart) {
      setChart(new Chart(chartArea.current, initProps))
    } else {
      if (chartSet) {
        chart.update(updateProps)
      }
    }
  }, [chart, chartSet, Chart, initProps, updateProps])

  // set/update height/width
  useEffect(() => {
    if (chartArea && chart) {
      const { offsetWidth, offsetHeight } = chartArea.current.parentElement
      chart.setDimensions(offsetWidth, offsetHeight, margin)
      setChartSet(true)
    }
  }, [chartArea, chart, margin, width, height])

  return (
    <div className={classes.fullHeight}>
      <div className={classes.chartWrapper} ref={chartArea}></div>
    </div>
  )
}

export default ChartWrapper
