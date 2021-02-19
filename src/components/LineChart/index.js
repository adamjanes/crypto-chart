import React from 'react'
import { makeStyles } from '@material-ui/core'

import Chart from './LineChart.d3'
import ChartWrapper from '../ChartWrapper'

const useStyles = makeStyles({

})

const LineChart = ({ data, setSelected }) => {
	const classes = useStyles()

	return (
		<ChartWrapper Chart={Chart} initProps={{data, setSelected }} updateProps={[data]} margin={{ BOTTOM: 50, LEFT: 50 }} />
	)
}

export default LineChart