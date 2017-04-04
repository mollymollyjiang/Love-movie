//python -m SimpleHTTPServer 


console.log('molly33');

var m = {t:100,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = (document.getElementById('canvas').clientHeight - m.t - m.b);

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', 1800)
    .attr('height', 1000)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');



//Color scale
var ColorType = d3.scaleOrdinal().domain(["joy","sadness"])
                .range(["#B6574B","#4E728B"]);



function filter(rows){
    
    var newrows=rows.filter(function(d){return (d.joy>0.2 || d.sadness>0.2)})
   // console.log(newrows)
    // var groupedData = d3.nest()
    //         .key(function(d){ return Math.abs(d.sadness) > Math.abs(d.joy) ? "sadness" : "joy"; })
    //         .entries(newrows);
            
    // groupedData[0].values.filter(function(d) { return d.joy > 0.5; });
    // groupedData[1].values.filter(function(d) { return d.sadness > 0.5; });
    // console.log(groupedData)
    return newrows
}

  var scaleX = d3.scaleLinear()
            .domain([0,1800])
            .range([0,w-20]);

        var scaleYJoy =d3.scaleLinear()
            .domain([0,1])
            .range([h/18,0]);
        var scaleYSad =d3.scaleLinear()
            .domain([0,1])
            .range([h/18, h/9]);

        var axisYJoy = d3.axisLeft()
            .scale(scaleYJoy)
            .tickSize(-w-10)
            .ticks(3);
        
        var axisYSad = d3.axisLeft()
            .scale(scaleYSad)
            .tickSize(-w-10)
            .ticks(3);

        var axisX = d3.axisBottom()
            .scale(scaleX);         

        

var Movies=[]


d3.queue()
    .defer(d3.csv, '../data/roman.csv', parseData)
    .defer(d3.csv, '../data/west.csv', parseData)
    .defer(d3.csv, '../data/annie.csv', parseData)
    .defer(d3.csv, '../data/harry.csv', parseData)
    .defer(d3.csv, '../data/sleepless.csv', parseData)
    .defer(d3.csv, '../data/eternal.csv', parseData)
    .defer(d3.csv, '../data/her.csv', parseData)
    .await(function(err, roman, west, annie, harry, sleepless, eternal, her){
 // console.log(roman)
 // roman = filter(roman)
 // west = filter(west)
 // console.log(roman)
 // moviedata.push(roman, west)
 // console.log(moviedata)

// moviedata.push(filter(roman), filter(west), filter(annie), filter(harry), filter(sleepless), filter(eternal), filter(her))
//console.log(moviedata)
// MovieTitle = ["Roman Holiday", "West Side Story", "Annie Hall", "When Harry met Sally", "Sleepless in Seattle",  "Eternal Sunshine of the Spotless Mind ", "Her"]

// var scaleTitle = d3.scaleBand()
//        .domain(MovieTitle)
//        .range([100,200,300,400,500,600,700])




    Movies.push({name:"Roman Holiday",data:filter(roman)},
                {name:"West Side,Story",data:filter(west)},
                {name:"Annie Hall",data:filter(annie)},
                {name:"When Harry,Met Sally",data:filter(harry)},
                {name:"Sleepless In ,Seattle",data:filter(sleepless)},
                {name:"Eternal Sunshine,of the ,Spotless Mind",data:filter(eternal)},
                {name:"Her",data:filter(her)})

   //  her.forEach(function(d) {
   //     d.sadness = d.sadness*(-1);
   //  });
 // console.log(Movies)
 // console.table(her);

 d3.select('#Movie-tides')
         .on('click', function(){

            draw1(Movies);
        })



});
    //--------------------------    Implement the code to switch between  datasets

   function draw1(rows){
        
        
       console.log(rows);

    var updatedata = plot.selectAll('.biggroup').data(Movies);
       
   

    var biggroup=updatedata.enter().append('g').attr('class','biggroup')
          .attr('transform',function(d,i){return 'translate(-10'+','+((i+0.5)*h/5)+')'})
        //    .attr('transform','translate(10'+','+(i*h/5)+')')

     
        biggroup
        //    .datum(Movies)
            // .data(function(d,i){return d})
            // .enter()
            .append('text')
            .selectAll('tspan')
            .data(function(d){return d.name.split(',')})
            .enter()
            .append('tspan').attr('class','title')
            .text(function(d){return d})
            .attr("x", -35)
            .attr('dy','1em')
            .attr("font-size",16)         
           // .attr("y", h-10)
            .style("fill", "darkgrey")



        // -g1 (transform 200px) 
       var smallgrouptop=biggroup.append('g')
       // .attr('transform','translate(-10'+','+((i+0.5)*h/5)+')')

           
           smallgrouptop.append('g')
            .attr('class','axis axis-y joy')
            .attr('transform','translate(120,0)')
            .style("stroke","lightgrey")
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width",".1px")
            .call(axisYJoy); 
            //g1-top (0)
       
       var smallgroupbottom=biggroup.append('g') //g1-bottom (50)
       // .attr('transform','translate(-10'+','+((i+0.5)*h/5)+')')
           
           smallgroupbottom.append('g')
            .attr('class','axis axis-y sad')
            .attr('transform','translate(120,0)')
            .style("stroke","lightgrey")
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width",".1px")
            .call(axisYSad);

// // creat barchart

    var barJoy = smallgrouptop.selectAll("rect")
            .data(function(d){console.log(d);return d.data.filter(function(e){return e.joy>0.5})})
            .enter()
            .append('rect')
            .attr('transform','translate(125,0)')
            .attr("x",function(d){return scaleX(d.number)})
            .attr("y",function(d){return scaleYJoy(d.joy)})
            .style("width",1.5)
            .style('fill','#B6574B')
            .style("height",function(d){return h/18 -scaleYJoy(d.joy)})
   
    var barSad = smallgroupbottom.selectAll("rect2")
            .data(function(d){return d.data.filter(function(e){return e.sadness>0.5})})
            .enter()
            .append('rect')
            .attr('transform','translate(125,0)')
            .attr("x",function(d){return scaleX(d.number)})
            .attr("y",h/18)
            //.attr("y",function(d){return scaleYSad(d.sadness)})
            .style("width",1.5)
            .style('fill','#4E728B')
            .style("height",function(d){return scaleYSad(d.sadness)-h/18})

    
}
  







function parseData(d){
  
   return {
        joy:+d["emotion_tone_joy"],
        sadness:+d["emotion_tone_sadness"],
        fear:+d["emotion_tone_fear"],
        anger:d["emotion_tone_anger"],
        disgust:+d["emotion_tone_disgust"], 
    
        number:+d["dialogueNumber"],
        text:d["text"]
        }
}















