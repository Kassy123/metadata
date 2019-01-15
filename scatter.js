//bewegliches 3D-Koordinatensystem
function scatterPlot3d( parent, kameraMake, kameraModel, erstellungsdatum, aenderungsdatum, brennweite, belichtungszeit,blende, iso, blitz, programm  ){
		var testiso = [1,2,3,4];


		
     //console.log(data.kameraMake + "kameramake");
//	var testkamera = [Panasonic, Huawei, Sony, Sony, Huawei, Kodak];
	var testbrennweite = [5,5,3,3,5,1];
	var testbelichtung = [4,3,2,5,4,5];
	//console.log(parent);
  var x3d = parent  
    .append("x3d")
      .style( "width", parseInt(parent.style("width"))+"px" )
      .style( "height", parseInt(parent.style("height"))+"px" )
      .style( "border", "none" )
      
  var scene = x3d.append("scene")

  scene.append("orthoviewpoint")
   //  .attr( "centerOfRotation", [10, 5, 5])
	 .attr( "fieldOfView", [-15, -7, 15, 15]) //größe der Anzeige (Zoom)
     .attr( "orientation", [-0.5, 1, 0.2, 1.12*Math.PI/4]) //Orientierung der Anzeige (von vorne oben)
     .attr( "position", [20, 4, 15]) //position im Raum

  var rows = initializeDataGrid();
  var axisRange = [0, 10]; //länge einer achse
  var scales = [];
  var initialDuration = 0;
  var defaultDuration = 800;
  var ease = 'linear';
  var time = 0;
  var axisKeys = ["ISO", "Brennweite", "Belichtung"]

  // Helper functions for initializeAxis() and drawAxis()
  function axisName( name, axisIndex ) {
	return ['ISO','Brennweite','Belichtung'][axisIndex] + name;
  }

  function constVecWithAxisValue( otherValue, axisValue, axisIndex ) {
    var result = [otherValue, otherValue, otherValue];
    result[axisIndex] = axisValue;
    return result;
  }

  // Used to make 2d elements visible
  function makeSolid(selection, color) {
    selection.append("appearance")
      .append("material")
         .attr("diffuseColor", color||"black")
    return selection;
  }

  // Initialize the axes lines and labels.
  function initializePlot() {
    initializeAxis(0);
    initializeAxis(1);
    initializeAxis(2);
  }

  function initializeAxis( axisIndex )
  {
	var key = axisKeys[axisIndex];
	if(axisIndex==0){
		drawAxis1( axisIndex, key, initialDuration );
	}
	else if(axisIndex ==1){
		drawAxis2( axisIndex, key, initialDuration );
	}
	else if(axisIndex ==2){
		drawAxis3( axisIndex, key, initialDuration );
	}

    var scaleMin = axisRange[0];
    var scaleMax = axisRange[1];

    // the axis line
    var newAxisLine = scene.append("transform")
         .attr("class", axisName("Axis", axisIndex))
         .attr("rotation", ([[1,1,0,0],[0,0,1,Math.PI/2],[0,1,0,-Math.PI/2]][axisIndex])) //Koord.sys. drehen
      	 .append("shape") //achsenanzeige
    newAxisLine
      .append("appearance")
      .append("material")
        .attr("emissiveColor", "lightgray")
    newAxisLine
      .append("polyline2d") //y-achsenlinie
         // Line drawn along y axis does not render in Firefox, so draw one
         // along the x axis instead and rotate it (above).
        .attr("lineSegments", "0 0," + scaleMax + " 0")

   // axis labels
   var newAxisLabel = scene.append("transform")
       .attr("class", axisName("AxisLabel", axisIndex))
       .attr("translation", constVecWithAxisValue( 0, scaleMin + 1.1 * (scaleMax-scaleMin), axisIndex ))

   var newAxisLabelShape = newAxisLabel
     .append("billboard")
     .attr("axisOfRotation", "0 0 0") // face viewer
     .append("shape")
     .call(makeSolid)

   var labelFontSize = 0.6;

   newAxisLabelShape
     .append("text")
       .attr("class", axisName("AxisLabelText", axisIndex))
       .attr("solid", "true")
       .attr("string", key)
    .append("fontstyle")
       .attr("size", labelFontSize)
       .attr("family", "SANS")
       .attr("justify", "END MIDDLE" )
  }

    // Assign key to axis, creating or updating its ticks, grid lines, and labels.
	function drawAxis1( axisIndex, key, duration ) {
	/*
var scale = d3.scale.ordinal()
	.domain(1,4,6,8,0,4,1,1,8,6)
	.rangePoints(axisRange);


	scales[axisIndex] = d3.scene.axisIndex()
		.scale(scale)
		.tickValues(scale.domain().filter(function(d,i){return !(i%2);}));

	*/


		var scale = d3.scale.linear()
		.domain( [1,10] ) // demo data range
		.range( axisRange )
	//console.log(scale);
	scales[axisIndex] = scale;

		var numTicks = 10;
		var tickSize = 0.1;
		var tickFontSize = 0.5;
	/*
		var ticks = scale.domain().filter(function(d,i){ return !(i%10); } );
		var axis = scene.axis().scale(scale2).tickValues( scale.domain().filter(function(d,i){ return !(i%10); } ); );
	
		var rangeBand = scale2.rangeBand();

		var ticks2 = scale2.range().map(function(r){
			return r + (rangeBand / 2);
		})*/

		
		// ticks along each axis
		var ticks = scene.selectAll( "."+axisName("Tick", axisIndex) )
		   .data( scale.ticks( numTicks ));
		var newTicks = ticks.enter()
		  .append("transform")
			.attr("class", axisName("Tick", axisIndex));
		newTicks.append("shape").call(makeSolid)
		  .append("box")
			.attr("size", tickSize + " " + tickSize + " " + tickSize);
		// enter + update
		ticks.transition().duration(duration)
		  .attr("translation", function(tick) { 
			 return constVecWithAxisValue( 0, scale(tick), axisIndex ); })
		ticks.exit().remove();
	
		// tick labels
		var tickLabels = ticks.selectAll("billboard shape text")
			.data(function(d) { return [d]; });
		var newTickLabels = tickLabels.enter()
		  .append("billboard")
			 .attr("axisOfRotation", "0 0 0")     
		  .append("shape")
		  .call(makeSolid)
		newTickLabels.append("text")
		  .attr("string", scale.tickFormat(10))
		  .attr("solid", "true")
		  .append("fontstyle")
			.attr("size", tickFontSize)
			.attr("family", "SANS")
			.attr("justify", "END MIDDLE" );
		tickLabels // enter + update
		  .attr("string", scale.tickFormat(10))
		tickLabels.exit().remove();

		// base grid lines
	//	if (axisIndex==0 || axisIndex==2) {
	
		  var gridLines = scene.selectAll( "."+axisName("GridLine", axisIndex))
			 .data(scale.ticks( numTicks ));
		  gridLines.exit().remove();

		  var gridLines2 = scene.selectAll( "."+axisName("GridLine", axisIndex))
			 .data(scale.ticks( numTicks ));
		  gridLines2.exit().remove();
		  
		/*  var newGridLines = gridLines.enter()
			.append("transform")
			  .attr("class", axisName("GridLine", axisIndex))
	        //  .attr("rotation", axisIndex==0 ? [10,10,10, -Math.PI/2] : [1,1,1,1])
			  .append("shape")
*/
			var newGridLines2 = gridLines2.enter()
			.append("transform")
			  .attr("class", axisName("GridLine", axisIndex))
    	      .attr("rotation", axisIndex==0 ? [1,10,1, -Math.PI/2] : [2.1,2.1,2.1,2.1])
			  .append("shape")
	
	/*	  newGridLines.append("appearance")
			.append("material")
			  .attr("emissiveColor", "gray")
		  newGridLines.append("polyline2d");*/

		  newGridLines2.append("appearance")
		  .append("material")
			.attr("emissiveColor", "gray")
		newGridLines2.append("polyline2d");
	
	/*	  gridLines.selectAll("shape polyline2d").transition().duration(duration)
			.attr("lineSegments", "0 0 " + axisRange[1] + " 0")
*/
			gridLines2.selectAll("shape polyline2d").transition().duration(duration)
			.attr("lineSegments", "0 0 " + axisRange[1] + " 0")
	
/*		  gridLines.transition().duration(duration)
			 .attr("translation", axisIndex==1
				? function(d) { return scale(d) + " 0 0"; }
				: function(d) { return "0 0 " + scale(d); }
			  )
*/
			  gridLines2.transition().duration(duration)
			 .attr("translation", axisIndex==0
				? function(d) { return scale(d) + " 0 0"; }
				: function(d) { return "0 0 " + scale(d); }
			  )

			  
	//	}
	 
	  }
/*
  // Assign key to axis, creating or updating its ticks, grid lines, and labels.
  function drawAxis1( axisIndex, key, duration ) {
	var isowert = [25,50,100,200,400,800,1600];
    var scale = d3.scale.ordinal()
      .domain( isowert ) // demo data range
      .range( axisRange )
    
    scales[axisIndex] = scale;
console.log(scale[0] + "scale");

var xAxis = d3.svg.axis()
	.scale(scale)
	.tickValues(scale.domain().filter(function(d,i){return !(i % 2); }))
	.orient("bottom");

	var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
    .attr("class", "x axis")
    .call(xAxis);

    var numTicks = 8;
    var tickSize = 0.1; //schwarze quadrate bei Beschriftung
    var tickFontSize = 0.5;

    // ticks along each axis
    var ticks = scene.selectAll( "."+axisName("Tick", axisIndex) )
       .data( scale.ticks( numTicks ));
    var newTicks = ticks.enter()
      .append("transform")
        .attr("class", axisName("Tick", axisIndex));
    newTicks.append("shape").call(makeSolid)
      .append("box")
        .attr("size", tickSize + " " + tickSize + " " + tickSize);
    // enter + update
    ticks.transition().duration(duration)
      .attr("translation", function(tick) { 
         return constVecWithAxisValue( 0, scale(tick), axisIndex ); })
    ticks.exit().remove();

    // tick labels
    var tickLabels = ticks.selectAll("billboard shape text")
      .data(function(d) { return [d]; });
    var newTickLabels = tickLabels.enter()
      .append("billboard")
         .attr("axisOfRotation", "0 0 0")     
      .append("shape")
      .call(makeSolid)
    newTickLabels.append("text")
      .attr("string", scale.tickFormat(10))
      .attr("solid", "true")
      .append("fontstyle")
        .attr("size", tickFontSize)
        .attr("family", "SANS")
        .attr("justify", "END MIDDLE" );
    tickLabels // enter + update
      .attr("string", scale.tickFormat(10))
    tickLabels.exit().remove();

    // base grid lines
    if (axisIndex==0 || axisIndex==2) {

      var gridLines = scene.selectAll( "."+axisName("GridLine", axisIndex))
         .data(scale.ticks( numTicks ));
      gridLines.exit().remove();
      
      var newGridLines = gridLines.enter()
        .append("transform")
          .attr("class", axisName("GridLine", axisIndex))
          .attr("rotation", axisIndex==0 ? [0,1,0, -Math.PI/2] : [0,0,0,0])
        .append("shape")

      newGridLines.append("appearance")
        .append("material")
          .attr("emissiveColor", "gray")
      newGridLines.append("polyline2d");

      gridLines.selectAll("shape polyline2d").transition().duration(duration)
        .attr("lineSegments", "0 0, " + axisRange[1] + " 0")

      gridLines.transition().duration(duration)
         .attr("translation", axisIndex==0
            ? function(d) { return scale(d) + " 0 0"; }
            : function(d) { return "0 0 " + scale(d); }
          )
	} 

  }*/

    // Assign key to axis, creating or updating its ticks, grid lines, and labels.
	function drawAxis2( axisIndex, key, duration ) {
		var scale = d3.scale.linear()
		  .domain( [1,10] ) // demo data range
			.range( axisRange )
		
			
//		console.log(scale);
		scales[axisIndex] = scale;

		var numTicks = 8;
		var tickSize = 0.1;
		var tickFontSize = 0.5;
	
		// ticks along each axis
		var ticks = scene.selectAll( "."+axisName("Tick", axisIndex) )
		   .data( scale.ticks( numTicks ));
		var newTicks = ticks.enter()
		  .append("transform")
			.attr("class", axisName("Tick", axisIndex));
		newTicks.append("shape").call(makeSolid)
		  .append("box")
			.attr("size", tickSize + " " + tickSize + " " + tickSize);
		// enter + update
		ticks.transition().duration(duration)
		  .attr("translation", function(tick) { 
			 return constVecWithAxisValue( 0, scale(tick), axisIndex ); })
		ticks.exit().remove();
	
		// tick labels
		var tickLabels = ticks.selectAll("billboard shape text")
		  .data(function(d) { return [d]; });
		var newTickLabels = tickLabels.enter()
		  .append("billboard")
			 .attr("axisOfRotation", "0 0 0")     
		  .append("shape")
		  .call(makeSolid)
		newTickLabels.append("text")
		  .attr("string", scale.tickFormat(10))
		  .attr("solid", "true")
		  .append("fontstyle")
			.attr("size", tickFontSize)
			.attr("family", "SANS")
			.attr("justify", "END MIDDLE" );
		tickLabels // enter + update
		  .attr("string", scale.tickFormat(10))
		tickLabels.exit().remove();
	
		// base grid lines
		//if (axisIndex==0 || axisIndex==2) {
	
			  var gridLines = scene.selectAll( "."+axisName("GridLine", axisIndex))
			  .data(scale.ticks( numTicks ));
		   gridLines.exit().remove();
 
		   var gridLines2 = scene.selectAll( "."+axisName("GridLine", axisIndex))
			  .data(scale.ticks( numTicks ));
		   gridLines2.exit().remove();
		   
		   var newGridLines = gridLines.enter()
			 .append("transform")
			   .attr("class", axisName("GridLine", axisIndex))
			   .attr("rotation", axisIndex==1 ? [10,10,10,-Math.PI/2] : [1,1,1,1])
			   .append("shape")
 
			 var newGridLines2 = gridLines2.enter()
			 .append("transform")
			   .attr("class", axisName("GridLine", axisIndex))
			   .attr("rotation", axisIndex==0 ? [1,1,1, -Math.PI/2] : [2.1,2.1,2.1,2.1])
			   .append("shape")
	 
		   newGridLines.append("appearance")
			 .append("material")
			   .attr("emissiveColor", "gray")
		   newGridLines.append("polyline2d");
 
		   newGridLines2.append("appearance")
		   .append("material")
			 .attr("emissiveColor", "gray")
		 newGridLines2.append("polyline2d");
	 
		   gridLines.selectAll("shape polyline2d").transition().duration(duration)
			 .attr("lineSegments", "0 0" + axisRange[1] + " 0")
 
			 gridLines2.selectAll("shape polyline2d").transition().duration(duration)
			 .attr("lineSegments", "0 0 " + axisRange[1] + " 0")
	 
		   gridLines.transition().duration(duration)
			  .attr("translation", axisIndex==1
				 ? function(d) { return scale(d) + "0 0"; }
				 : function(d) { return "0 0 " + scale(d); }
			   )
 
			   gridLines2.transition().duration(duration)
			  .attr("translation", axisIndex==1
				 ? function(d) { return scale(d) + " 0 0 "; }
				 : function(d) { return "0 1 " + scale(d); }
			   )
 


	//	}
	 
	  }
	  function drawAxis3( axisIndex, key, duration ) {

		var scale = d3.scale.linear()
		  .domain( [-5,5] ) // demo data range
		  .range( axisRange )
		
		scales[axisIndex] = scale;
	
		var numTicks = 8;
		var tickSize = 0.1;
		var tickFontSize = 0.5;
	
		// ticks along each axis
		var ticks = scene.selectAll( "."+axisName("Tick", axisIndex) )
		   .data( scale.ticks( numTicks ));
		var newTicks = ticks.enter()
		  .append("transform")
			.attr("class", axisName("Tick", axisIndex));
		newTicks.append("shape").call(makeSolid)
		  .append("box")
			.attr("size", tickSize + " " + tickSize + " " + tickSize);
		// enter + update
		ticks.transition().duration(duration)
		  .attr("translation", function(tick) { 
			 return constVecWithAxisValue( 0, scale(tick), axisIndex ); })
		ticks.exit().remove();
	
		// tick labels
		var tickLabels = ticks.selectAll("billboard shape text")
		  .data(function(d) { return [d]; });
		var newTickLabels = tickLabels.enter()
		  .append("billboard")
			 .attr("axisOfRotation", "0 0 0")     
		  .append("shape")
		  .call(makeSolid)
		newTickLabels.append("text")
		  .attr("string", scale.tickFormat(10))
		  .attr("solid", "true")
		  .append("fontstyle")
			.attr("size", tickFontSize)
			.attr("family", "SANS")
			.attr("justify", "END MIDDLE" );
		tickLabels // enter + update
		  .attr("string", scale.tickFormat(10))
		tickLabels.exit().remove();
	
		// base grid lines
		//if (axisIndex==0 || axisIndex==2) {
	
			var gridLines = scene.selectAll( "."+axisName("GridLine", axisIndex))
			.data(scale.ticks( numTicks ));
		 gridLines.exit().remove();

		 var gridLines2 = scene.selectAll( "."+axisName("GridLine", axisIndex))
			.data(scale.ticks( numTicks ));
		 gridLines2.exit().remove();
		 
		 var newGridLines = gridLines.enter()
		   .append("transform")
			 .attr("class", axisName("GridLine", axisIndex))
			 .attr("rotation", axisIndex==0 ? [1,1,1, -Math.PI/2] : [2.1,2.1,2.1,2.1])
			 .append("shape")

		   var newGridLines2 = gridLines2.enter()
		   .append("transform")
			 .attr("class", axisName("GridLine", axisIndex))
			 .attr("rotation", axisIndex==0 ? [0,1, -Math.PI/2, 0] : [0,0,0,0])
			 .append("shape")
   
		 newGridLines.append("appearance")
		   .append("material")
			 .attr("emissiveColor", "gray")
		 newGridLines.append("polyline2d");

		 newGridLines2.append("appearance")
		 .append("material")
		   .attr("emissiveColor", "gray")
	   newGridLines2.append("polyline2d");
   
		 gridLines.selectAll("shape polyline2d").transition().duration(duration)
		   .attr("lineSegments", "0 0, " + axisRange[1] + " 0")

		   gridLines2.selectAll("shape polyline2d").transition().duration(duration)
		   .attr("lineSegments", "0 0, " + axisRange[1] + " 0")
   
		 gridLines.transition().duration(duration)
			.attr("translation", axisIndex==0
			   ? function(d) { return scale(d) + " 0 0"; }
			   : function(d) { return "0 0 " + scale(d); }
			 )

			 gridLines2.transition().duration(duration)
			.attr("translation", axisIndex==0
			   ? function(d) { return scale(d) + " 0 0"; }
			   : function(d) { return "0 0 " + scale(d); }
			 )

		 
	  }

  // Update the data points (spheres) and stems.
  function plotData( duration ) {
    
    if (!rows) {
     console.log("no rows to plot.")
     return;
    }

    var x = scales[0], y = scales[1], z = scales[2];
    var sphereRadius = 0.2;

    // Draw a sphere at each x,y,z coordinate.
    var datapoints = scene.selectAll(".datapoint").data( rows );
    datapoints.exit().remove()

    var newDatapoints = datapoints.enter()
      .append("transform")
        .attr("class", "datapoint")
        .attr("scale", [sphereRadius, sphereRadius, sphereRadius])
				.attr("translation", function(d){return [testiso[d.x], testbrennweite[d.x], testbelichtung[d.x]]})
			.append("shape");
    newDatapoints
      .append("appearance")
      .append("material");
    newDatapoints
			.append("sphere");
       // Does not work on Chrome; use transform instead
       //.attr("radius", sphereRadius)

    datapoints.selectAll("shape appearance material")
        .attr("diffuseColor", 'steelblue' )
		/*
		for(var i = 0; i< testiso.length; i++){
            
            datapoints.transition().ease(ease).duration(duration)
            .attr("translation", function(row) {
              var output;
							console.log("iso ist " + testiso[i]);
							output = 3 + " " + testbrennweite[0] + " " + 2 ;
							return(output);
						});
		}*/
					
 
  }
	
  function initializeDataGrid() {
    var rows = [];
    // Follow the convention where y(x,z) is elevation.
    for (var x=0; x<=7; x+=1) {
      for (var z=0; z<=7; z+=1) {
		rows.push({x: x, y: 0, z: z});
	//	console.log(rows + " rows");
     }
	}
	for (var x=0; x<=7; x+=1) {
		for (var y=0; y<=7; y+=1) {
	rows.push({x: x, y: y, z: 0});
	//console.log(rows + " rows");
	 }
}
for (var y=0; y<=7; y+=1) {
	for (var z=0; z<=7; z+=1) {
rows.push({x: 0, y: y, z: z});
//console.log(rows + " rows");
 }
}
	
    return rows;
  }
 
  
  
plotData(2);
  initializeDataGrid();
  initializePlot();
 // setInterval( updateData, defaultDuration );
 

}
