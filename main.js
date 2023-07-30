var [wins, losses, abortions] = [0, 0, 0];
var gameInProcess, answer, maskedAnswer, wrongGuesses;
const masthead = document.getElementById("masthead");
//top 1000 common English words excluding four-letter-or-less ones
const commonWords =["about","absolute","accept","account","achieve","across","active","actual","address","admit","advertise","affect","afford","after","afternoon","again","against","agent","agree","allow","almost","along","already","alright","although","always","america","amount","another","answer","apart","apparent","appear","apply","appoint","approach","appropriate","argue","around","arrange","associate","assume","attend","authority","available","aware","awful","balance","basis","beauty","because","become","before","begin","behind","believe","benefit","between","birth","black","bloke","blood","board","bother","bottle","bottom","break","brief","brilliant","bring","britain","brother","budget","build","business","carry","catch","cause","centre","certain","chair","chairman","chance","change","character","charge","cheap","check","child","choice","choose","christ","christmas","church","claim","class","clean","clear","client","clock","close","closes","clothe","coffee","colleague","collect","college","colour","comment","commit","committee","common","community","company","compare","complete","compute","concern","condition","confer","consider","consult","contact","continue","contract","control","converse","corner","correct","could","council","count","country","county","couple","course","court","cover","create","cross","current","danger","debate","decide","decision","definite","degree","department","depend","describe","design","detail","develop","difference","difficult","dinner","direct","discuss","district","divide","doctor","document","double","doubt","dress","drink","drive","during","early","economy","educate","effect","eight","either","elect","electric","eleven","employ","encourage","engine","english","enjoy","enough","enter","environment","equal","especial","europe","evening","every","evidence","exact","example","except","excuse","exercise","exist","expect","expense","experience","explain","express","extra","family","father","favour","field","fight","figure","final","finance","finish","first","floor","follow","force","forget","fortune","forward","france","friday","friend","front","function","further","future","garden","general","germany","glass","goodbye","govern","grand","grant","great","green","ground","group","guess","happen","happy","health","heart","heavy","history","holiday","honest","horse","hospital","house","however","hullo","hundred","husband","identify","imagine","important","improve","include","income","increase","indeed","individual","industry","inform","inside","instead","insure","interest","introduce","invest","involve","issue","jesus","judge","kitchen","knock","labour","language","large","laugh","learn","leave","letter","level","light","likely","limit","listen","little","local","london","lunch","machine","major","manage","market","marry","match","matter","maybe","meaning","measure","member","mention","middle","might","million","minister","minus","minute","mister","moment","monday","money","month","morning","mother","motion","music","nation","nature","necessary","never","night","normal","north","notice","number","obvious","occasion","offer","office","often","operate","opportunity","oppose","order","organize","original","other","otherwise","ought","paint","paper","paragraph","pardon","parent","particular","party","pence","pension","people","percent","perfect","perhaps","period","person","photograph","picture","piece","place","please","point","police","policy","politic","position","positive","possible","pound","power","practise","prepare","present","press","pressure","presume","pretty","previous","price","print","private","probable","problem","proceed","process","produce","product","programme","project","proper","propose","protect","provide","public","purpose","quality","quarter","question","quick","quiet","quite","radio","raise","range","rather","ready","realise","really","reason","receive","recent","reckon","recognize","recommend","record","reduce","refer","regard","region","relation","remember","report","represent","require","research","resource","respect","responsible","result","return","right","round","saturday","scheme","school","science","score","scotland","second","secretary","section","secure","sense","separate","serious","serve","service","settle","seven","shall","share","sheet","shoot","short","should","similar","simple","since","single","sister","situate","sleep","slight","small","smoke","social","society","sorry","sound","south","space","speak","special","specific","speed","spell","spend","square","staff","stage","stairs","stand","standard","start","state","station","stick","still","story","straight","strategy","street","strike","strong","structure","student","study","stuff","stupid","subject","succeed","sudden","suggest","summer","sunday","supply","support","suppose","surprise","switch","system","table","teach","telephone","television","terrible","thank","there","therefore","thing","think","thirteen","thirty","though","thousand","three","through","throw","thursday","today","together","tomorrow","tonight","total","touch","toward","trade","traffic","train","transport","travel","treat","trouble","trust","tuesday","twelve","twenty","under","understand","union","unite","university","unless","until","usual","value","various","video","village","visit","waste","watch","water","wednesday","weigh","welcome","where","whether","which","while","white","whole","window","within","without","woman","wonder","world","worry","worse","worth","would","write","wrong","yesterday","young"]
hideAll("#tally span");
document.querySelector("#new-game").addEventListener("click", newGame);

/* Morse code logic*/
let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
unlockAudioContext(audioCtx);
let masterVolume = audioCtx.createGain();
masterVolume.gain.setValueAtTime(0.05, audioCtx.currentTime);
masterVolume.connect(audioCtx.destination);
let freq = 1100;
let type = "square";

let interval = 30;
let long = 400;
let short = 200;
let playing = false;

let handleBeep = e => {
  if(!playing){
  playing = true;
  let morse = morseCode[e.srcElement.innerText];
  let pattern = morseToArray(morse);
  navigator.vibrate(pattern);
  playPattern(pattern);
    let totalTime = pattern.reduce((accumulator, currentValue) => {return accumulator + currentValue});
    setTimeout(()=>{playing=false;},totalTime);
};
}

let morseToArray = sequence => {
  let vibrations = [];
  sequence.split("").forEach(n => {
    vibrations.push(n === "·" ? short : long);
    vibrations.push(interval);
  });
  return vibrations;
};

let playPattern = pattern => {
  let oscillator = audioCtx.createOscillator();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
  let elapsed = 0;
  pattern.forEach((dur, i) => {
    elapsed += dur / 1000;
    oscillator.frequency.setValueAtTime(
      i % 2 == 0 ? 0 : freq,
      audioCtx.currentTime + elapsed
    );
  });
  oscillator.connect(masterVolume);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + elapsed);
};
  
document.querySelectorAll(".letter").forEach(letter => {
  letter.addEventListener("click", handleBeep);
});

let morseCode = {
  A: "·−",
  B: "−···",
  C: "−·−·",
  D: "−··",
  E: "·",
  F: "··−·",
  G: "−−·",
  H: "····",
  I: "··",
  J: "·−−−",
  K: "−·−",
  L: "·−··",
  M: "−−",
  N: "−·",
  O: "−−−",
  P: "·−−·",
  Q: "−−·−",
  R: "·−·",
  S: "···",
  T: "−",
  U: "··−",
  V: "···−",
  W: "·−−",
  X: "−··−",
  Y: "−·−−",
  Z: "−−··",
  1: "−·−−",
  2: "−·−−",
  3: "−·−−",
  4: "−·−−",
  5: "−·−−",
  6: "−·−−",
  7: "−·−−",
  8: "−·−−",
  9: "−·−−",
  0: "−·−−",
  "#":"··−·",
  "$":"---",
  "&":"−·−·",
  "!":"··−",
  "@":"···",
};
/*morse code logic */

// new logic 
  let start_= document.getElementById("start")
  start_.addEventListener("click", goBoard)

  function goBoard(){ 
  home_=document.getElementById("home");
  board_=document.getElementById("board");
  home_.classList.add("slide-left");
  board_.classList.remove("hide");

  }
  function unlockAudioContext(audioCtx) {
    if (audioCtx.state !== 'suspended') return;
    const b = document.body;
    const events = ['touchstart','touchend', 'mousedown','keydown'];
    events.forEach(e => b.addEventListener(e, unlock, false));
    function unlock() { audioCtx.resume().then(clean); }
    function clean() { events.forEach(e => b.removeEventListener(e, unlock)); }
  }
//


function newGame() {
if (gameInProcess) 
  aborted();
gameInProcess = true; //game starts
masthead.innerText = "DECIPHER  THE  CODE";
masthead.setAttribute("status", "normal"); //no color
answer = newRandomWord();
console.log("Hey you're cheating! " + 'Close the console! The answer is "' + answer + '"'); // show answer in the console
wrongGuesses = 0;
resetKeypad();
ButtonDisplay();
setHint();
maskedAnswer = []; //maskedAnswer is the mixture of letters and underscores
for (var {} of answer)
  maskedAnswer.push("_");
updateDisplayWord(); //display the maskedAnswer
hang(); //draw graph
}



const video = document.getElementById("myVideo");
const playPauseButton = document.getElementById("play-pause-btn");
const volumeControl = document.getElementById("volume-control");
const progressBar = document.getElementById("progress-bar");

function setHint() {
let aux = answer.split("");
let list = document.getElementById("hint");
list.innerHTML=""; 
aux.map(ele=>{
    let li =document.createElement('li');
    let a = document.createElement('a');
    let l = document.createTextNode(ele.toUpperCase());
    a.classList.add("letter");
    a.classList.add("prevent-select");
    a.appendChild(l);
    a.addEventListener("click",(ele)=>{handleHint(ele)})
    li.appendChild(a);
    list.appendChild(li);
}) 
}

function handleHint(val){ 
  handleBeep(val);
}




// playPauseButton.addEventListener("click", togglePlayPause);
// volumeControl.addEventListener("input", updateVolume);
// video.addEventListener("timeupdate", updateProgressBar);
// progressBar.addEventListener("click", seek);


function newRandomWord() {
return commonWords[Math.floor(Math.random() * commonWords.length)];
}

function verifyGuess() { //the onclick event
var guessedLetter = this.innerText.toLowerCase();
//when it's a match:
if (answer.toLowerCase().includes(guessedLetter)) {
  //update the displayed word
  for (var i in maskedAnswer) {
    if (answer[i] == guessedLetter)
      maskedAnswer[i] = answer[i];
  }
  updateDisplayWord();
  if (maskedAnswer.includes("_") == false)  //won
    escaped();
  //change color and make the mouse no-drop
  this.classList.toggle("correct-letter", true);
  this.removeEventListener("click", verifyGuess);
} else {
  //when it's not a match:
  this.classList.toggle("incorrect-letter", true); //change color and make the mouse no-drop
  this.removeEventListener("click", verifyGuess);
  wrongGuesses++;
  hang();
}
}

function updateDisplayWord() {
var display = "";

for (var i of maskedAnswer) 

display += i + " ";
display.slice(0, -1);

document.querySelector("#guessing").textContent = display;
document.querySelector("#guessing").svgContent = display;
}

function aborted() { //add 1 to the tally Abortions
abortions++;
document.querySelector("#abortions").innerText = abortions;
unhideAll(".abortions");
}

function hang() { //draw the hangman
switch (wrongGuesses) {
  case 0:
    hideAll("svg *");
    break;
  case 1:
    unhideAll(".gallows");
    break;
  case 2:
    unhide("#head");
    break;
  case 3:
    unhide("#body");
    break;
  case 4:
    unhide("#left-arm");
    break;
  case 5:
    unhide("#right-arm");
    break;
  case 6:
    unhide("#left-leg");
    break;
  case 7:
    unhide("#right-leg");
    hanged();
    break;
  default:
    newGame();
}
}


function hanged() { //lost
gameInProcess = false;
masthead.innerText = "You are hanged!";
masthead.setAttribute("status", "hanged");
losses++;
removeAllListeners();
unhideAll(".losses");
document.querySelector("#losses").innerText = losses;
// show correct answer
var display = "";
for (var i of answer)
  display += i + " ";
display.slice(0, -1);
document.querySelector("#guessing").textContent = display;
}

function escaped() { //won
gameInProcess = false;
masthead.innerText = "Shhh...don't tell anyone!";
masthead.setAttribute("status", "escaped");
wins++;
removeAllListeners();
unhideAll(".wins");
document.querySelector("#wins").innerText = wins;
}

function removeAllListeners() { //prevent user from continue clicking after game's over
for (let i of document.querySelectorAll("#keypad a")) {
  i.removeEventListener("click", verifyGuess);
  i.classList.toggle("finished", true);
}
}

function ButtonDisplay() {
    for (var i of document.querySelectorAll("#ButtonFinal div")) //clear the keypad
      i.innerText = true;
    }

function resetKeypad() {
for (var i of document.querySelectorAll("#keypad div")) //clear the keypad
  i.innerText = "";
populateRow(1, "1234567890");
populateRow(2, "QWERTYUIOP");
populateRow(3, "ASDFGHJKL");
populateRow(4, "ZXCVBNM");
}

function populateRow(rowNumber, rowLetters) { //draw the keyboard and attach listeners
for (let i of rowLetters) {
  let key = document.createElement("a");
  key.id = i.toLowerCase();
  key.append(i);
  key.addEventListener("click", verifyGuess);
  document.querySelector("#keypad--row" + rowNumber).append(key);
}
}

function unhide(targetElement) {
document.querySelector(targetElement).classList.toggle("hidden", false);
}

function hideAll(targetElements) {
for (let i of document.querySelectorAll(targetElements))
  i.classList.toggle("hidden", true);
}

function unhideAll(targetElements) {
for (let i of document.querySelectorAll(targetElements))
  i.classList.toggle("hidden", false);
}
