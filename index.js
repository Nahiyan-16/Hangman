let first = document.getElementById("first")
let second = document.getElementById("second")
let third = document.getElementById("third")
let play_btn = document.getElementById("play-btn")
let head = document.getElementById("head_text")
let letter_box = document.getElementById("letters_container")
let emptySpace = document.getElementById("emptySpaces")
let emptyLetter = document.getElementById("emptyLetter")
let livesLeft = document.getElementById("lives")

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
let subject =''
let word = ''
let lives = 6
letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let letterAry = []
let wAry = [] 
const psg = ['PSG','messi','mbappe','neymar','verratti','hakimi','ramos','marquinhos','donnarumma','mendes','kimpembe','vitinha','sanches','navas']
const manU = ['United','cristiano','maguire','varane','martinez','casemiro','anthony','fernandes','rashford','degea','shaw','martial','mctominay']
const spurs =['Tottenham','kane','son','lloris','richarlison','dier','sanchez','moura','lenget','romero','emerson','perisic','winks']
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


const allTeams = [psg,manU,spurs,city,arsenal,chelsea,liverpool,barca,real,atletico,bayern,dortmund,juve,inter,milan]

generateWord()
displayLives()

for(let i= 0; i < letters.length; i++){
  letter_box.innerHTML +=`<button class="letter-btn" id="${letters[i]}" 
  onclick='letterClicked("${letters[i]}")'>${letters[i]}`
}

function letterClicked(x){
  if(lives > 0){
  let obj = document.getElementById(x)
    if(letters.includes(x)){
      obj.style.background = 'rgb(124, 153, 62)'
      letters.splice(letters.indexOf(x), 1)
      checkLetter(x)
      }
  displayLives()
  }
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
    lives = 0
    clearInterval()
  }
  else if(lives == 0){
    livesLeft.innerHTML = `You lost`
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
  if(wAry.includes(x)){
    let pos = getLetterPos(x)
    emptyLetter.innerHTML = `${subject[0]}: `
    let count = 0
    for(let i = 0 ; i < wAry.length; i++){
      if(i == pos[count]){
        letterAry[pos[count]] = x
        emptyLetter.innerHTML += x + " "
        count ++
      }
      else{
        emptyLetter.innerHTML += `${letterAry[i]} `
      }
    }
    wAry.splice(index, 1)
    livesLeft.innerHTML += wAry
  }
  else{
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
    if(letterAry[i] === "_"){
      win = false
    }
  }
  return win
}
