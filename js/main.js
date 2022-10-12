'use strict'

const BALLOONS_AMOUNT = 100
var gBalloons = []
var gfaces = [':-)', ':$', ';D', ':(', ':o']
var elSky = document.querySelector('.sky')
var popSound = new Audio('sound/pop.wav')
var winSound = new Audio('sound/win.mp3')
var score = 0
var ballonCount = 0
var intervalId
var ballonCreateInterval

function init() {
    setTimeout(() => {
        var elH1 = document.querySelector('h1')
        var elBtnContainer = document.querySelector('.btns-container')
        elH1.style.opacity = 1
        elBtnContainer.style.opacity = 1
    }, 1000)
}

function startGame(elStartBtn) {
    var elScore = document.querySelector('.score')
    elScore.innerText = 'Score :'
    elScore.hidden = false
    score = 0;
    elStartBtn.hidden = true
    var elResetBtn = document.getElementById('reset')
    elResetBtn.hidden = false
    ballonCreateInterval = setInterval(renderBalloons, Math.random() * 1000 + 1000)
    intervalId = setInterval(moveBalloons, 100)
}

function renderBalloons() {
    if (ballonCount === BALLOONS_AMOUNT) {
        clearInterval(ballonCreateInterval)
        return;
    }
    elSky.appendChild(createBalloon())
}

function createBalloon() {
    ballonCount++
    var newBalloon = document.createElement('div')
    newBalloon.setAttribute('class', 'balloon')
    newBalloon.setAttribute('onclick', 'popBalloon(this)')
    newBalloon.setAttribute(`onmouseover`, `speedBalloon(${ballonCount})`)
    newBalloon.innerText = gfaces[getRandomInt(0, gfaces.length)]
    newBalloon.style.background = getRandomColor();
    newBalloon.style.left = Math.random() * 80 + 10 + 'vw'
    newBalloon.style.bottom = '0 px'
    gBalloons.push({
        id: ballonCount,
        speed: Math.random() * 2 + 1.5,
        bottom: -100
    })
    return newBalloon
}

function popBalloon(elBalloon) {
    score++;
    var elScore = document.querySelector('.score')
    if (score === BALLOONS_AMOUNT) {
        winSound.play()
        clearInterval(intervalId)
    }
    else popSound.play();
    elScore.innerText = 'Score : ' + score
    elBalloon.style.opacity = '0'
    elBalloon.style.zIndex = -1
}

function moveBalloons() {
    var elBaslloons = document.querySelectorAll('.balloon')
    for (var i = 0; elBaslloons && i < elBaslloons.length; i++) {
        gBalloons[i].bottom += gBalloons[i].speed
        elBaslloons[i].style.bottom = gBalloons[i].bottom + 'px'
    }
}

function speedBalloon(balloonId) {
    gBalloons[balloonId - 1].speed += 0.2
}

function reset(elResetBtn) {
    clearInterval(ballonCreateInterval)
    var elBaslloons = document.querySelectorAll('.balloon')
    for (var i = 0; i < elBaslloons.length; i++) {
        elSky.removeChild(elBaslloons[i])
    }
    var elScore = document.querySelector('.score')
    elScore.innerText = 'Score :'
    clearInterval(intervalId)
    var elStartBtn = document.getElementById('start')
    elStartBtn.hidden = false
    elResetBtn.hidden = true
    ballonCount = 0
    score = 0
    gBalloons = []

}

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}