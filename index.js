let first = document.getElementById("first")
let second = document.getElementById("second")
let third = document.getElementById("third")
let play_btn = document.getElementById("play-btn")
let head = document.getElementById("head_text")
let letter_box = document.getElementById("letters_container")
let emptySpace = document.getElementById("emptySpaces")
let emptyLetter = document.getElementById("emptyLetter")
let livesLeft = document.getElementById("lives")
const reset = document.getElementById("reset-btn")
const mute = document.getElementById("mute")
const invert = document.getElementById("invert")
const audio = document.getElementById("audio")
let timer = document.getElementById("timer")
const changeTopic = document.getElementById("changeTopic")
let body = document.getElementById("body")

let opacity = []
let orderTitle = [first, second, third, play_btn]
let orderGame = [head,letter_box,emptySpace]
let time = 0
let timeOut = 0
let score = 0
let hiScore = 0
let timerTime = 92000
let topic = ''

let intervalTimer = setInterval(setUpTimer, 1000)

function fadeInTitle(){
  for(let i = 0; i < orderTitle.length; i ++){
    setTimeout(startFade, time, orderTitle[i], i)
    time += 600
  }
}

function fadeInGame(){
  for(let i = 0; i < orderGame.length; i ++){
    setTimeout(startFade, time, orderGame[i], i)
    time += 600
  }
}

function startFade(x,i){
  opacity[i] = 0
  let interval = setInterval(fadeIn, 50, x, i)
  setTimeout(function(){
    clearInterval(interval)
  }, 600)
}

function fadeIn(x, i) {
  if(opacity[i] < 1){
    x.style.opacity = opacity[i]
    opacity[i] += 0.10
  }
  else{
    time = 0
  }
}

function fadeOutGame(){
  for(let i = orderGame.length; i >= 0; i --){
    setTimeout(startFadeOut, timeOut, orderGame[i], i)
    timeOut += 600
  }
}

function startFadeOut(x,i){
  opacity[i] = 1
  let interval = setInterval(fadeOut, 50, x, i)
  setTimeout(function(){
    clearInterval(interval)
  }, 600)
}

function fadeOut(x, i) {
  if(opacity[i] >= 0){
    x.style.opacity = opacity[i]
    opacity[i] -= 0.10
  }
  else{
    timeOut = 0
  }
}

/*
=========================================
||         GAME JAVASCRIPT             ||
=========================================
*/

let subject =''
let word = ''
let lives = 6
let letters = getLetters()
let letterAry = []
let wAry = [] 

let sub = getSoccerTeams()

generateLetters()
generateWord()
checkHiScore()
setUpTimer()

function generateLetters(){
  for(let i= 0; i < letters.length; i++){
    letter_box.innerHTML +=`<button class="letter-btn" id="${letters[i]}" 
    onclick='letterClicked("${letters[i]}")'>${letters[i]}`
  }
}


function letterClicked(x){
  if(lives > 0){
    if(letters.includes(x)){
      letters.splice(letters.indexOf(x), 1)
      checkLetter(x)
      }
  }
  displayLives()
}

function containsWhitespace(str) {
  return /\s/.test(str);
}

function generateWord(){
  subject = sub[Math.floor(Math.random() * sub.length)]
  emptyLetter.innerHTML += `${subject[0]}: `
  word = subject[Math.floor(Math.random() * subject.length) + 1]
  word = word.toLowerCase()
  wAry = word.split("")
  for(let i = 0; i < word.length; i++){
    if(wAry[i] == '-'){
      letterAry[i] = '-'
    }
    else if(containsWhitespace(wAry[i])){
      letterAry[i] = "\u00A0"
    }
    else{
      letterAry[i] = '_'
    }
    emptyLetter.innerHTML += `${letterAry[i]} `
  }
}

function displayLives(){
  if(checkWinner()){
    score += 1
    displayScore()
    checkHiScore()
    resetNext()
  }
  else if(lives == 0 || timerTime < 100){
    livesLeft.innerHTML = `You lost`
    score = 0
    timerTime = 0
    timer.innerHTML = `Time: 0`
    revealWord()
  }
  else if(lives > 1){
    livesLeft.innerHTML = `${lives} lives left`
  }
  else{
    livesLeft.innerHTML = `${lives} life left`
  }
}

function revealWord(){
  emptyLetter.innerHTML = `${subject[0]}: ${word}`
}

function checkLetter(x){
  let obj = document.getElementById(x)
  if(wAry.includes(x)){
    let pos = getLetterPos(x)
    emptyLetter.innerHTML = `${subject[0]}: `
    let count = 0
    for(let i = 0 ; i < wAry.length; i++){
      if(i == pos[count]){  
        letterAry[pos[count]] = x
        emptyLetter.innerHTML += x
        count ++
        displayLives()
      }
      else{
        obj.style.background = 'rgb(22, 161, 49)'
        emptyLetter.innerHTML += `${letterAry[i]} `
      }
    }
    wAry.splice(index, 1)
    livesLeft.innerHTML += wAry
  }
  else{
    obj.style.background = 'rgb(151, 49, 49)'
    obj.style.textDecoration = 'line-through'
    lives--
  }
}

function getLetterPos(x){
  let ary = []
  for(let i = 0; i < wAry.length; i++){
    if(wAry[i].includes(x)){
      ary.push(i)
    }
  }
  return ary
}

function checkWinner(){
  let win = true
  for(let i = 0; i < letterAry.length; i++){
    if(letterAry[i] == "_"){
      win = false
    }
  }
  return win
}

function getLetters(){
  let x = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
  return x
}

reset.addEventListener('click',function(){
  resetNext(2)
})

let changeTopicKey = 0

changeTopic.addEventListener('click',changeTopicFunc)

function changeTopicFunc(){
  if(changeTopicKey == 0){
    topic = 'Football'
    setTimeout(function(){
      changeTopic.innerHTML = `${topic}`
    },2500)
    sub = getCities()
    changeTopicKey++
  }
  else{
    topic = 'Cities'
    setTimeout(function(){
      changeTopic.innerHTML = `${topic}`
    },2500)
    sub = getSoccerTeams()
    changeTopicKey --
  }
  resetNext(2)
}

function resetNext(num){
  if(num === 2){
    score = 0
    lives = 6
    setTimeout(function(){
      timerTime = 92000
    },3000)
  }
  else{
    lives+= 2
    timerTime += 31000
  }
  fadeOutGame()
  subject =''
  word = ''
  letters = getLetters()
  letterAry = []
  wAry = [] 
  reset.disabled = true
  setTimeout(function(){
    emptyLetter.innerHTML = ""
    letter_box.innerHTML = ""
    clearInterval(intervalTimer)
    intervalTimer = setInterval(setUpTimer, 1000)
    generateLetters()
    generateWord()
    displayLives()
    checkHiScore()
    displayScore()
    setUpTimer()
  },3000)
  setTimeout(fadeInGame, 2500)
  setTimeout(function(){
    reset.disabled = false
  },7000)
}

function displayScore(){
  let scoreBoard = document.getElementById('score')
  scoreBoard.innerHTML = `Score: ${score}`
}

function checkHiScore(){
  let hiScoreBoard = document.getElementById('hiScore')
  hiScore = localStorage.getItem('myHiScore')
  if(score >= hiScore){
    hiScore = score
    localStorage.setItem('myHiScore', hiScore)
  }
  hiScoreBoard.innerHTML = `Hi Score: ${hiScore}`
}

audio.volume = '0.3'
let audioKey = 0
mute.addEventListener('click', function(){
  if(audioKey == 0){
    mute.innerHTML = `🔇`
    audio.pause()
    audioKey++
  }
  else{
    mute.innerHTML = `🔊`
    audio.play()
    audioKey--
  }
})

let invertKey = 0
invert.addEventListener('click', function(){
  let ary = [body]
  if(invertKey == 0){
    invert.innerHTML = `🌔`
    for(let i = 0; i < ary.length; i++){
      ary[i].style.color = 'rgb(206, 255, 101)'
      ary[i].style.backgroundColor = 'rgb(4, 47, 84)'
    }
    invertKey ++

  }
  else{
    invert.innerHTML = `🌒`
    for(let i = 0; i < ary.length; i++){
      ary[i].style.color = 'rgb(4, 47, 84)'
      ary[i].style.backgroundColor = 'rgb(206, 255, 101)'
    }
    invertKey--
  }
})

function setUpTimer(){
  timerTime -= 1000
  let timeTemp = timerTime/1000
  if(timeTemp >= 60){ 
    let minute = Math.floor(timeTemp/60)
    timeTemp %= 60
    if(timeTemp < 10){
      timer.innerHTML = `Time: ${minute}:0${timeTemp}`
    }
    else{
      timer.innerHTML = `Time: ${minute}:${timeTemp}`
    }
  }
  else{
    timer.innerHTML = `Time: ${timeTemp}`
  }
  if(timerTime < 1000){
    clearInterval(intervalTimer)
    displayLives()
  }
}

function getCities(){
  const citites = ['City','Hong Kong', 'Bangkok', 'Singapore', 'London', 'Paris', 'Dubai', 'Delhi', 'Istanbul', 'New York City', 'Antalya', 'Mumbai', 'Phuket', 'Tokyo',
 'Rome', 'Mecca', 'Prague', 'Seoul', 'Osaka', 'Medina', 'Amsterdam', 'Denpasar', 'Miami', 'Chennai', 'Shanghai', 'Los Angeles', 'Barcelona',
  'Cairo', 'Las Vegas', 'Milan', 'Vienna', 'Athens', 'Berlin', 'Cancun', 'Moscow', 'Orlando', 'Madrid', 'Venice']
  let allCities = [citites]
  return allCities
}


function getSoccerTeams(){
  const psg = ['PSG','messi','mbappe','neymar','verratti','hakimi','ramos','marquinhos','donnarumma','mendes','kimpembe','vitinha','sanches','navas']
  const manU = ['United','ronaldo','maguire','varane','martinez','casemiro','anthony','fernandes','rashford','de gea','shaw','martial','mctominay']
  const Spurs =['Tottenham','kane','son','lloris','richarlison','dier','sanchez','moura','lenget','romero','emerson','perisic','winks']
  const city = ['City','haaland','silva','de bruyne','alvarez','ederson','rodri','walker','cancelo','foden','mahrez','grealish','ake','dias','stones']
  const arsenal = ['Arsenal','saka','martinelli','jesus','ramsdale','odegaard','saliba','partey','xhaka','white','holding','smith-rowe','elneny','nketiah']
  const chelsea = ['Chelsea','mount','silva','mendy','koulibaly','kante','chilwell','kovacic','azpilicueta','pulisic','havertz','jorginho','sterling']
  const liverpool = ['Liverpool','salah','firmino','nunez','jota','diaz','fabinho','thiago','alisson','van dijk','trent','robertson','matip','gomez']
  const barca = ["Barcelona",'fati','pedri','gavi','busquets','lewandowski','araujo','alba','ter stegen','de jong','kessie','depay','dembele','kounde','raphinha']
  const real = ['Real madrid','benzema','vinicius','rodrygo','courtois','modric','kroos','camavinga','mendy','hazard','rudiger','alaba','militao','valverde']
  const atletico = ['Atletico','felix','gimenez','koke','saul','oblak','griezmann','savic','correa','llorente','carrasco','de paul','lemar','morata']
  const bayern = ['Bayern','mane','sane','hernandez','de ligt','kimmich','goretzka','neuer','upamecano','gnabry','davies','musiala','coman','sabitzer']
  const dortmund = ['Dortmund','reus','reyna','bellingham','hummels','brandt','can','hazard','sule','guerreiro']
  const juve = ['Juventus','di maria','kean','vlahovic','bonucci','cuadrado','rabiot','milik','paredes','mckennie','chiesa','danilo','pogba','sandro']
  const inter = ['Inter','lakaku','martinez','barella','skriniar','onana','dzeko','calhanoglu','handnovic','brozovic']
  const milan = ['Milan','ibrahimovic','tonali','bennacer','tomori','maignan','giroud','diaz','leao','calabria','kjaer','rebic','messias']
  let allTeams = [psg,manU,Spurs,city,arsenal,chelsea,liverpool,barca,real,atletico,bayern,dortmund,juve,inter,milan]
  return allTeams
}