function renderPoints(selectedYear, points, shape, svg, sportColors, selectedDiscipline) {

    const createTooltip = (event, d) => {
        const countryText = selectedYear==="all"? d.countryName : d.realCountryName ;
        tooltip.style("visibility", "visible")
        .text(`${countryText} - ${d.eventType.charAt(0).toUpperCase() + d.eventType.slice(1)} ${d.type.charAt(0).toUpperCase() + d.type.slice(1)}: ${d.count}`)
        .style("top", `${event.pageY - 10}px`)
        .style("left", `${event.pageX + 10}px`);
    }
        const commonAttributes = (selection) => {
        selection
            .style("fill", d => d.type === "gold" ? "gold" : d.type === "silver" ? "silver" : "brown")
            .style("opacity", 0.8)
            .style("stroke", d => sportColors[selectedDiscipline] || "black")
            .style("stroke-width", 2)
            .style("stroke-dasharray", d => d.eventType === "solo" ? "0.0" : "2.5")
            .on("mouseover", createTooltip)
            .on("mousemove", (event) => {
                tooltip.style("top", `${event.pageY - 10}px`)
                    .style("left", `${event.pageX + 10}px`);
            })
            .on("mouseout", () => {
                tooltip.style("visibility", "hidden");
            });
    };
 
    if (shape === "circle") {
        svg.selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("r", d => (Math.sqrt(d.count) + 1) * 3)
            .call(commonAttributes);
    } else if (shape === "polygon") {
        svg.selectAll("polygon")
            .data(points)
            .enter()
            .append("polygon")
            .attr("points", d => {
                const size = (Math.sqrt(d.count) + 1) * 3;
                return `${-size},${-size} ${size},${-size} 0,${size}`;
            })
            .call(commonAttributes);
    } else if (shape === "rect") {
        svg.selectAll("rect")
            .data(points)
            .enter()
            .append("rect")
            .attr("x", d => -(Math.sqrt(d.count) * 3))
            .attr("y", d => -(Math.sqrt(d.count) * 3))
            .attr("width", d => Math.sqrt(d.count) * 6)
            .attr("height", d => Math.sqrt(d.count) * 6)
            .call(commonAttributes);
    } else if (shape === "star") {
        const createStarPath = (size) => {
            const outerRadius = size * 3.5;
            const innerRadius = size * 1.5;
            const points = [];
            for (let i = 0; i < 10; i++) {
                const angle = (Math.PI / 5) * i;
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                points.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
            }
            return points.map(p => p.join(",")).join(" ");
        };

        svg.selectAll("polygon.star")
            .data(points)
            .enter()
            .append("polygon")
            .attr("points", d => createStarPath(Math.sqrt(d.count)))
            .attr("transform", d => {
                const [x, y] = projection(d.point);
                return `translate(${x},${y})`;
            })
            .call(commonAttributes);
    } else if (shape === "donut") {
        svg.selectAll("g.donut")
            .data(points)
            .enter()
            .append("g")
            .each(function (d) {
                const size = (Math.sqrt(d.count) + 2) * 3;
                const holeSize = size / 2;

                d3.select(this)
                    .append("rect")
                    .attr("x", -size / 2)
                    .attr("y", -size / 2)
                    .attr("width", size)
                    .attr("height", size)
                    .call(commonAttributes);

                d3.select(this)
                    .append("rect")
                    .attr("x", -holeSize / 2)
                    .attr("y", -holeSize / 2)
                    .attr("width", holeSize)
                    .attr("height", holeSize)
                    .style("fill", "white");
            });
    }
}

// const womenPoints = points.filter(d => d.gender === "women");

// svg.selectAll("circle")
//     .data(womenPoints)
//     .enter()
//     .append("circle")
//     .attr("r", d => Math.sqrt(d.count) * 3)
//     .style("fill", d => d.type === "gold" ? "gold" :
//         d.type === "silver" ? "silver" : "brown")
//     .style("opacity", 0.8)
//     .style("stroke", d => sportColors[selectedDiscipline] || "black")  // Use the color for the sport
//     .style("stroke-width", 2.5)
//     .style("stroke-dasharray", d => d.eventType === "solo" ? "0.0" : "2.5")
//     .on("mouseover", (event, d) => {
//         // Update tooltip to show "ROC" as "Russian Olympic Committee"
//         const countryText = (d.countryName === "ROC" || d.countryName === "Olympic Athletes from Russia") ? "Russian Olympic Committee" : d.countryName;
//         tooltip.style("visibility", "visible")
//             .text(`${countryText} - ${d.eventType.charAt(0).toUpperCase() + d.eventType.slice(1)} ${d.type.charAt(0).toUpperCase() + d.type.slice(1)}: ${d.count}`)
//             .style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mousemove", (event) => {
//         tooltip.style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//     });

// const menPoints = points.filter(d => d.gender === "men");

// svg.selectAll("polygon")
//     .data(menPoints)
//     .enter()
//     .append("polygon")
//     .attr("points", d => {
//         // Create triangle points based on the count (size of the triangle)
//         const size = Math.sqrt(d.count) * 3; // Adjust size as needed
//         return `${-size},${-size} ${size},${-size} 0,${size}`; // Triangle shape (3 points)
//     })
//     .style("fill", d => d.type === "gold" ? "gold" :
//         d.type === "silver" ? "silver" : "brown")
//     .style("opacity", 0.8)
//     .style("stroke", d => sportColors[selectedDiscipline] || "black")  // Use the color for the sport
//     .style("stroke-width", 2.5)
//     .style("stroke-dasharray", d => d.eventType === "solo" ? "0.0" : "2.5")
//     .on("mouseover", (event, d) => {
//         // Update tooltip to show "ROC" as "Russian Olympic Committee"
//         const countryText = (d.countryName === "ROC" || d.countryName === "Olympic Athletes from Russia") ? "Russian Olympic Committee" : d.countryName;
//         tooltip.style("visibility", "visible")
//             .text(`${countryText} - ${d.eventType.charAt(0).toUpperCase() + d.eventType.slice(1)} ${d.type.charAt(0).toUpperCase() + d.type.slice(1)}: ${d.count}`)
//             .style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mousemove", (event) => {
//         tooltip.style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//     });

// const mixedPoints = points.filter(d => d.gender === "mixed");

// svg.selectAll("rect")
//     .data(mixedPoints)
//     .enter()
//     .append("rect")
//     .attr("x", d => {
//         const size = Math.sqrt(d.count) * 3; // Adjust size based on count
//         return -size / 2; // Center the rectangle horizontally
//     })
//     .attr("y", d => {
//         const size = Math.sqrt(d.count) * 3; // Adjust size based on count
//         return -size / 2; // Center the rectangle vertically
//     })
//     .attr("width", d => Math.sqrt(d.count) * 6) // Adjust width based on count
//     .attr("height", d => Math.sqrt(d.count) * 6) // Adjust height based on count
//     .style("fill", d => d.type === "gold" ? "gold" :
//         d.type === "silver" ? "silver" : "brown")
//     .style("opacity", 0.8)
//     .style("stroke", d => sportColors[selectedDiscipline] || "black")  // Use the color for the sport
//     .style("stroke-width", 2.5)
//     .style("stroke-dasharray", d => d.eventType === "solo" ? "0.0" : "2.5")
//     .on("mouseover", (event, d) => {
//         // Update tooltip to show "ROC" as "Russian Olympic Committee"
//         const countryText = (d.countryName === "ROC" || d.countryName === "Olympic Athletes from Russia") ? "Russian Olympic Committee" : d.countryName;
//         tooltip.style("visibility", "visible")
//             .text(`${countryText} - ${d.eventType.charAt(0).toUpperCase() + d.eventType.slice(1)} ${d.type.charAt(0).toUpperCase() + d.type.slice(1)}: ${d.count}`)
//             .style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mousemove", (event) => {
//         tooltip.style("top", `${event.pageY - 10}px`)
//             .style("left", `${event.pageX + 10}px`);
//     })
//     .on("mouseout", () => {
//         tooltip.style("visibility", "hidden");
//     });
