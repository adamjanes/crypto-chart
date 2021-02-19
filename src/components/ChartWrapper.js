import React, { useRef, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'

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
  Chart,
  initProps,
  updateProps,
	margin
}) => {
  const classes = useStyles()
  const chartArea = useRef(null)
  const [chart, setChart] = useState(null)
  const [chartSet, setChartSet] = useState(null)

  useEffect(() => {
    if (!chart) {
      setChart(new Chart(chartArea.current, initProps))
    } else {
      if (chartSet) {
        chart.update(...updateProps)
      }
    }
  }, [chart, chartSet, ...updateProps])

  useEffect(() => {
    if (chartArea && chart) {
      const { offsetWidth, offsetHeight } = chartArea.current.parentElement
      chart.setDimensions(offsetWidth, offsetHeight, margin)
      setChartSet(true)
    }
  }, [chartArea, chart])

  return (
    <div className={classes.fullHeight}>
      <div className={classes.chartWrapper} ref={chartArea}></div>
    </div>
  )
}

export default ChartWrapper
