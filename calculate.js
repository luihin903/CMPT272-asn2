var vertically = document.getElementsByClassName("center vertically");
var horizontally = document.getElementsByClassName("center horizontally");
var fileInput = document.getElementById("upload");
var boundInputs = document.getElementsByClassName("LowerBounds")[0].getElementsByTagName("input");
var plotTable = document.getElementsByClassName("plot");

var ids = ["Max", "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];
var result = "";
var names = [];
var grades = [];
var bounds = [100, 95.00, 90.00, 85.00, 80.00, 75.00, 70.00, 65.00, 60.00, 55.00, 50.00];
var plots = []; plots.length = 11; plots.fill(0);

function handleFileSelect(event) {
    var reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
}

function handleFileLoad(event) {
    result = event.target.result.replaceAll(" ", "").replaceAll(" ", ""); // remove spaces and invisible characters
    
    while (result.length > 5) {
        result = result.slice(result.search("\r")); // remove grade from string, including the column name at the first row
        result = result.slice(2); // remove \r and \n
        names.push(result.slice(0, result.search(","))); // add name to array
        result = result.slice(result.search(",") + 1); // remove name and comma from string
        grades.push(Number(result.slice(0, result.search("\r")))); // add grade
    }
    grades[grades.length-1] = Number(result); // override the last grade

    calculate();
}

function calculate() {
    plots.fill(0);
    console.log("calculate");
    plot();
    highest();
    lowest();
    mean();
    median();
}

function plot() {
    for (var i = 0; i < bounds.length - 1; i ++) {
        
        for (var j in grades) {
            if (bounds[i] > grades[j] && grades[j] > bounds[i+1]) {
                plots[i] ++;
            }
        }
        
        plotTable[i].innerHTML = "&#128123;".repeat(plots[i]);
    }
}

function highest() {

}

function lowest() {

}

function mean() {

}

function median() {

}

function getPlot() {
    var elements = [];

    for (var i = 1; i < ids.length; i ++) {
        elements.push(document.getElementsByClassName("plot"));
    }

    return elements;
}

window.addEventListener("change", function(event) {
    if (event.target == fileInput) handleFileSelect(event);
    else {event.target.value = Number(event.target.value).toFixed(2);}
    updateBounds();
    if (event.target != fileInput) event.target.value = Number(event.target.value).toFixed(2);
    calculate();
});

function updateBounds() {
    newBounds = [];

    // read new bounds
    for (var i = 0; i < boundInputs.length; i ++) {
        newBounds.push(Number(boundInputs[i].value));
    }

    for (var i = 0; i < boundInputs.length - 1; i ++) {
        if (Number(boundInputs[i].value) <= Number(boundInputs[i+1].value)) {
            alert("Invalid Bound Value");
            boundInputs[i].value = Number(bounds[i]).toFixed(2);
            boundInputs[i+1].value = Number(bounds[i+1]).toFixed(2);
            return;
        }
    }

    bounds = newBounds.slice();
}

setInterval(function() {
    var width = document.getElementsByTagName("html")[0].offsetWidth;
    var height = document.getElementsByTagName("html")[0].offsetHeight;

    for (var i = 0; i < vertically.length; i ++) {
        vertically[i].style.top = height / 2 - Number(vertically[i].offsetHeight) / 2 + "px";
    }
    for (var i = 0; i < horizontally.length; i ++) {
        horizontally[i].style.left = width / 2 - Number(horizontally[i].offsetWidth) / 2 + "px";
    }

}, 100);