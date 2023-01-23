let salesData = [
	{year: "2010", quantity: 300},
	{year: "2011", quantity: 745},
	{year: "2012", quantity: 987},
	{year: "2013", quantity: 1297},
	{year: "2014", quantity: 580},
	{year: "2015", quantity: 1470},
	{year: "2016", quantity: 2390},
	{year: "2017", quantity: 3786},
	{year: "2018", quantity: 2860},
	{year: "2019", quantity: 3244},
	{year: "2020", quantity: 3566},
	{year: "2021", quantity: 4573},
	{year: "2022", quantity: 5006}
];

let svg = d3.select("#svg");
let padding = {top: 40,right: 30,bottom: 70,left: 90};

let colors = d3.schemePaired;

let barChartArea = {
	"width":parseInt(svg.style("width")) - padding.left - padding.right,
	"height":parseInt(svg.style("height")) - padding.top - padding.bottom
};

let yScale = d3.scaleLinear()
		.domain([0,d3.max(salesData,function(d,i){return d.quantity})])
		.range([barChartArea.height,0]).nice();
		
let xScale = d3.scaleBand()
		.domain(salesData.map(function(d) {return d.year})) //all years from 2010 to 2022 
		.range([0, barChartArea.width]) //width is the area where we draw the bar chart
		.padding(0.3); //scale padding goes from 0 to 1
		
let xAxis = svg.append("g") //g is group element
		.classed("xAxis", true)
		.attr("transform", 'translate('+ padding.left + ',' + (barChartArea.height+padding.top) +')')
		.call(d3.axisBottom(xScale));
		
let yAxisFunction = d3.axisLeft(yScale);

let yAxis = svg.append("g")
		.classed("yAxis", true)
		.attr("transform", "translate(" + padding.left + "," + padding.top + ")");
		yAxisFunction(yAxis);
		
let grid = svg.append("g")
		.attr("class", "grid")
		.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
		.call(d3.axisLeft(yScale)
		.tickSize((-barChartArea.width))
		.tickFormat("")
		);
		
let barGroup = svg.append("g")
		.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
		.attr("preserveAspectRatio", "xMinYMin meet");
		
barGroup.selectAll("rect").data(salesData).enter()
		.append("rect")
		.attr("width", xScale.bandwidth())
		.attr("height", function(d,i) {
			return barChartArea.height - yScale(d.quantity);
		})
		.attr("x", function(d,i) {
			return xScale(d.year);
		})
		.attr("y", function(d,i) {
				return yScale(d.quantity);
		})
		.attr("fill", function(d,i) {
			return colors[i];
		})
		.style("box-shadow", "2px 2px 5px rgba(0,0,0,0.6)");
		
		
barGroup.append("text")         
    .style("fill", "whitesmoke")
	.style("text-shadow", "2px 2px 5px rgba(0,0,0,0.6)")
	.style("font-size", 25)
	.style("background-color", "white")
	.attr("x", 182)           
    .attr("y", 50)           
    .attr("dy", ".35em")           // set offset y position
    .attr("text-anchor", "middle")	// set anchor y justification
    .text("Review of 'iBORN' products");          
	
barGroup.append("text")         
    .style("fill", "whitesmoke")
	.style("text-shadow", "2px 2px 5px rgba(0,0,0,0.6)") 
	.style("font-size", 25)	
	.attr("x", 162)           // set x position of left side of text
    .attr("y", 75)           // set y position of bottom of text
    .attr("dy", ".35em")           
    .attr("text-anchor", "middle")	
    .text(" sold in the last 12 years");  

	
barGroup.append("text")
	.style("fill", "whitesmoke")
	.style("text-shadow", "2px 2px 5px rgba(0,0,0,0.6)")
	.style("font-size", 25)
	.attr("transform", "rotate(-90)")
    .attr("x", -220)
    .attr("y", -55)
    .style("text-anchor", "middle")
    .text("Amount");
   
barGroup.append("text")
    .style("fill", "whitesmoke")
	.style("text-shadow", "2px 2px 5px rgba(0,0,0,0.6)")
	.style("font-size", 25)
    .attr("transform", "translate(" + 320 + " ," + 540 + ")")
    .style("text-anchor", "middle")
    .text("Year");
	
barGroup.selectAll("text.analysis-result-label")
    .data(salesData)
    .enter()
    .append("text")
    .text(function(d) { return d.quantity; })
	.attr("x", (d, i) => {
		return i * 51 + xScale.bandwidth() - 1})
	.attr("y", function(d){
		return yScale(d.quantity) - 20;})
    .attr("font-family" , "sans-serif")
    .attr("font-size" , "11px")
    .attr("fill" , "white")
    .attr("text-anchor", "middle")
	.style("opacity", function() {
          if(barChartArea.width >= 600) {
			  return 1;
		  } else {
			  return 0;
			}
		}
	);
	
 