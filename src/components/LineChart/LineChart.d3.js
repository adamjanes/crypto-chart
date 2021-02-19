import * as d3 from "d3"
import Chart from "../Chart.d3"

class LineChart extends Chart {
  init({ data, setSelected }) {
    let vis = this
    vis.data = data
    console.log(setSelected)
    vis.setSelected = setSelected

    vis.x = d3.scaleTime().range([0, vis.WIDTH])

    vis.y = d3.scaleLinear().range([vis.HEIGHT, 0])

    vis.xAxisGroup = vis.g
      .append("g")
      .attr("transform", `translate(0, ${vis.HEIGHT})`)
    vis.yAxisGroup = vis.g.append("g")
  }

  update(data) {
    let vis = this
    vis.data = data || vis.data
    
    const flatData = vis.data.reduce((curr, acc) => [...curr, ...acc.vals], [])
    vis.x.domain(d3.extent(flatData, d => d.date))
    vis.y.domain(d3.extent(flatData, d => d.price))

    const xAxisCall = d3.axisBottom(vis.x).ticks(3)
    const yAxisCall = d3.axisLeft(vis.y).ticks(3)

    vis.xAxisGroup.transition(1000).call(xAxisCall)
    vis.yAxisGroup.transition(1000).call(yAxisCall)

    var line = d3
      .line()
      .curve(d3.curveBasis)
      .x(function (d) {
        return vis.x(d.date)
      })
      .y(function (d) {
        return vis.y(d.price)
      })

    vis.lines = vis.g
      .selectAll(".line")
      .data(vis.data)
      .join(
        (enter) =>
          enter
            .append("path")
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke-width", "1px")
            .attr("stroke", "#3f51b5")
            .attr("d", (d) => line(d.vals))
        .on("mouseover", (e, d) => vis.setSelected(d)),
        (exit) => exit.remove()
      )

    // vis.linePath = vis.g
    //   .append("path")
    //   .attr("class", "line")
    //   .attr("fill", "none")
    //   .attr("stroke-width", "3px")

    // vis.g
    //   .select(".line")
    //   .attr("stroke", "blue")
    //   .transition(vis.t)
    //   .attr("d", line(vis.transformedData[0].vals))
  }
}

export default LineChart
