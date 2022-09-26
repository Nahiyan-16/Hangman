let first = document.getElementById("first")
let second = document.getElementById("second")
let third = document.getElementById("third")
let play_btn = document.getElementById("play-btn")
let head = document.getElementById("head_text")
let letter_box = document.getElementById("letters_container")
let emptySpace = document.getElementById("emptySpaces")
let emptyLetter = document.getElementById("emptyLetter")
let livesLeft = document.getElementById("lives")
const next = document.getElementById("next-btn")
const reset = document.getElementById("reset-btn")

let opacity = []
let orderTitle = [first, second, third, play_btn]
let orderGame = [head,letter_box,emptySpace]
let time = 0
let timeOut = 0
let score = 0
let hiScore = 0

next.disabled = true

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
GAME JAVASCRIPT
*/
let subject =''
let word = ''
let lives = 6
let letters = getLetters()
let letterAry = []
let wAry = [] 
const psg = ['PSG','messi','mbappe','neymar','verratti','hakimi','ramos','marquinhos','donnarumma','mendes','kimpembe','vitinha','sanches','navas']
const manU = ['United','cristiano','maguire','varane','martinez','casemiro','anthony','fernandes','rashford','degea','shaw','martial','mctominay']
const Spurs =['Tottenham','kane','son','lloris','richarlison','dier','sanchez','moura','lenget','romero','emerson','perisic','winks']
const city = ['City','haaland','hilva','debruyne','alvarez','ederson','rodri','walker','cancelo','foden','mahrez','grealish','ake','dias','stones']
const arsenal = ['Arsenal','saka','martinelli','jesus','ramsdale','odegaard','saliba','partey','xhaka','white','holding','rowe','elneny','nketiah']
const chelsea = ['Chelsea','mount','silva','mendy','koulibaly','kante','chilwell','kovacic','azpilicueta','pulisic','havertz','jorginho','sterling']
const liverpool = ['Liverpool','salah','firmino','nunez','jota','diaz','fabinho','thiago','alisson','virgil','trent','robertson','matip','gomez']
const barca = ["Barcelona",'fati','pedri','gavi','busquets','lewandowski','araujo','alba','terstegen','dejong','kessie','depay','dembele','kounde','raphinha']
const real = ['Real madrid','benzema','vinicius','rodrygo','courtois','modric','kroos','camavinga','mendy','hazard','rudiger','alaba','militao','valverde']
const atletico = ['Atletico','felix','gimenez','koke','saul','oblak','griezman','savic','correa','llorente','carrasco','depaul','lemar','morata']
const bayern = ['Bayern','mane','sane','hernandez','deligt','kimmich','goretzka','neuer','upamecano','gnabry','davies','musiala','coman','sabitzer']
const dortmund = ['Dortmund','reus','reyna','bellingham','humels','brandt','can','hazard','sule','guerreiro']
const juve = ['Juventus','dimaria','kean','vlahovic','bonucci','cuadrado','rabiot','milik','paredes','mckennie','chiesa','danilo','pogba','sandro']
const inter = ['Inter','lakaku','martinez','barella','skriniar','onana','dzeko','calhanoglu','handnovic','brozovic']
const milan = ['Milan','ibrahimovic','tonali','bennacer','tomori','maignan','giroud','diaz','leao','calabria','kjaer','rebic','messias']


const allTeams = [psg,manU,Spurs,city,arsenal,chelsea,liverpool,barca,real,atletico,bayern,dortmund,juve,inter,milan]

generateLetters()
generateWord()
checkHiScore()

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

function generateWord(){
  subject = allTeams[Math.floor(Math.random() * allTeams.length)]
  emptyLetter.innerHTML += `${subject[0]}: `
  word = subject[Math.floor(Math.random() * subject.length) + 1]
  wAry = word.split("")
  for(let i = 0; i < word.length; i++){
    letterAry[i] = '_'
    emptyLetter.innerHTML += `${letterAry[i]} `
  }
}

function displayLives(){
  if(checkWinner()){
    livesLeft.innerHTML = `You Win!`
    score += 1
    displayScore()
    next.disabled = false
    lives = 0
    checkHiScore()
  }
  else if(lives == 0){
    livesLeft.innerHTML = `You lost`
    score = 0
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
        obj.style.background = 'rgb(101, 255, 119)'
        emptyLetter.innerHTML += `${letterAry[i]} `
      }
    }
    wAry.splice(index, 1)
    livesLeft.innerHTML += wAry
  }
  else{
    obj.style.background = 'rgb(249, 127, 97)'
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

next.addEventListener('click', function(){
  resetNext(1)
})

reset.addEventListener('click',function(){
  resetNext(2)
})

function resetNext(num){
  if(num === 2){
    score = 0
  }
  fadeOutGame()
  subject =''
  word = ''
  lives = 6
  letters = getLetters()
  letterAry = []
  wAry = [] 
  next.disabled = true
  setTimeout(function(){
    emptyLetter.innerHTML = ""
    letter_box.innerHTML = ""
    generateLetters()
    generateWord()
    displayLives()
    checkHiScore()
    displayScore()
  },3000)
  setTimeout(fadeInGame, 2500)
  setTimeout(function(){
    next.disabled = false
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 2f77a94a81e2ce958217b9aadd80aa0eb0c5825f
