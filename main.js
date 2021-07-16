status = "";
function preload(){}
function setup(){
    canvas = createCanvas(450,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(450,450);
}
function draw(){
    image(video, 0, 0, 450,450);
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Dtecting objects!";
    objectname = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}