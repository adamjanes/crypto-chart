import * as d3 from "d3"

class Chart {
  constructor(element, initProps) {
    let vis = this
		console.log(initProps)
		vis.initProps = initProps

    vis.svg = d3
      .select(element)
      .append("svg")
      .attr("width", 0)
      .attr("height", 0)
    vis.g = vis.svg.append("g")
  }

  setDimensions(width, height, margin) {
    let vis = this

    const { TOP = 10, BOTTOM = 10, LEFT = 10, RIGHT = 10 } = margin

    vis.MARGIN = { TOP, BOTTOM, LEFT, RIGHT }
    vis.WIDTH = width - vis.MARGIN.LEFT - vis.MARGIN.RIGHT
    vis.HEIGHT = height - vis.MARGIN.TOP - vis.MARGIN.BOTTOM

    vis.svg
      .attr("width", vis.WIDTH + vis.MARGIN.LEFT + vis.MARGIN.RIGHT)
      .attr("height", vis.HEIGHT + vis.MARGIN.TOP + vis.MARGIN.BOTTOM)

    vis.g.attr("transform", `translate(${vis.MARGIN.LEFT}, ${vis.MARGIN.TOP})`)

    vis.init(vis.initProps)
  }
}

export default Chart
