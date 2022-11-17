const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;


var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");

c.width = 600
c.height = 600
let diameter = 50
let radius = diameter / 2
let color = "black"
var flag = true
let text = "failed"
var inputDia = document.getElementById('dia');
var inputColor = document.getElementById('color');
var msg = document.getElementById('msg')
inputDia.value = 50
inputColor.value = 'Black'
const audio1 = new Audio()
audio1.src = "rock.mp3"

main()

const recognition = new SpeechRecognition()
recognition.interimResults = true




recognition.addEventListener('result', (e) => {
    text = e.results[0][0].transcript
    //  console.log(text)
})
recognition.addEventListener('audioend', () => {

    flag = false
    record()
});



function main() {

    clearCanvas()
    draw()

}

function record() {
    var but = document.getElementById('rec')
    if (flag) {
        but.innerText = 'Stop'
        recognition.start()

        flag = false

    }
    else if (!flag) {
        but.innerText = 'Start'
        recognition.stop()
        authorize()
        //console.log(text)
        flag = true


    }
   // console.log(color)
    main()

}

function authorize() {
    let arr = text.split(" ")

    if (arr[0] == 'color') {
        inputColor.value = arr[1]
        color = arr[1]
        msg.innerHTML = ""
    }
    else if (arr[0] == 'size' && arr[1] < 301 && arr[1] > 0) {
        inputDia.value = arr[1]
        diameter = arr[1]
        radius = diameter / 2
        msg.innerHTML = ""
    }
    else if (arr[0] == 'size' && arr[1] > 300) {
        msg.innerHTML = "Size limit 300"
        let utterance = new SpeechSynthesisUtterance("Size limit 300")
        speechSynthesis.speak(utterance)


    }
    else if (arr[0] == 'size' && arr[1] < 1 || arr[1] == 'zero' || arr[1] == '-') {
        msg.innerHTML = "Size too small, the minimal size is 1"
        let utterance = new SpeechSynthesisUtterance("Size too small, the minimal size is 1")
        speechSynthesis.speak(utterance)


    }
    else if (arr[0] == 'help') {
        msg.innerHTML = "Say color, followed by a color, to set the circle color. Say size, followed of a number from 1 to 300, to set the diameter of the circle"
        let utterance = new SpeechSynthesisUtterance("Say color, followed by a color, to set the circle color. Say size, followed of a number from 1 to 300, to set the diameter of the circle")
        speechSynthesis.speak(utterance)

    }
    // this is an easter egg for my friend
    else if (arr[0] == 'rock' && arr[1] == 'and' || arr[2] == 'stone') {
        var img = new Image()
        img.src = 'scout.png'
        img.onload = function () {
            ctx.drawImage(img, 300, 300)
        }
        audio1.play()
    }
    else {
        msg.innerHTML = "Error. Unable to recognize speech, Please try again"
        let utterance = new SpeechSynthesisUtterance("Error. Unable to recognize speech, Please try again")
        speechSynthesis.speak(utterance)


    }
   // console.log(arr)




}

function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function draw() {
    ctx.fillStyle = color
    ctx.beginPath();
    ctx.arc(300, c.height / 2, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function change() {



    // var inputFont = document.getElementById('pac');
    // var inputFont2 = document.getElementById('arial');
    // var inputFont3 = document.getElementById('roboto');


    diameter = inputDia.value
    radius = diameter / 2
    color = inputColor.value

    main()




}