import React, { useMemo } from 'react'
import Chart from './LineChart.d3'
import ChartWrapper from '../ChartWrapper'

const LineChart = ({ data, setSelected }) => {
  const initProps = useMemo(() => ({ data, setSelected }), [data, setSelected])
  const updateProps = useMemo(() => ({ data }), [data])
  const margin = useMemo(() => ({ BOTTOM: 50, LEFT: 50 }), [])

  return (
    <ChartWrapper Chart={Chart} initProps={initProps} updateProps={updateProps} margin={margin} />
  )
}

export default LineChart
