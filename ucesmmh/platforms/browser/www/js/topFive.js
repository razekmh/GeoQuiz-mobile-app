var topFivelayer
var topFivejson
var data
var svg
//sending the request for the cloeset five questions
//the following function uploads the data collected from the form to the server
var topFiveClient; // the global variable that holds the request
function gettopFive() {
    graphScroll();
    // closeDrawers();
    closeDrawerOnResume = true
    topFiveClient = new XMLHttpRequest();
    var url = 'http://developer.cege.ucl.ac.uk:'+ httpPortNumber + "/getTopFive/";
    topFiveClient.open('GET',url,true);
    //topFiveClient.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    topFiveClient.onreadystatechange = topFiveUploaded;
    topFiveClient.send();
}
// create the code to wait for the response from the data server, and process the response once it is received
function topFiveUploaded() {
    // this function listens out for the server to say that the data is ready - i.e. has state 4
    if (topFiveClient.readyState == 4) {
    // change the DIV to show the response
    topFivedata= topFiveClient.responseText;
    loadtopFive(topFivedata);
    }
}

function loadtopFive(topFivedata) {
    // convert the text to JSON
    topFivejson = JSON.parse(topFivedata);
    // graphScroll();
    drawGraph(topFivejson);
    // add the JSON layer onto the map - it will appear using the default icons
    console.log(topFivejson);
};

//scroll to the graph
function graphScroll() {
    document.getElementById("graph").innerHTML = ""
    var elmnt = document.getElementById("graph");
    elmnt.scrollIntoView(false);
  };

//close the drawer
// function closeDrawer(){
//     // private DrawerLayout mDrawerLayout;
//     // mDrawerLayout = (DrawerLayout) findViewById(R.id.drawer_layout);
//     // mDrawerLayout.closeDrawers();
//     // mDrawerLayout.closeDrawer(Gravity.START, false);
//     closeDrawers ();
// };

//code reused from https://jsfiddle.net/8v88gwqn/1/
function drawGraph(topFivejson){
    console.log("topFivejson[0].array_to_json[0].port_id");
    console.log(topFivejson[0].array_to_json[0].port_id);
    
    data = [
        {label:topFivejson[0].array_to_json[0].port_id, value:topFivejson[0].array_to_json[0].num_questions},
        {label:topFivejson[0].array_to_json[1].port_id, value:topFivejson[0].array_to_json[1].num_questions},
        {label:topFivejson[0].array_to_json[2].port_id, value:topFivejson[0].array_to_json[2].num_questions},
        {label:topFivejson[0].array_to_json[3].port_id, value:topFivejson[0].array_to_json[3].num_questions},
        {label:topFivejson[0].array_to_json[4].port_id, value:topFivejson[0].array_to_json[4].num_questions}
    ];

  

    console.log(data);
    var div = d3.select("#graph").append("div").attr("class", "toolTip");

    var axisMargin = 20,
            margin = 40,
            valueMargin = 4,
            width = parseInt(d3.select('#graph').style('width'), 10),
            height = parseInt(d3.select('#graph').style('height'), 10),
            barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
            barPadding = (height-axisMargin-margin*2)*0.6/data.length,
            data, bar, svg, scale, xAxis, labelWidth = 0;
            console.log("width");
            console.log(width);

    max = d3.max(data, function(d) { return d.value; });
        d3.select("#graph")
                .append('br')

        d3.select("#graph")
                .append('hr')

        d3.select("#graph")
                .append('h5')
                .text("Top five users")
                .style("font-family", "Lato")
                .style("text-align", "center")
                .style("margin-bottom", "0")
                .style("font-size", "2.5em")

        svg = d3.select('#graph')
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                ;


        bar = svg.selectAll("g")
                .data(data)
                .enter()
                .append("g");

        bar.attr("class", "bar")
                .attr("cx", 0)
                .attr("transform", function (d, i) {
                        return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
                });

        bar.append("text")
                .attr("class", "label")
                .attr("y", barHeight / 2)
                .attr("dy", ".35em") //vertical align middle
                .text(function (d) {
                        return d.label;
                }).each(function () {
                        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
                })
                .attr("transform", "translate (0,32)rotate(-90)")
                ;

        scale = d3.scaleLinear()
                .domain([0, max])
                .range([0, (width - margin * 2 - labelWidth)])
                ;

        xAxis = d3.axisBottom(scale)
                .tickSize(-height + 2 * margin + axisMargin)
                ;

        bar.append("rect")
                .attr("transform", "translate(" + labelWidth + ", 0)")
                .attr("height", barHeight)
                .attr("width", 0)
                .transition()
                .duration(1500)
                .delay(function (d, i) { return i * 250 })
                .attr("width", function (d) {
                        return scale(d.value);
                });

        bar.append("text")
                .attr("class", "value")
                .attr("y", barHeight / 2)
                .attr("dx", -valueMargin + labelWidth) //margin right
                .attr("dy", ".35em") //vertical align middle
                .attr("text-anchor", "end")
                .text(function (d) {
                        return (d.value);
                })
                .attr("x", function (d) {
                        var width = this.getBBox().width;
                        return Math.max(width + valueMargin, scale(d.value));
                });

        svg.insert("g", ":first-child")
                .attr("class", "axisHorizontal")
                .attr("transform", "translate(" + (margin + labelWidth) + "," + (height - axisMargin - margin) + ")")
                .call(xAxis);


};