const svg = d3.select('svg')

const width = svg.attr('width')
const height = svg.attr('height')
const margin = {left: 60, right: 30, top: 30, bottom: 30}

const display = (data) => {
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Venezuela)])
    .range([0, innerWidth])

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.Year))
    .range([0, innerHeight])
    .padding(0.1)

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  
  g.append('g').call(d3.axisLeft(yScale))

  g.append('g').call(d3.axisBottom(xScale))
    .attr('transform', `translate(0, ${innerHeight})`)

  g.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('y', d => yScale(d.Year))
  .attr('width', d => xScale(d.Venezuela))
  .attr('height', yScale.bandwidth())
}

d3.csv('data.csv').then(data => {
  data.forEach(d=>{
    d.Venezuela = +d.Venezuela
    d.World = +d.World
  })
  display(data)
})
