//python -m SimpleHTTPServer 


console.log('molly33');

var m = {t:100,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = (document.getElementById('canvas').clientHeight - m.t - m.b);

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', (w+m.l+m.r)*1.25)
    .attr('height', (h+m.t+m.b)*1.25)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');





//Color scale
var ColorType = d3.scaleOrdinal().domain(["joy","sadness"])
                .range(["#B6574B","#4E728B"]);

var scaleColor = d3.scaleOrdinal()
        .domain(['joy','sadness','anger','disgust','fear'])
        .range(['#86C166','#7BA23F','#4A593D','#42602D','#516E41','#91B493']);





function filter(rows){
    
    var newrows=rows.filter(function(d){return (d.joy>0 || d.sadness>0.2)})
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
    .defer(d3.csv, '../data/casablanca.csv', parseData)
    .defer(d3.csv, '../data/roman.csv', parseData)
    .defer(d3.csv, '../data/west.csv', parseData)
    .defer(d3.csv, '../data/annie.csv', parseData)
    .defer(d3.csv, '../data/harry.csv', parseData)
    .defer(d3.csv, '../data/sleepless.csv', parseData)
    .defer(d3.csv, '../data/eternal.csv', parseData)
    .defer(d3.csv, '../data/her.csv', parseData)
    .defer(d3.csv, '../data/herm.csv', parseData)
    .await(function(err, casablanca, roman, west, annie, harry, sleepless, eternal, her, herm){
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



    Movies.push({name:"Casablanca, ,(1942)",data:filter(casablanca)},
                {name:"Roman holiday, ,(1953)",data:filter(roman)},
                {name:"West side story, ,(1961)",data:filter(west)},
                {name:"Annie Hall, ,(1977)",data:filter(annie)},
                {name:"When Harry met Sally, ,(1989)",data:filter(harry)},
                {name:"Sleepless in Seattle, ,(1993)",data:filter(sleepless)},
                {name:"Eternal sunshine,of the spotless mind, ,(2004)",data:filter(eternal)},
                {name:"Her, ,(2013)",data:filter(her)})

   //  her.forEach(function(d) {
   //     d.sadness = d.sadness*(-1);
   //  });
 console.log(Movies)
  




 d3.select('#Movie-tides')
         .on('click', function(){

            draw1(Movies);
        })
 
 d3.select('#Movie-emotions')
         .on('click', function(){

            draw2(Movies);
        })

draw1(Movies);

});
    //--------------------------    Implement the code to switch between  datasets

   function draw1(rows){
        
       
      d3.selectAll('.biggroup2').remove();
      d3.selectAll('.circle').remove();

      //d3.select("#container2").remove();
      d3.selectAll('.movieContainer').remove();
      // d3.select('img').remove();

    var updatedata = plot.selectAll('.biggroup').data(Movies);
       
   

    var biggroup=updatedata.enter().append('g').attr('class','biggroup')
          .attr('transform',function(d,i){return 'translate(-10'+','+((i-0.3)*h/5.9)+')'})
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
            .attr("x", 90)
            .attr('dy','1em')
            .attr("font-size",12)         
           // .attr("y", h-10)
            .style("fill", "#F1EAEA")
            .style("stroke-width",".1px")
            .on('mouseenter',function(d){
        d3.select(this)
          .style('fill','#3CB4BE');
    })
            .on('click',function(d){
            draw2(movies)})
           .on('mouseleave',function(d){ 
             
              d3.select(this)
              .style('fill','#F1EAEA');
          });

             





        // -g1 (transform 200px) 
       var smallgrouptop=biggroup.append('g')
       // .attr('transform','translate(-10'+','+((i+0.5)*h/5)+')')

           
           smallgrouptop.append('g')
            .attr('class','axis axis-y joy')
            .attr('transform','translate(120,0)')
            .style("stroke","#F1EAEA")
            .style("stroke-dasharray", ("3, 3"))
            .style("stroke-width",".1px")
            .call(axisYJoy); 
            //g1-top (0)
       
       var smallgroupbottom=biggroup.append('g') //g1-bottom (50)
       // .attr('transform','translate(-10'+','+((i+0.5)*h/5)+')')
           
           smallgroupbottom.append('g')
            .attr('class','axis axis-y sad')
            .attr('transform','translate(120,0)')
            .style("stroke","#F1EAEA")
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
            .style('fill','#DC8989')
            .style("height",function(d){return h/18 -scaleYJoy(d.joy)})

    // var circleJoy = smallgrouptop.selectAll("circle")
    //         .data(function(d){console.log(d);return d.data.filter(function(e){return e.joy>0.5})})
    //         .enter()
    //         .append('rect')
    //         .attr('transform','translate(125,0)')
    //         .attr("x",function(d){return scaleX(d.number)})
    //         .attr("y",function(d){return scaleYJoy(d.joy)})
    //         .style("width",1.5)
    //         .style('fill','#B6574B')
    //         .style("height",function(d){return h/18 -scaleYJoy(d.joy)})



   
    var barSad = smallgroupbottom.selectAll("rect2")
            .data(function(d){return d.data.filter(function(e){return e.sadness>0.5})})
            .enter()
            .append('rect')
            .attr('transform','translate(125,0)')
            .attr("x",function(d){return scaleX(d.number)})
            .attr("y",h/18)
            //.attr("y",function(d){return scaleYSad(d.sadness)})
            .style("width",1.5)
            .style('fill','#7995C3')

            .style("height",function(d){return scaleYSad(d.sadness)-h/18})





    //tooltip

            barJoy.on('click',function(d,i){
            console.log(d);
            console.log(i);
            console.log(this);
        })


            .on('mouseenter',function(d){
        var tooltip = d3.select('.custom-tooltip');
           console.log(tooltip.node())
            tooltip.select('.text')
               // .html( d.text )
                  .html('"' + d.text + '"')
        

            tooltip.transition().style('opacity',.8);

            d3.select(this).style('stroke-width','3.5px');

            })
            .on('mousemove',function(d){
        var tooltip = d3.select('.custom-tooltip');
        var xy = d3.mouse( d3.select('.container').node() );
            
            tooltip
                .style('left',xy[0]+10+'px')
                .style('top',xy[1]+10+'px');

            })
           
            .on('mouseleave',function(d){
        var tooltip = d3.select('.custom-tooltip');
            tooltip.transition(1000).style('opacity',0);

            d3.select(this).style('stroke-width','0px');

            });

         
         barSad.on('click',function(d,i){
            console.log(d);
            console.log(i);
            console.log(this);
        })

            .on('mouseenter',function(d){
        var tooltip = d3.select('.custom-tooltip');
           console.log(tooltip.node())
            tooltip.select('.text')
               // .html( d.text )
                  .html('"' + d.text + '"')
        

            tooltip.transition().style('opacity',.8);

            d3.select(this).style('stroke-width','3.5px');

            })
            .on('mousemove',function(d){
        var tooltip = d3.select('.custom-tooltip');
        var xy = d3.mouse( d3.select('.container').node() );
            
            tooltip
                .style('left',xy[0]+10+'px')
                .style('top',xy[1]+10+'px');

            })
           
            .on('mouseleave',function(d){
        var tooltip = d3.select('.custom-tooltip');
            tooltip.transition(1000).style('opacity',0);

            d3.select(this).style('stroke-width','0px');

            });

    
}






function draw2(rows){

    d3.selectAll('.biggroup').remove();


// filter the data

    var flatData = rows.map(function(d) {
        return d.data.map(function(e){
            e.name = d.name;
            return e;
        });
    });
    flatData = flatData.reduce(function(prev, curr){ return prev.concat(curr); }, []);


    var cf = crossfilter(flatData);
    var movieNameDimension = cf.dimension(function(d){ return d.name; });
    var angerDimension = cf.dimension(function(d){ return d.anger; });
    var fearDimension = cf.dimension(function(d){ return d.fear; });
    var joyDimension = cf.dimension(function(d){ return d.joy; });
    var sadnessDimension = cf.dimension(function(d){ return d.sadness; });

    // console.log("rows", rows);
    console.log("flatData", flatData);
    var moviesSet = d3.set(flatData.map(function(d) { return d.name; }));

    var movies = moviesSet.values();
    console.log
       console.log(rows);
        var Emodata = rows.map(function(e, i){
        var d = e.data;

        return {
            movieName: movies[i],
            anger: d3.sum(d, function(d){ return d.anger; }),
            disgust: d3.sum(d, function(d){ return d.disgust; }),
            fear: d3.sum(d, function(d){ return d.fear; }),
            joy: d3.sum(d, function(d){ return d.joy; }),
            sadness: d3.sum(d, function(d){ return d.sadness; }),
            text: d.text
           };
       });
       console.log( Emodata);

    var vizData = Emodata.map(function(d) {
        var movieEmotions = [];
        movieEmotions.push({
            name: d.movieName,
            emotion: "anger",
            score: d.anger
        });
        movieEmotions.push({
            name: d.movieName,
            emotion: "sadness",
            score: d.sadness
        });
        movieEmotions.push({
            name: d.movieName,
            emotion: "joy",
            score: d.joy
        });
        movieEmotions.push({
            name: d.movieName,
            emotion: "fear",
            score: d.fear
        });
        return movieEmotions;
    });

// setting position for each movie
    var movieLocation = {};
    Emodata.forEach(function(d, i){ 
            var x = 0, y = 0;
            if (i < 4) {
                x = w/4;
            } else {
                x = 3*w/4;
            }

            if (i < 4) {
                y = i*(h/3);
            } else {
                y = (i-4)*(h/3);
            }

            return movieLocation[d.movieName] = { x: x, y: y };
        });

    vizData = vizData.reduce(function(prev, curr){ return prev.concat(curr); }, []);
    console.log("vizData", vizData);

    var g = plot.append("g")
        .attr("class", "force");

    var texts = g.selectAll("text")
        .data(Object.keys(movieLocation));

    texts.exit().remove();
    texts.enter()
        .append("text")
        .merge(texts)
        .attr("x", function(d){ return movieLocation[d].x-100; })
        .attr("y", function(d){ return movieLocation[d].y; })
        .text(function(d){ return d; });

    var circles = g.selectAll("circle")
        .data(vizData);

    var scaleR = d3.scaleLinear().domain([0, 1000]).range([0, 50]);
    var colors = {
        anger: '#B6574B',
        fear: '#7F9B73',
        joy: '#D69853',
        sadness: '#2A678E',
        disgust:'#8A8D8E',
        sw: '#2A678E'
    };
    var scaleColor = d3.scaleOrdinal().domain(Object.keys(colors)).range(Object.values(colors));

    circles.exit().remove();
    circles.enter()
        .append("circle")
        .merge(circles)
        .classed("emotionNode", true)
        .attr("fill", function(d){ return scaleColor(d.emotion); })
        .attr("r", function(d){ return scaleR(d.score); })
        .on("mouseover", function(d){
            console.log(d);
            movieNameDimension.filter(d.name);
            var sentences = [];
            if (d.emotion == "sadness") {
                sentences = sadnessDimension.top(5);
            } else if (d.emotion == "joy") {
                sentences = joyDimension.top(5);
            } else if (d.emotion == "fear") {
                sentences = fearDimension.top(5);
            } else if (d.emotion == "anger") {
                sentences = angerDimension.top(5);
            }
            sentences = sentences.map(function(e){ return e.text; });
            console.log(sentences);
        });

    var collide=d3.forceCollide().radius(function(d){return scaleR(d.score+5)}),
        forceY=d3.forceY().y(function(d){
            return movieLocation[d.name].y;
        }),
        forceX=d3.forceX().x(function(d){
            return movieLocation[d.name].x;
        });
    var simulation = d3.forceSimulation()
        .force('positionX',forceX)
        .force('positionY',forceY)
        .force('collide',collide)
        // .force('center',forceCenter)
        .on('tick',function(){
            plot.selectAll('.emotionNode')
            .attr('transform',function(d){return 'translate('+d.x+','+d.y+')'})
        })
        .nodes(vizData);




      

  // var movies = [
  //   { 
  //     anger: 0.206,
  //     fear: 0.253,
  //     joy: 0.503,
  //     sadness: 0.552,
  //     disgust:0.179,
  //     name: 'Casablanca',
  //     sw:"I was lonely. I had nothing,not even hope."
  //   },
  //   {
  //     anger: 0.151,
  //     fear: 0.184,
  //     joy: 0.234,
  //     sadness: 0.299,
  //     disgust:0.133,
  //     name: 'Roman holiday'
  //   },
  //   {
  //     anger: 0.288,
  //     fear: 0.318,
  //     joy: 0.362,
  //     sadness: 0.497,
  //     disgust:0.264,
  //     name: 'West side story',
  //     text: "We love the sea and I love you !"
  //   },
  //   {
  //     anger: 0.247,
  //     fear: 0.282,
  //     joy: 0.302,
  //     sadness: 0.477,
  //     disgust:0.243,
  //     name: 'Annie Hall'
  //   },
  //   {
  //     anger: 0.188,
  //     fear: 0.214,
  //     joy: 0.447,
  //     sadness: 0.566,
  //     disgust:0.171,
  //     name: 'When Harry met Sally'
  //   },
  //    {
  //     anger: 0.171,
  //     fear: 0.209,
  //     joy: 0.437,
  //     sadness: 0.486,
  //     disgust:0.150,
  //     name: 'Sleepless In ,Seattle'
  //   },
  //   {
  //     anger: 0.238,
  //     fear: 0.302,
  //     joy: 0.275,
  //     sadness: 0.459,
  //     disgust:0.191,
  //     name: 'Eternal Sunshine,of the ,Spotless Mind'
  //   },
  //   {
  //     anger: 0.219,
  //     fear: 0.263,
  //     joy: 0.537,
  //     sadness: 0.665,
  //     disgust:0.131,
  //     name: 'Her'
  //   }
  // ];
  // console.log(movies)
   
  //  var drawMovie = function(movie, size) {
  //   size = size || 150;
  //   var keys = ['anger','fear','joy','sadness',"disgust"]

  //   var values = keys.map(function(key) {
  //     var val = movie[key];
  //     var r   = val * size/3;
  //     return {
  //       label: key,
  //       value: val,
  //       r: r,
  //       color: colors[key]
  //     };
  //   });

  //   var container = d3.select("#container2")
  //     .append('div')
  //     .attr('class','movieContainer');
  //   var title = container
  //     .append('div')
  //     .attr('class','title')
  //     .text(movie.name)

  //   var svg = container
  //     .append('svg')
  //     .attr('width', size)
  //     .attr('height', size)

  //   d3.packSiblings(values);


  //   var circle = svg.selectAll('circle')
  //     .data(values)
  //     .enter()
  //     .append('circle')
  //     .attr('r', function (d) { return d.r })
  //     .attr('cx', function (d) { return d.x + size/2; })
  //     .attr('cy', function (d) { return d.y + size/2; })
  //     .attr('fill', function (d) { return d.color; });

  //    var lines = container .append('sw')
  //       .text(movie.sw)
        


  // };

  // for(var i = 0; i < movies.length; i++) {
  //   drawMovie(movies[i]);
  // }






 // var scaleR = d3.scaleLinear()
 // .range([2,38])
 // .domain([0,500])

 //  var scaleR = d3.scaleLinear()
 // .range([0,38])
 // .domain([0,0.35])
 
 //        Emogroup  
 //            .append('circle')
 //            .attr('r',function(d){return scaleR(d.joy)})
 //            .attr('cx',190)
 //            .attr('cy','1em')  
 //            .style('fill',"#d69854")
 //            .attr('class','emo')

 //        //    .duration(1000)
 //        Emogroup  
 //            .append('circle')
 //            .attr('r',function(d){return scaleR(d.sadness)})
 //            .attr('cx',390)
 //            .attr('cy','1em')    
 //            .style('fill',"#26678e")
 //             .attr('class','emo')
 //        Emogroup  
 //            .append('circle')
 //            .attr('r',function(d){return scaleR(d.anger)})
 //            .attr('cx',590)
 //            .attr('cy','1em')    
 //            .style('fill',"#b6574c")
 //             .attr('class','emo')
 //        Emogroup  
 //            .append('circle')
 //            .attr('r',function(d){return scaleR(d.disgust)})
 //            .attr('cx',790)
 //            .attr('cy','1em')    
 //            .style('fill',"#909ea7")
 //             .attr('class','emo')
 //        Emogroup  
 //            .append('circle')
 //            .attr('r',function(d){return scaleR(d.fear)})
 //            .attr('cx',990)
 //            .attr('cy','1em')     
 //            .style('fill',"#7f9b73")
 //            .attr('class','emo')







    
}





function parseData(d){
  
   return {
        joy:+d["emotion_tone_joy"],
        sadness:+d["emotion_tone_sadness"],
        fear:+d["emotion_tone_fear"],
        anger:+d["emotion_tone_anger"],
        disgust:+d["emotion_tone_disgust"], 
    
        number:+d["dialogueNumber"],
        text:d["text"],
        emo:+d["emotion"],
        line:d["line"]


        }
}















