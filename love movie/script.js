//python -m SimpleHTTPServer 


console.log('molly33');

var m = {t:100,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = (document.getElementById('canvas').clientHeight - m.t - m.b);

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w+m.l+m.r)
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
            .attr("x", 90)
            .attr('dy','1em')
            .attr("font-size",12)         
           // .attr("y", h-10)
            .style("fill", "#585F5D")
            .style("stroke-width",".1px")



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
        
    var movies = ["Roman Holiday", "West Side,Story", "Annie Hall", "When Harry,Met Sally", "Sleepless In ,Seattle", "Eternal Sunshine,of the ,Spotless Mind", "Her"];
       console.log(rows);
        var Emodata = rows.map(function(e, i){
        var d = e.data;
        
       //  return {
       //      movieName: movies[i],
       //      anger: d3.mean(d, function(d){ return d.anger; }),
       //      disgust: d3.mean(d, function(d){ return d.disgust; }),
       //      fear: d3.mean(d, function(d){ return d.fear; }),
       //      joy: d3.mean(d, function(d){ return d.joy; }),
       //      sadness: d3.mean(d, function(d){ return d.sadness; }),
       //      text: d.text
       //     };
       // });

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
       console.log("emo", Emodata);

    
    // var updatedata2 = plot.selectAll('.biggroup2').data(Emodata);
       
 
    var updatedata = plot.selectAll('.biggroup').data(Emodata);
    var Emogroup=updatedata.enter().append('g').attr('class','biggroup2')
          .attr('transform',function(d,i){return 'translate(-10'+','+((i+0.5)*h/5)+')'})
        //    .attr('transform','translate(10'+','+(i*h/5)+')')

     
        Emogroup
        //    .datum(Movies)
            // .data(function(d,i){return d})
            // .enter()
            .append('text')
            .selectAll('tspan')
            .data(function(d){return d.movieName.split(',')})
            .enter()
            .append('tspan').attr('class','title')                
            .text(function(d){return d})
            .attr("x", 90)
            .attr('dy','1em')
            .attr("font-size",16)         
           // .attr("y", h-10)
            .style("fill", "#585F5D")

console.log(Emodata)

        

// var sJoy = Movies.sort(function(a,b){
//         return b.joy - a.joy;
//        });

//        //if you want to just keep top three
//        sJoy = sJoy.filter(function(d,i){
//         return i < 3;
//        });
// console.log()


 var scaleR = d3.scaleLinear()
 .range([2,38])
 .domain([0,500])
 
 
        Emogroup  
            .append('circle')
            .attr('r',function(d){return scaleR(d.joy)})
            .attr('cx',190)
            .attr('cy','1em')  
            .style('fill',"#d69854")

        //    .duration(1000)
        Emogroup  
            .append('circle')
            .attr('r',function(d){return scaleR(d.sadness)})
            .attr('cx',390)
            .attr('cy','1em')    
            .style('fill',"#26678e")
        Emogroup  
            .append('circle')
            .attr('r',function(d){return scaleR(d.anger)})
            .attr('cx',590)
            .attr('cy','1em')    
            .style('fill',"#b6574c")
        Emogroup  
            .append('circle')
            .attr('r',function(d){return scaleR(d.disgust)})
            .attr('cx',790)
            .attr('cy','1em')    
            .style('fill',"#909ea7")
        Emogroup  
            .append('circle')
            .attr('r',function(d){return scaleR(d.fear)})
            .attr('cx',990)
            .attr('cy','1em')     
            .style('fill',"#7f9b73")
           





// var collide=d3.forceCollide().radius(function(d){return scaleR(d.emo+5)}),
//  forceY=d3.forceY().y(h/2),
//  forceX=d3.forceX().x(w/2);
//  var update=smallgrouptop2.selectAll('.emo')
//  .data(Movies,function(d){return d.emo} )

// update.exit().remove()
// var simulation=d3.forceSimulation(Movies)
//     .force('positionX',forceX)
//     .force('positionY',forceY)
//     .force('collide',collide)
//     .on('tick',function(){
//         smallgrouptop2.selectAll('.emo')
//         .attr('transform',function(d){return 'translate('+d.x+','+d.y+')'})

//     })

 // enter  .on('mouseenter',function(d){

 //            var tooltip = d3.select('.custom-tooltip');
 //            console.log("mouseenter", tooltip.node());
 //            tooltip.select('.title')
 //                .html(d.key);
 //            tooltip.transition().style('opacity',1);

 //            d3.select(this).style('stroke-width','3px');
 //        })
 //        .on('mousemove',function(d){
 //            var tooltip = d3.select('.custom-tooltip');
 //            var xy = d3.mouse( d3.select('.container').node() );
 //            tooltip
 //                .style('left',xy[0]-80+'px')
 //                .style('top',xy[1]-80+'px');
 //        })
 //        .on('mouseleave',function(d){
 //            var tooltip = d3.select('.custom-tooltip');
 //             tooltip.transition().style('opacity',0);

 //            d3.select(this).style('stroke-width','0px');
 //            });
              


    
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
        emo:+d["emotionmean"]


        }
}















