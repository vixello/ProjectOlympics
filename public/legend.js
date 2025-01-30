function setupLegend(uniqueDisciplines) {

    const allThemes = [
        ["#492b7c", "#8A2BE2", "#9854cb", "#FFA500", "#87CEEB", "#32CD32", "#00FF7F", "#00CED1", "#4682B4", "#8B008B"], // Summer
        ["#ADD8E6", "#4682B4", "#5F9EA0", "#B0E0E6", "#AFEEEE", "#00FFFF", "#708090", "#778899", "#E0FFFF", "#6A5ACD"], // Winter
        ["#8B4513", "#8f3b76", "#8B0000", "#CD5C5C", "#FF4500", "#DC143C", "#A52A2A", "#D87093", "#FF6347", "#BC8F8F"], // Warm Earth
        ["#006400", "#228B22", "#2E8B57", "#66CDAA", "#20B2AA", "#48D1CC", "#40E0D0", "#00CED1", "#4682B4", "#5F9EA0"], // Cool Aquatic
        ["#FFB6C1", "#FFDAB9", "#E6E6FA", "#D8BFD8", "#B0E0E6", "#ADD8E6", "#90EE90", "#F5DEB3", "#FFFACD", "#FFE4E1"], // Pastel
        ["#FF0000", "#00FF00", "#0000FF", "#FF00FF", "#D3D3D3", "#FF4500", "#32CD32", "#8A2BE2", "#7B68EE", "#FF69B4"], // Vivid
        ["#A9A9A9", "#696969", "#708090", "#778899", "#B0C4DE", "#D3D3D3", "#2F4F4F", "#6A5ACD", "#4682B4", "#DCDCDC"]  // Muted
    ].flat();


    const colorScale = d3.scaleOrdinal(allThemes);

    const sportColors = {};

    uniqueDisciplines.forEach((discipline, index) => {
        sportColors[discipline] = colorScale(index);
    });

    //LEGEND
    const legend = d3.select("#legend")

    legend.append("div").attr("class", "legend-title").text("Event types: ");
    legend.append("div").attr("class", "legend")
        .html('<span style="border: 2px solid white;  margin-left:1px;width: 13px; height: 13px; display: inline-block;"></span> Single Stroke (Medal Type)');

    legend.append("div").attr("class", "legend")
        .html('<span style="border: 2px dotted white;  margin-left:1px;width: 13px; height: 13px; display: inline-block;"></span> Dotted Stroke (Team Medal Type)');

    legend.append("div").attr("class", "legend-title").text("Gender: ");

    // Add a circle 
    legend.append("div").attr("class", "legend")
        .html('<span style="border-radius: 50%; margin-left:1px;margin-right:2px; width: 15px; height: 15px; background-color:#fe00a9; display: inline-block;"></span> Women');
    // Add a triangle 
    legend.append("div").attr("class", "legend")
        .html('<span style="width: 0; height: 0; margin-left:1px; margin-right:2px;border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 13px solid #fe00a9; display: inline-block;"></span> Men');

    // Add a rectangle 
    legend.append("div").attr("class", "legend")
        .html('<span style="width: 15px; height: 15px; margin-left:1px;margin-right:2px; background-color: #fe00a9; display: inline-block;"></span> Mixed');

    // Add a rectangle 
    legend.append("div").attr("class", "legend")
        .html(`
<span style="position: relative;  margin-left:1px; margin-right:2px;display: inline-block; width: 15px; height: 15px; background-color: #fe00a9;">
<span style="position: absolute; top: 4.1px; left:4.1px; width: 7px; height: 7px; background-color: white;"></span>
</span> Open`);

    legend.append("div").attr("class", "legend-title").text("Disciplines: ");
    Object.keys(sportColors).forEach(sport => {
        legend.append("div")
            .attr("class", "legend")
            .html(`<span class="legend-rect" style="background-color: ${sportColors[sport]}"></span> ${sport}`);
    });

    return {
        allThemes,
        colorScale,
        sportColors,
        legend
    };
}
