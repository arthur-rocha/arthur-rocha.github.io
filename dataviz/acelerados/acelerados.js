// set the dimensions and margins of the graph
var margin = {top: 12, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 410 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#GraficoVoltaRapida")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var plotLikes = d3.select("#plot-Likes")
  .append("svg")
  .attr("width", width+ margin.left + margin.right + 15)
  .attr("height", height + margin.top + margin.bottom + 15)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"); 

var plotViews = d3.select("#plot-Views")
  .append("svg")
  .attr("width", width+ margin.left + margin.right + 25)
  .attr("height", height + margin.top + margin.bottom + 15)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")"); 

d3.select("#plot-likes").attr("align","center");

function find_quantiles(Numericdata){
  return [{value: d3.quantile(Numericdata, .1), legend: "10%"},
          {value: d3.quantile(Numericdata, .5), legend: "50%"},
          {value: d3.quantile(Numericdata, .9), legend: "90%"}]
}
//Read the data

var tempoOriginais = [];
var tempoPreparados = [];
var tempoMotos = [];
var tempoSUVs =[];

d3.csv("https://raw.githubusercontent.com/arthur-rocha/arthur-rocha.github.io/master/dataviz/acelerados/volta_rapida_todos.csv")
.then(function(dataVR){

  function extractDataCSV(tipo, variavel){
    dadosClasse = dataVR.filter(function(point) { return point.tipo == tipo; });

    dadosClasse.map(function(d){
      variavel.push(+d.tempo);
   })
  }
  extractDataCSV("Originais", tempoOriginais);
  extractDataCSV("Preparados", tempoPreparados);
  extractDataCSV("Motos", tempoMotos);
  extractDataCSV("SUVs", tempoSUVs);
  var dataTempo = {"Originais": tempoOriginais,
                   "Preparados": tempoPreparados,
                   "Motos": tempoMotos,
                   "SUVs": tempoSUVs
                  }

  var initData = [{coisa: "init", x: 0, y:0}];
 
  var quantiles = [60, 70, 90];
  
  
    // Add X axis
    var x = d3.scaleLinear()
      .domain([45, 115])
      .range([ 0, width ]);
    
    // add X axis (quantiles) lines
    svg.append('g')
    .selectAll("quantileLines")
    .data(quantiles)
    .enter()
    .append("line")
      .attr("x1", function (d) { return x(d); } )
      .attr("x2", function (d) { return x(d); } )
      .attr("y1", 0)
      .attr("y2", height)
      .attr("class", "line")
  
    // add X axis (quantiles) boxes
    svg.append('g')
    .selectAll("quantileBoxes")
    .data(quantiles)
    .enter()
    .append("rect")
      .attr("x", function (d) { return x(d) - 35/2; } )
      .attr("y", 0)
      .attr("width", 35)
      .attr("height", 20)
      .attr("rx", 5)
      .attr("class", "quantile-box");
  
    // add X axis (quantiles) boxes text
    svg.append('g')
    .selectAll("quantileBoxes")
    .data([{value: quantiles[0], legend: "10%"},
           {value: quantiles[1], legend: "50%"},
           {value: quantiles[2], legend: "90%"}])
    .enter()
    .append("text")
      .attr("x", d => x(d.value) - 35/2 + 5)
      .attr("y", 15)
      .text(d => d.legend)
      .attr("class", "quantile-box-text");
  
    // add X axis (quantiles) text
    svg.append('g')
    .selectAll("quantileText")
    .data(quantiles)
    .enter()
    .append("text")
      .attr("x", d => x(d) + 10)
      .attr("y", height)
      .text(d => d)
      .attr("class", "x-axis-text");
  
    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", (width + margin.left + margin.right)/2)
    .attr("y", height + margin.top + 15)
    .text("Tempo (s)")
    .attr("font-family", "'National 2 Narrow Web','Montserrat', sans-serif");
  
    // Add Y axis
    var y = d3.scaleLinear()
      .domain([-10, 20])
      .range([ height, 0]);
  
  
  const container = d3.select('#scrolly-side');
  const stepSel = container.selectAll('.step');
  
  function updateChart(index) {
    const sel = container.select(`[data-index='${index}']`);
    const dataClass = sel.attr('data-class');
    var dataFilter = dataVR.filter(function(d){return d.tipo==dataClass});
    var tempoClasse = dataTempo[dataClass];
    var txtBar = container.select('.texto-barra');
    txtBar.text(dataClass);
    var xlimsup = parseFloat(d3.max(tempoClasse));
    var xliminf = parseFloat(d3.min(tempoClasse));
    quantilesData = find_quantiles(tempoClasse);

    // Update X axis
    x.domain([xliminf,xlimsup]);
    
    //update quantiles lines
    svg
    .selectAll(".line")
    .data(quantilesData)
    .transition() // Transition 1
    .duration(800)
      .attr("x1", function (d) { return x(d.value); } )
      .attr("x2", function (d) { return x(d.value); } );

    //update quantiles lines box
    svg
    .selectAll(".quantile-box")
    .data(quantilesData)
    .transition() // Transition 1
    .duration(800)
      .attr("x", function (d) { return x(d.value) - 35/2; } )

    //update quantiles box text
    svg
    .selectAll(".quantile-box-text")
    .data(quantilesData)
    .transition() // Transition 1
    .duration(800)
      .attr("x", d => x(d.value) - 35/2 + 5)

    //update quantiles lines text
    svg
    .selectAll(".x-axis-text")
    .data(quantilesData)
    .transition() // Transition 1
    .duration(800)
      .attr("x", d => x(d.value) + 10)
      .text(d => Math.round(d.value*100)/100)
      .attr("class", "x-axis-text");
    
    var jitterWidth = 50
    //update points
    svg.selectAll(".data-points")
    .data(dataFilter, function(d) { return(d); })
    .exit()
    .remove();
    
    //functions to trigger when mouseover 
    var dtPoinst = svg.selectAll("dot")
        .data(dataFilter, function(d) { return(d); })
        .enter()
        .append("circle")
        .on("mouseover", function(event, d){
          d3.select(this)
          .style("fill", "#d90000")
          .transition() // Transition 1
          .duration(100)
          .attr("r", 7)
          .style("cursor", "pointer")
          .attr("xlink:href", d => d.link_yt);

          txtBar
          .text(d.carro + ' (' + d.tempo + 's)');
        })
        .on("mouseleave", function(event, d){
          d3.select(this)
          .style("fill", "#474747")
          .transition() // Transition 1
          .duration(100)
          .attr("r", 5)
          .style("cursor", "default");

          txtBar
          .text(dataClass);
        })
        .on("click", function(event,d){
          window.open(d.link_yt, '_blank')
        });

    dtPoinst
        .attr("cx", function (d) { return x(d.tempo); } )
        .attr("cy", d => y(Math.floor(Math.random() * 10)) + Math.random()*jitterWidth - Math.random()*jitterWidth)
        .transition() // Transition 1
        .duration(800)
        .attr("r", 5)
        .attr("class", "data-points");
        

  }
  
  
  function init() {
    Stickyfill.add(d3.select('.sticky').node());
   
    enterView({
      selector: stepSel.nodes(),
      offset: 0.5,
      enter: el => {
        const index = +d3.select(el).attr('data-index');
        updateChart(index);
      },
      exit: el => {
        let index = +d3.select(el).attr('data-index');
        index = Math.max(0, index - 1);
        updateChart(index);
      } });
  
  }
  
  svg.selectAll("dot")
  .data(initData, function(d) { return(d); })
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x(d.x); } )
  .attr("cy", function (d) { return y(d.y); } )
  .attr("r", 1)
  .classed("data-points", true)
  .attr("visibility", "hidden");
  
  init();

  //second plot (likes x time)
  // Add X axis
  var x2 = d3.scaleLinear()
      .domain([45, 115])
      .range([ 0, width ]);

  plotLikes.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2));
    
  var y2 = d3.
    scaleLinear()
    .domain([0, 89000])
    .range([ height, 0]);
  
    plotLikes.append("g")
    .call(d3.axisLeft(y2));

   // Add X axis label:
   plotLikes.append("text")
   .attr("text-anchor", "end")
   .attr("x", margin.left)
   .attr("y", height + margin.top + 20)
   .text("Tempo (s)")
   .attr("font-family", "'National 2 Narrow Web','Montserrat', sans-serif");

  // Add Y axis label
  plotLikes.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 10)
  .attr("x", -height +80)
  .text("Likes (Youtube)")
  .attr("font-family", "'National 2 Narrow Web','Montserrat', sans-serif");

 plotLikes
  .selectAll("dot")
  .data(dataVR)
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x2(d.tempo); } )
  .attr("cy", function (d) { return y2(d.likes); } )
  .attr("r", 5)
  .attr("class", "data-points")
  .attr("fill", d => d.carro == "Porsche 918 Spyder" ? "#d90000":"#474747")

  //Third plot (Views)
 // Add X axis

  plotViews.append("g")
  .attr("transform", "translate(0," + (height) + ")")
  .call(d3.axisBottom(x2));

  var y3 = d3.
  scaleLinear()
  .domain([0, 2647315])
  .range([ height, 0]);

  plotViews.append("g")
  .call(d3.axisLeft(y3));

  // Add X axis label:
  plotViews.append("text")
  .attr("text-anchor", "end")
  .attr("x", margin.left)
  .attr("y", height + margin.top + 20)
  .text("Tempo (s)")
  .attr("font-family", "'National 2 Narrow Web','Montserrat', sans-serif");

  // Add Y axis label
  plotViews.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 10)
  .attr("x",  -height +80)
  .text("Views (Youtube)")
  .attr("font-family", "'National 2 Narrow Web','Montserrat', sans-serif");

  plotViews
  .selectAll("dot")
  .data(dataVR)
  .enter()
  .append("circle")
  .attr("cx", function (d) { return x2(d.tempo); } )
  .attr("cy", function (d) { return y3(d.views); } )
  .attr("r", 5)
  .attr("class", "data-points")

  function highlightButton(plot, btnId, className){
    d3.select(btnId)
    .on("mouseover", function(event, d){
      plot.selectAll(".data-points")
      .style("fill", d => d.carro == className ? "#d90000":"#a3a3a3")
      .transition() // Transition 1
      .duration(100)
      .attr("r", d => d.carro == className ? 8:5);
    
    })
    .on("mouseleave", function(event, d){
      plot.selectAll(".data-points")
      .style("fill", "#474747")
      .transition() // Transition 1
      .duration(100)
      .attr("r", 5);

    })
  };
  highlightButton(plotViews, "#porsche-918-views", "Porsche 918 Spyder");
  highlightButton(svg, "#porsche-918-tempo", "Porsche 918 Spyder");
  highlightButton(svg, "#herbie-tempo", "Volkswagen Fusca Herbie 1968");
  highlightButton(svg, "#kombi-tempo", "VW Kombi Last Edition (preparado)");
  highlightButton(svg, "#delorean-tempo", "Delorean DMC-12");
  highlightButton(svg, "#honda-cbr-tempo", "Honda CBR 1000 RR");
  highlightButton(svg, "#ducati-tempo", "Ducati Panigale SuperNaked");
  highlightButton(svg, "#kawasaki-tempo", "Kawasaki Ninja H2R");
  highlightButton(svg, "#honda-ml-tempo", "Honda ML 125 1983");
  highlightButton(svg, "#bendita-tempo", "Bendita Macchina Shodan");
  highlightButton(svg, "#cayenne-tempo", "Porsche Cayenne Turbo");
  highlightButton(svg, "#duster-tempo", "Renault Duster Iconic");
  highlightButton(svg, "#ecosport-tempo", "Ford EcoSport 1.6 Powershift");
  highlightButton(plotViews, "#porsche-718-views", "Porsche 718 Boxster");
  highlightButton(plotLikes, "#porsche-718-likes", "Porsche 718 Boxster");
  highlightButton(plotLikes, "#jaguar-likes", "Jaguar XF");
})




