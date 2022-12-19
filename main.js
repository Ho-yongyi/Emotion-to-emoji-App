// https://teachablemachine.withgoogle.com/models/mhKT0nALt/
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach(camera);
function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='m' src='"+data_uri+"'>";
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/mhKT0nALt/model.json',modelLoaded);
function modelLoaded()
{
    console.log('Model Loaded!');
}
prediction1="";
prediction2="";
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction1;
    speak_data_2 = "And the second prediction is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check()
{
    img = document.getElementById("m");
    classifier.classify(img, gotResults);
}
function gotResults(error, result)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction1 = result[0].label;
        prediction2 = result[1].label;
        speak();
        if(result[0].label == "happy")
        {
            document.getElementById("update_emotion").innerHTML = "&#128522;";
        }
        if(result[0].label == "sad")
        {
            document.getElementById("update_emotion").innerHTML = "&#128532;";
        }
        if(result[0].label == "angry")
        {
            document.getElementById("update_emotion").innerHTML = "&#128548;";
        }
        if(result[1].label == "happy")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128522;";
        }
        if(result[1].label == "sad")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128532;";
        }
        if(result[1].label == "angry")
        {
            document.getElementById("update_emotion2").innerHTML = "&#128548;";
        }
    }
}