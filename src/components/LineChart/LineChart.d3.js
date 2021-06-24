import * as d3 from 'd3'
import Chart from '../../utils/Chart.d3'

class LineChart extends Chart {
  init({ data, setSelected }) {
    let vis = this
    vis.data = data
    vis.setSelected = setSelected

    vis.x = d3.scaleTime()
    vis.y = d3.scaleLinear()

    vis.xAxisGroup = vis.g.append('g')
    vis.yAxisGroup = vis.g.append('g')
  }

  update({ data }) {
    let vis = this
    vis.data = data || vis.data

    const flatData = vis.data.reduce((curr, acc) => [...curr, ...acc.vals], [])
    vis.x.domain(d3.extent(flatData, d => d.date)).range([0, vis.WIDTH])
    vis.y.domain(d3.extent(flatData, d => d.price)).range([vis.HEIGHT, 0])

    const xAxisCall = d3.axisBottom(vis.x).ticks(3)
    const yAxisCall = d3.axisLeft(vis.y).ticks(3)

    vis.xAxisGroup.attr('transform', `translate(0, ${vis.HEIGHT})`).transition(1000).call(xAxisCall)
    vis.yAxisGroup.transition(1000).call(yAxisCall)

    var line = d3
      .line()
      .curve(d3.curveBasis)
      .x(d => vis.x(d.date))
      .y(d => vis.y(d.price))

    vis.lines = vis.g
      .selectAll('.line')
      .data(vis.data)
      .join(
        enter =>
          enter
            .append('path')
            .attr('class', 'line')
            .attr('fill', 'none')
            .attr('stroke-width', '1px')
            .attr('stroke', '#3f51b5')
            .attr('d', d => line(d.vals))
            .on('mouseover', (e, d) => vis.setSelected(d)),
        update => update.attr('d', d => line(d.vals)),
        exit => exit.remove()
      )
  }
}

export default LineChart
