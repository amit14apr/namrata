
window.onload = function(){
	var svgCanvas = d3.select("svg")
        .attr("width", 1250) 
        .attr("height", 700) 
        .style("border", "1px solid black")
        .attr("class", "svgCanvas");
             
          
	
	d3.json("data.json").then(function(d){			
		svgCanvas.selectAll("line") 
			.data(d.links)
			.enter()
			.append("line")
				.attr("x1", function(link){
					var x1 = null
					d.nodes.forEach(function(node){
						if(link.node01 == node.id)
							{x1 = node.x}
					});
					return x1
				})
				.attr("y1", function(link){
					var y1 = null
					d.nodes.forEach(function(node){
						if(link.node01 == node.id)
							{y1 = node.y}
					});
					return y1
				})
				.attr("x2", function(link){
					var x2 = null
					d.nodes.forEach(function(node){
						if(link.node02 == node.id)
							{x2 = node.x}
					});
					return x2
				})
				.attr("y2", function(link){
					var y2 = null
					d.nodes.forEach(function(node){
						if(link.node02 == node.id)
							{y2 = node.y}
					});
					return y2
				})
				.attr("stroke-width", function(link){
					var width = null
					d.nodes.forEach(function(node){
						if(link.node01 == node.id)
							width = link.amount/60
					});
					return width
				})
      			.attr("stroke", "#222831");

      			
      });
     
      d3.json("data.json").then(function(d){
      var amount = 0
      var count_trades = 0
      var tooltip = d3.select("body")
    				.append("div")
    				.style("position", "absolute")
    				.style("z-index", "10")
   					.style("visibility", "hidden");
		svgCanvas.selectAll("circle") 
			.data(d.nodes)
			.enter()
			.append("circle")
				.attr("cx", function(d){return d.x})
				.attr("cy", function(d){return d.y})
				.attr("r", function(node){
					sumTrade = 0;
					d.links.forEach(function(link){	
					if(link.node01 == node.id || link.node02 == node.id)
					{
						sumTrade = sumTrade + link.amount;
					}
					});
					return (sumTrade/30)
				})
				.attr("fill", "#d65a31")

				.on('mouseover', function(node, i) {
					d3.select(this).style("fill", "#d65a31");
					var count = 0
					var total_trades = 0
					amount = 0
					count_trades = 0
					var id = node.id
					console.log("click",id)
 					 svgCanvas.selectAll("circle").style("opacity", function(d){
 					 	return d.id == id? 1:0.5
 					 });
 					 svgCanvas.selectAll("line").style("opacity",0)
 					 d.links.forEach(function(node1){
 					 	if(node1.node01 == id || node1.node02 == id){
 					 		count += 1
 					 		count_trades = count
 					 		total_trades += node1.amount
 					 		amount = total_trades
 					 	}
 					 	svgCanvas.selectAll("line").style("opacity",function(link){
 					 		return (link.node01 == id || link.node02 == id) ? 1 : 0
 					 	})
 					 })
 					return tooltip.style("visibility", "visible");
				})
				.on('mouseout',function(d, i) {
					 d3.select(this).style("fill", "#d65a31");
 					 svgCanvas.selectAll("circle").style("opacity", 1);
 					 svgCanvas.selectAll("line").style("opacity", 1);
 					 return tooltip.style("visibility", "hidden");
				})
				.on("mousemove", function(){return tooltip.style("top",(d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").text("Trade = "+amount+", Connections = " + count_trades);})
			});




      d3.json("data.json").then(function(d){
      	svgCanvas.selectAll("text")
      		.data(d.nodes)
      		.enter()
      		.append("text")
      			.attr("x", function(d){return (d.x-15)})
      			.attr("y", function(d){return d.y})
        		.text(function(d){return d.id})
        		.attr("font-family", "sans-serif")
   				.attr("font-size", "11px")
   				.attr("fill", "#222831");

      });

}





