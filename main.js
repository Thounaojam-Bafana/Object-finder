status = "";
objects = [];
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

    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            percent = floor(objects[i].confidence * 100);
            fill("#1a00e0");
            text(objects[i].label, objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#e01300");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            rect(40, 40, 100, 60);
            if(objects[i].label == objectname){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("objectfound").innerHTML = "Object mentioned found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance("Object Mentioned Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("objectfound").innerHTML = "Object mentioned not found";
            }
        }
    }
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
function gotResult(error, results){
    objects = results;
}