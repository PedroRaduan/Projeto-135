let status = '';
let sim = 1;
let objects = [];
let video;

function setup() {
    canvas = createCanvas(700, 500);
    canvas.parent('canvas');
    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();
}

function draw() {
    image(video, 0, 0, 700, 500);

    if (sim == 0 && !status) {
        objectDetector = ml5.objectDetector('cocossd', modelLoaded);
        status = true;
    }

    if (status) {
        objectDetector.detect(video, gotResults); // Call object detection in draw
        for (let i = 0; i < objects.length; i++) {
            document.getElementById('camera').innerHTML = 'Status: Detectando Objetos';
            document.getElementById('ml5').innerHTML = 'Foram detectados ' + objects.length + ' objetos';

            fill(255, 0, 0);
            let percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + '%', objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function iniciar() {
    document.getElementById('ml5').innerHTML = 'Status = Detectando Objetos';
    sim = 0;
}

function modelLoaded() {
    console.log('modelo carregado');
    status = true;
}

function gotResults(error, results) {
    console.log(results);
    objects = results;
}
