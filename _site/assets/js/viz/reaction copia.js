$(document).ready(function () {

    // Various accessors that specify the four dimensions of data to visualize.
    function x(d) {
        return d.Reactions;
    }

    function y(d) {
        return d.Comments;
    }

    function radius(d) {
        return d.Views;
    }

    function color(d) {
        return d.Orientamento;
    }


    let x2 = d3.scale.log()
        .domain([0, 210000000])
        .range([0 + margin, width])

    let y2 = d3.scaleLinear()
        .domain([0, 100])
        .range([height, margin])

    // Chart dimensions.
    var margin = {
            top: 5.5,
            right: 19.5,
            bottom: 12.5,
            left: 39.5
        },
        width = 847,
        height = 500 - margin.top - margin.bottom;



    //let x = d3.scaleLog()
    //    .domain([0, 210000000])
    //    .range([0 + margin, width])
    //
    //let y = d3.scaleLinear()
    //    .domain([0, 100])
    //    .range([height, margin])
    //
    //let size = d3.scaleSqrt()
    //    .range([dimMin, dimMax])
    //
    //let xScale = d3.fisheye.scale(d3.scaleLog)
    //    .domain([0, 210000000])
    //    .range([0 + margin, width])
    //
    //let yScale = d3.fisheye.scale(d3.scaleLinear)
    //    .domain([0, 100])
    //    .range([height, margin])
    //
    //let xAxis = d3.axisBottom(x)
    //    .tickValues([10000, 100000, 1000000, 10000000, 100000000, 200000000])
    //    .tickFormat(d3.format(".2s"))
    //    .tickSize(-height + margin)
    //
    //let yAxis = d3.axisLeft(y)
    //    .ticks(10)
    //    .tickSize(-width + margin)


    // Various scales and distortions.
    var xScale = d3.fisheye.scale(d3.scale.linear).domain([1e4, 7e5]).range([0, width]),
        yScale = d3.fisheye.scale(d3.scale.linear).domain([1, 15e4]).range([height, 0]),
        radiusScale = d3.scale.sqrt().domain([0, 5e8]).range([0, 40]),
        colorScale = d3.scale.category10().domain(["Sub-Saharan Africa", "South Asia", "Middle East & North Africa", "America", "Europe & Central Asia", "East Asia & Pacific"]);

    // The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).tickFormat(d3.format(".2s")).tickSize(-height),
        yAxis = d3.svg.axis().scale(yScale).orient("left").tickFormat(d3.format(".2s")).tickSize(-width);

    // Create the SVG container and set the origin.
    var svg = d3.select("#reaction-viz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add a background rect for mousemove.
    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#FFFFFF");

    // Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")");

    // Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(100, 0)")
        .call(yAxis);

    //    svg.append("text")
    //        .attr("class", "x label")
    //        .attr("text-anchor", "end")
    //        .attr("x", width - 6)
    //        .attr("y", height - 6)
    //        .text("income per capita, inflation-adjusted (dollars)");
    // Add a y-axis label.
    //    svg.append("text")
    //        .attr("class", "y label")
    //        .attr("text-anchor", "end")
    //        .attr("x", 6)
    //        .attr("y", -6)
    //        .attr("dy", ".75em")
    //        .attr("transform", "rotate(-90)")
    //        .text("life expectancy (years)");

    // Load the data.
    d3.csv("./assets/js/viz/data/reactions.csv", function (data) {

        // Add a dot per nation. Initialize the data at 1800, and set the colors.
        var dot = svg.append("g")
            .attr("class", "dots")
            .selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .style("fill", function (d) {
                return colorScale(color(d));
            })
            .call(position);

        //        // Add a title.
        //        dot.append("title")
        //            .text(function (d) {
        //                return d.name;
        //            });

        // Positions the dots based on data.
        function position(dot) {
            dot.attr("cx", function (d) {
                    return xScale(x(d));
                })
                .attr("cy", function (d) {
                    return yScale(y(d));
                })
                .attr("r", function (d) {
                    return radiusScale(radius(d));
                });
        }

        svg.on("mousemove", function () {
            var mouse = d3.mouse(this);
            xScale.distortion(2.5).focus(mouse[0]);
            yScale.distortion(2.5).focus(mouse[1]);

            dot.call(position);
            svg.select(".x.axis").call(xAxis);
            svg.select(".y.axis").call(yAxis);
        });


        //reset
        svg.on("mouseout", function () {
            //        squares
            //            .attr("x", d => x(d.muslim_population) - size(d.ff_mln) / 2)
            //            .attr("y", d => y(d.GINI_index) - size(d.ff_mln) / 2)
            //            .style("fill-opacity", 0.4)
            //            .attr("transform", d => `rotate(-45 ${x(d.muslim_population)} ${y(d.GINI_index)})`)
            //
            //        circles
            //            .attr("cx", d => x(d.muslim_population))
            //            .attr("cy", d => y(d.GINI_index))
            //
            //        labels
            //            .attr("x", d => x(d.muslim_population))
            //            .attr("y", d => y(d.GINI_index) - 2)
            //            .attr("opacity", 0.4)
            //
            //        xAxis = d3.axisBottom(x)
            //            .tickValues([10000, 100000, 1000000, 10000000, 100000000, 200000000])
            //            .tickFormat(d3.format(".2s"))
            //            .tickSize(-height + margin)
            //
            //        yAxis = d3.axisLeft(y)
            //            .ticks(10)
            //            .tickSize(-width + margin)
            //
            //        svg.select(".x.axis").call(xAxis)
            //        svg.select(".y.axis").call(yAxis)
        })



    });
});
