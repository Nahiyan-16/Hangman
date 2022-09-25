
let first = document.getElementById("first")
let second = document.getElementById("second")
let third = document.getElementById("third")
let play_btn = document.getElementById("play-btn")
let head = document.getElementById("head_text")
let letter_box = document.getElementById("letters_container")
let emptySpace = document.getElementById("emptySpaces")
let stickman = document.getElementById("stickman")

let opacity = []
let orderTitle = [first, second, third, play_btn]
let orderGame = [head,letter_box,emptySpace]
let time = 0

function fadeInGame(){
  for(let i = 0; i < orderGame.length; i ++){
    setTimeout(startFade, time, orderGame[i], i)
    time += 1200
  }
}

function fadeInTitle(){
  for(let i = 0; i < orderTitle.length; i ++){
    setTimeout(startFade, time, orderTitle[i], i)
    time += 1200
  }
}

function startFade(x,i){
  opacity[i] = 0
  setInterval(fadeIn, 10, x, i)
}

function fadeIn(x, i) {
  if(opacity[i] < 1){
    x.style.opacity = opacity[i]
    opacity[i] += 0.01
  }
  else{
    clearInterval()
  }
}

/*
GAME JAVASCRIPT
*/

letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

for(let i= 0; i < letters.length; i++){
  letter_box.innerHTML +=`<button class="letter-btn" id="${letters[i]}" 
  onclick='letterClicked("${letters[i]}")'>${letters[i]}`
}

function letterClicked(x){
  let obj = document.getElementById(x)
  if(letters.includes(x)){
    obj.style.background = 'rgb(124, 153, 62)'
    letters.splice(letters.indexOf(x), 1)
  }
}

stickman.innerHTML += `<p id="jsStickmanHead">O</p>`
stickman.innerHTML += `<p id="jsStickmanMid">|</p>`
stickman.innerHTML += `<p id="jsStickmanLeftLeg">/</p>`
stickman.innerHTML += `<p id="jsStickmanRightLeg">\\</p>`
stickman.innerHTML += `<p id="jsStickmanLeftArm">_</p>`
stickman.innerHTML += `<p id="jsStickmanRightArm">_</p>`

fetch('wordlist.txt')
  .then(response => response.text())
  .then(data => {
  	const arr = data.split(/\r?\n/);
    let randNum = Math.floor(Math.random() * 58109)
    let emptyLetter = document.getElementById("emptyLetter")
    for(let i = 0; i < arr[randNum].length; i++){
      emptyLetter.innerHTML += `_ `
    }
  });