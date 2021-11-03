Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+"/>;"
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5262ctlWF/',modelLoaded);

function modelLoaded(){
    console.group('Model Loaded!');
}

function check()
{
    img = docuent.getElementById('captured_image');
    classifier.classify(img, gotResults);
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis); 
}

function gotResults(error,results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "hi")
        {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "bye")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "bad")
        {
            document.getElementById("upadate_emoji").innerHTML = "&#128548;";
        }
        if(results[1].label == "good")
        {
            document.getElementById("update_emoji2").innerHTML = "&128522;";
        }
    }
}