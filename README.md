### Crypto Chart Demo

This app demonstrates a nifty way to structure React applications working together with D3 code. 

For each D3 chart that we want to add to an application, we should create a new folder in the components directory (similar to /LineChart/). This folder should have an `index.js` file, and a D3 file. The `index.js` file looks like this:

```jsx
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
```

We are including the LineChart.d3 file, which exports an ES6 class with an `init()` and `update()` method. We're also including a ChartWrapper component, which abstracts away a lot of the logic that we'll need to write every time when writing a D3 file with React. We're also defining props to pass in to our chart when our chart firt initializes, and when it needs to update. We need to *memoize* these props, since otherwise, our ChartWrapper will be re-rendered every time something changes in the component above it (even if `data` and `setSelected` stay the same). This is because the freshly created object that we're passing to initProps/updateProps is treated as a changed prop, even though functionally the object is identical.
