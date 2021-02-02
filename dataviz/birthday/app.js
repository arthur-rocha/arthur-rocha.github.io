// remove preloader
window.addEventListener("load", () => {
  const preload = document.querySelector(".preload");
  preload.classList.add("preload-finish");
});

// simulation plot
var maxWidth = d3.select(".sticky").node().offsetWidth;
var maxHeight = .44681 * maxWidth;
var maxMargin = 0.0638 * maxWidth;
var nSimulated = 41;
var hoverable = false;
var margin = {top: maxMargin, right: maxMargin, bottom: maxMargin, left: maxMargin},
  width = maxWidth - margin.left - margin.right,
  height = maxHeight - margin.top - margin.bottom;


// append the svg object to the body of the page
var simulationSVG = d3.select("#simulationPlot")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Labels of row and columns
var x_axis = Array(20).fill().map((element, index) => index + 1)
var y_axis = Array(5).fill().map((element, index) => index + 1)

// Build X scales and axis:
var x = d3.scaleBand()
  .range([ 0, width ])
  .domain(x_axis)
  .padding(0.1);


// Build Y scales and axis:
var y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(y_axis)
  .padding(0.07);

function generateData(x_limit, y_limit){
  const data = [];
  for (let x = 0; x < x_limit; x++) {
    for (let y = 0; y < y_limit; y++) {
      const element = {x_axis:x+1, y_axis:y+1};
      data.push(element);
    }   
  }
  return data;
}

//generate "fake" data for the first plot
var testData = generateData(20,5);

simulationSVG
.selectAll(".rooms")
.data(testData, function(d) {return d.x_axis+':'+d.y_axis;})
.enter()
.append('text')
.attr("x", function(d) { return x(d.x_axis) })
.attr("y", function(d) { return y(d.y_axis) })
.attr('font-family', 'FontAwesome')
.attr('font-size', "16px" )
.text(function(d) { return '\uf0c0' })
.style("fill","#b8b8b8")
.style("opacity", .3)
.attr("class", "rooms"); 

//Scrollama ()
var main = d3.select("main");
var scrolly = main.select("#scrolly-waffle");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.75);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight / 2;
  var figureMarginTop = (window.innerHeight - figureHeight) / 2;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function(d, i) {
    return i === response.index;
  });

  // update graphic based on step
  //figure.select("p").text(response.index + 1);
  updatePlot(response.index, nSimulated);

}


function init() {
  //setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  //handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrolly-waffle article .step",
      offset: 1,
      debug: false
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  //window.addEventListener("resize", handleResize);
}

// kick things off
init();

function updatePlot(index, n){
  if (index == 0) {
    simulationSVG
    .selectAll(".rooms")
    .data(testData)
    .transition() // Transition 1
    .duration(500)
    .style("fill","#b8b8b8")
    .style("opacity",1);

  } else {
    simulationSVG
    .selectAll(".rooms")
    .data(testData.slice(0, n))
    .transition() // Transition 1
    .duration(500)
    .delay(function(d, i) { return i * 20; })
    .style("fill","#ff816a");
  }
};


// Simulation process

Object.defineProperties(Array.prototype, {
  count: {
      value: function(value) {
          return this.filter(x => x==value).length;
      }
  }
});

function simulate(){
  function randomPerson(){return Math.round(Math.random() *(365 -1) + 1)};
  function simulateRoom(){
    var match = 0;
    const room = [];
    for (let i = 0; i < 20; i++) {
      room.push(randomPerson());
    };

    for (let day = 1; day < 365; day++) {
      const dayCount = room.count(day);
      if (dayCount > 1) {
        match = 1;
        break;
      };

    }
    return match;    
  };

  const matches = [];
  for (let rooms = 0; rooms < 100; rooms++) {
    matches.push(simulateRoom());
  }

  return matches.count(1);
};

function rerun(){
  updatePlot(0, nSimulated);
  nSimulated = simulate();
  updatePlot(1, nSimulated);
  d3.select("#nMatches").
  text(""+nSimulated);
  d3.select("#pctMatches").
  text("("+nSimulated+"%)");
}



//curve plot
var hoveravle = false;

var curveSVG = d3.select("#curvePlot")
.append("svg")
  .attr("width", width + margin.left + margin.right -5)
  .attr("height", height + margin.top + margin.bottom + 50)
.append("g")
  .attr("transform",
        "translate(" + 40 + "," + 25 + ")");

// Add Y axis
    var y_curve = d3.scaleLinear()
      .domain([0, 100])
      .range([ height + 50, 0 ]);
    curveSVG.append("g")
      .call(d3.axisLeft(y_curve))
      .attr("class", "axis");
    
    curveSVG.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -30)
      .attr("x", -19)
      .text("Probability of at least 2 matches (%)")
      .attr("font-size",".7em");

// Add X axis
    var x_curve = d3.scaleLinear()
      .domain([1, 60])
      .range([ 0, width - 25]);
    curveSVG.append("g")
    .attr("transform", `translate(0,${height + 50})`)
    .call(d3.axisBottom(x_curve))
    .attr("class", "axis");

    curveSVG
    .append("text")
     .attr("text-anchor", "end")
     .attr("x", margin.left + 100)
     .attr("y", height + margin.top + 50) 
     .text("Room Size (# of people)")
     .attr("font-size",".7em");

function generateCurve(m){
  function findProbability(n){
    return (1 - Math.exp(-(n*(n-1)) / (2 * 365)))*100;
  };
  const data = [];
  for (let j = 1; j < m+1; j++) {
    const element = {n: j, prob: findProbability(j)};
    data.push(element);
  }
  return data;
};

//generate curve
var curveData = generateCurve(60);

//enter points
curveSVG
  .selectAll("curve-point")
  .data(curveData)
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x_curve(d.n); } )
  .attr("cy", function (d) { return y_curve(1); } )
  .attr("r", 1)
  .style("fill", "#a3a3a3")
  .attr("class", "curve-point")


function cleanCurve(){
  //clean guideLines
  curveSVG.
  selectAll(".guideLines")
  .remove()
  .exit();
  //clean guideText
  curveSVG.
  selectAll(".guideText")
  .remove()
  .exit();
  //opacity = 1
  curveSVG
  .selectAll(".axis")
  .attr("opacity", 1);
}

curveSVG
  .selectAll(".curve-point")
  .on("mouseover", function(d, i){
    if (hoverable) {
      curveSVG
      .selectAll(".curve-point")
      .style("fill", (d, j) => j+1 == i.n ? "#ff816a":"#b8b8b8")
      .transition("increase-points") // Transition 1
      .duration(100)
      .attr("r", (d, j) => j+1 == i.n ? 5:4)
      .style("cursor", "pointer")

      //opacity of axis

    curveSVG
    .selectAll(".axis")
    .attr("opacity", .1);

      //bottom line
      curveSVG
      .append("line")
      .attr("x1", x_curve(i.n)) 
      .attr("y1", y_curve(0))
      .attr("x2", x_curve(i.n))
      .attr("y2", y_curve(i.prob))
      .style("stroke-width", 1)
      .style("stroke", "#ff816a")
      .style("fill", "none")
      .style("stroke-dasharray", 5)
      .attr("class", "guideLines");

      //n text
      curveSVG
      .append("text")
       .attr("x", x_curve(i.n))
       .attr("y", y_curve(0)) 
       //.style("stroke", "#ff816a")
       //.style("stroke-width", 1)
       .style("font-size", "12px")
       .text(i.n + "")
       .attr("class", "guideText");

      //left line
      curveSVG
      .append("line")
      .attr("x1", x_curve(0)) 
      .attr("y1", y_curve(i.prob))
      .attr("x2", x_curve(i.n))
      .attr("y2", y_curve(i.prob))
      .style("stroke-width", 1)
      .style("stroke", "#ff816a")
      .style("fill", "none")
      .style("stroke-dasharray", 5)
      .attr("class", "guideLines");

      //n text
      curveSVG
      .append("text")
       .attr("x", x_curve(0))
       .attr("y", y_curve(i.prob)) 
       .text(Math.round(i.prob * 100) / 100 + "%")
       //.style("stroke", "#ff816a")
       //.style("stroke-width", 1)
       .style("font-size", "12px")
       .attr("class", "guideText");
    }
    })
  .on("mouseleave", function(event, d){
    if (hoverable) {
      cleanCurve();

      curveSVG
      .selectAll(".curve-point")
      .style("fill", "#ff816a")
      .transition("increase-points") // Transition 1
      .duration(100)
      .attr("r", 4)
      .style("cursor", "pointer");
    }
    }) ;


simulationSVG
.selectAll("text")
.on("mouseover", function(event, d){
  console.log("teste");
});

function initCurve(){
  curveSVG.
  selectAll(".guideLines")
  .remove()
  .exit();
  
  curveSVG
  .selectAll(".curve-point")
  .transition() // Transition 1
  .duration(500)
  .delay(function(d, i) { return i * 10; })
  .attr("cy", function (d) { return y_curve(d.prob)})
  .attr("r", 3.5)
  .style("fill", "#ff816a");
};


function highlightCurve(n){
  curveSVG
  .selectAll(".curve-point")
  .attr("cy", function (d) { return y_curve(d.prob)})
  .style("fill",  d => d.n == n ? "#ff816a":"#a3a3a3")
  .transition() // Transition 1
  .duration(500)
  .attr("r", d => d.n == n ? 8:1);

  curveSVG.
  selectAll(".guideLines")
  .remove()
  .exit();

  //bottom line
  curveSVG
  .append("line")
  .attr("x1", x_curve(n)) 
  .attr("y1", y_curve(0))
  .attr("x2", x_curve(n))
  .attr("y2", n == 23 ? y_curve(50):y_curve(90))
  .style("stroke-width", 1)
  .style("stroke", "#ff816a")
  .style("fill", "none")
  .style("stroke-dasharray", 5)
  .attr("class", "guideLines");

  //left line
  curveSVG
  .append("line")
  .attr("x1", x_curve(0)) 
  .attr("y1", n == 23 ? y_curve(50):y_curve(90))
  .attr("x2", x_curve(n))
  .attr("y2", n == 23 ? y_curve(50):y_curve(90))
  .style("stroke-width", 1)
  .style("stroke", "#ff816a")
  .style("fill", "none")
  .style("stroke-dasharray", 5)
  .attr("class", "guideLines");

};


//Scrollama 2 ()
var scrolly2 = main.select("#scrolly-curve");
var figure2 = scrolly2.select("figure");
var article2 = scrolly2.select("article");
var step2 = article2.selectAll(".step");

// initialize the scrollama
var scroller2 = scrollama();

// scrollama event handlers
function handleStepEnter2(response) {
  // response = { element, direction, index }

  // add color to current step only
  step.classed("is-active", function(d, i) {
    return i === response.index;
  });

  // update graphic based on step
  //figure.select("p").text(response.index + 1);
  updateCurve(response.index);

}


function init2() {

  scroller2
    .setup({
      step: "#scrolly-curve article .step",
      offset: .7,
      debug: false
    })
    .onStepEnter(handleStepEnter2);

}

// kick things off again
init2();

function updateCurve(index){
  switch (index) {
    case 0:
      initCurve();
      hoverable = false;
      break;
    case 1:
      highlightCurve(23);
      break;
    case 2:
      cleanCurve();
      highlightCurve(42);
      hoverable = false;
      
      break;
    case 3:
        initCurve();
        hoverable = true;
      break;
    default:
      break;
  }

}