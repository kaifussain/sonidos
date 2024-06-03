var keysContainer=document.getElementById('keysContainer');
var dynamicNotes=['C2','Db2','D2','Eb2','E2','F2','Gb2','G2','Ab2','A2','Bb2','B2','C3','Db3','D3','Eb3','E3','F3','Gb3','G3','Ab3','A3','Bb3','B3','C4','Db4','D4','Eb4','E4','F4','Gb4','G4','Ab4','A4','Bb4','B4'];
var rootNoteIndex=12;
var firstNoteIndex=12;
var layoutLength=12;
var dynamicSarega=['Sa','r','Re','g','Ga','Ma','M','Pa','d','Da','n','Ni','Sa','r','Re','g','Ga','Ma','M','Pa','d','Da','n','Ni','Sa','r','Re','g','Ga','Ma','M','Pa','d','Da','n','Ni'];
var darkNotesBtn=document.getElementById('darkNotesBtn');
var darkNotesDisabled=false;
var notesBtn_b=document.getElementsByClassName('notesBtn_b');
var changedLayout=false;
var changedScale=false;
var sound='piano';
var mydropDownRoot=document.getElementById('mydropDownRoot');
var allKeysNow=keysContainer.querySelectorAll('button'); //all keys in key container
var darkNotesMarked=false;

function playNote(s){
    var audi=new Audio(sound+"/"+s+".mp3");
    audi.play();

}

var notesBtn_w=document.getElementsByClassName('notesBtn_w');
var saregaON=false;

function changeNoteName(){
    console.log('------start of changeNoteName()-------')
    allKeysNow=keysContainer.querySelectorAll('button');
    var x=firstNoteIndex+layoutLength;
    if(!saregaON){
        console.log('chnge name')
        var j=rootNoteIndex-firstNoteIndex;
        var k=0;
        for(var i=rootNoteIndex;i<x;i++){

            allKeysNow[j].innerText=dynamicSarega[k];
            j++;
            k++;
            
        }
        
        //note root se pahle wala ka loop lgana
        j=rootNoteIndex-firstNoteIndex-1;
        k=35;
        for(var i=rootNoteIndex-1;i>=firstNoteIndex;i--){

            allKeysNow[j].innerText=dynamicSarega[k];
            j--;
            k--;
        }
        console.log('saregaOn = true');
        saregaON=true;
    }
    else{
        var j=0;
        for(var i=firstNoteIndex;i<x;i++){
            allKeysNow[j].innerText=dynamicNotes[i];
            j++;
        }
        console.log('saregaOn = false');
        saregaON=false;
    }
    console.log('--------end of changeNoteName()--------')
}


function addDarkNotes(){
    if(!darkNotesDisabled){
        var darkNotesBySc=document.querySelectorAll('.darkNotesBySc');
        darkNotesBySc.forEach((b)=>{
        b.classList.remove('disabled');
        b.classList.remove('darkNotesBySc');
        });
        darkNotesByScFn();
    }
    
    var darkNotesBySc=document.querySelectorAll('.darkNotesBySc');
    for (var i = 0; i < darkNotesBySc.length; i++) {
        if (!darkNotesDisabled) {
            darkNotesBySc[i].removeAttribute("onclick");
            darkNotesBySc[i].classList.add('disabled');
        } else {
            darkNotesBySc[i].setAttribute("onclick",  "playNote(" +"'"+darkNotesBySc[i].id+"'"+ ")");
            darkNotesBySc[i].classList.remove('disabled');
          }
    }
    if(!darkNotesDisabled){
        darkNotesBtn.innerText="Enable Enharmonic Notes";
        darkNotesDisabled=true;
    }
    else{
        darkNotesBtn.innerText="Disable Enharmonic Notes";
        darkNotesDisabled=false;
    }
    if(gameOn){startGame();}
}

function changeRoot(){
    if(saregaON){changeNoteName();}
    if(darkNotesMarked){markDarkNotes();}
    if(darkNotesDisabled){addDarkNotes();}
    var darkNotesBySc=document.querySelectorAll('.darkNotesBySc');
    darkNotesBySc.forEach((b)=>{
        b.classList.remove('darkNotesBySc');
    });
    if(darkNotesDisabled){
        var darkNotesBySc=document.querySelectorAll('.darkNotesBySc');
        darkNotesBySc.forEach((b)=>{
        b.classList.remove('disabled');
        b.classList.remove('darkNotesBySc');
        });
        addDarkNotes();
    }
    var sa=mydropDownRoot.value;
    for(var i=5;i<18;i++){
        if(sa==dynamicNotes[i]){
            rootNoteIndex=i;
            changedLayout=true;
            var x=keysContainer.querySelector('.rootNote');
            x.classList.remove('rootNote');  //root note class

            x=keysContainer.querySelector('#'+sa);
            x.classList.add('rootNote');
            
            break;
        }
    }
    darkNotesByScFn();
    console.log('----end of changeRoot()-----')
}

function darkNotesByScFn(){
    allKeysNow=keysContainer.querySelectorAll('button');
    var x=firstNoteIndex+layoutLength;
        var j=rootNoteIndex-firstNoteIndex;
        var k=0;
        for(var i=rootNoteIndex;i<x;i++){
            if(dynamicSarega[k].length==1){
                allKeysNow[j].classList.add('darkNotesBySc');
            }
            j++;
            k++;
        }
        //note root se pahle wala ka loop lgana
        j=rootNoteIndex-firstNoteIndex-1;
        k=35
        for(var i=rootNoteIndex-1;i>=firstNoteIndex;i--){
            if(dynamicSarega[k].length==1){
                allKeysNow[j].classList.add('darkNotesBySc');
                console.log(allKeysNow[j].id);
            }
            j--;
            k--;
        }
        console.log('----end of darkNotesByScFn()-----')
}
var markId=document.getElementById('markId')
function markDarkNotes(){
    var darkNotesBySc=document.querySelectorAll('.darkNotesBySc');
    darkNotesBySc.forEach((b)=>{
        b.classList.remove('markNotes');
    });
    if(!darkNotesMarked){
        darkNotesBySc.forEach((b)=>{
            b.classList.add('markNotes');
        });
        markId.innerText='Unmark';
        darkNotesMarked=true;
    }
    else{
         darkNotesBySc.forEach((b)=>{
           b.classList.remove('markNotes');
         });
         markId.innerText='Mark';
         darkNotesMarked=false;
    }
}

function setLayout(){
    if(changedLayout){
        allKeysNow=keysContainer.querySelectorAll('button');
        allKeysNow.forEach(b=>b.remove());
        var opn=mydropDownRoot.querySelectorAll('option');
        opn.forEach(b=>b.remove());
        if(rootNoteIndex<12 && layoutLength==12){
            rootNoteIndex=12;
        }
        changedLayout=false;
    }
    for(var i=firstNoteIndex;i<firstNoteIndex+layoutLength;i++){
        var key=document.createElement('button');
        if(dynamicNotes[i].length==2){
            key.classList.add('notesBtn_w');
        }
        else{  //name should be of 3 length
            key.classList.add('notesBtn_b');
        }
        if(i==rootNoteIndex){
            key.classList.add('rootNote');
        }
        key.setAttribute("onclick", "playNote(" +"'"+dynamicNotes[i]+"'"+ ")");
        key.innerText=dynamicNotes[i];
        key.id=dynamicNotes[i];
        keysContainer.appendChild(key);
        if(i>4 && i<18){
            var newOption = document.createElement("option");
            newOption.value = dynamicNotes[i];
            newOption.text = newOption.value;
            if(i==rootNoteIndex){
                newOption.selected=true;
            }
            mydropDownRoot.appendChild(newOption);
        }
    }
    if(saregaON){
        saregaON=false;
        changeNoteName();
    }
}

setLayout();
darkNotesByScFn();


function addOrSubNote(){
    if(darkNotesMarked){markDarkNotes();}
    if(darkNotesDisabled){addDarkNotes();}
    var mydropDown=document.getElementById('mydropDown');
    var wht=mydropDown.options[mydropDown.selectedIndex].value;
    changedLayout=true;
    if(wht=='2'){
        firstNoteIndex=5;
        layoutLength=24;
    }
    else if(wht=='1'){
        firstNoteIndex=12;
        layoutLength=12;
    }
    else{
        firstNoteIndex=0;
        layoutLength=36;
    }
    setLayout();
    darkNotesByScFn();
    if(gameOn){startGame();}
}
function changeSound(){
    var mydropDown=document.getElementById('mydropSound');
    var wht=mydropDown.options[mydropDown.selectedIndex].value;
    if(wht=='1'){
        sound='piano';
    }
}

//G A M E Game game
var gameOn=false;
var playNotesBtn=document.getElementById('playNotesBtn');
var playGameBtn=document.getElementById('playGameBtn');
var features=document.querySelector('.features');

var startGameBtn=document.getElementById('startGameBtn');
var allNotesPlay_small=document.getElementById('allNotesPlay_small');
var h3=document.querySelector('h3');
var theRandomNote;
var gameElm=document.getElementsByClassName("gameElm");
var resultSpan=document.getElementById('resultSpan');
var autoplayCheckbox=document.getElementById('autoplayCheckbox');
var resultDiv=document.querySelector('.resultDiv');
var correctScoreSpan=document.getElementById('correctScoreSpan');
var wrongScoreSpan=document.getElementById('wrongScoreSpan');
var scoreP=0;
var scoreM=0;

function changeMode(e){
    e.disabled=true;
    if(e.value=='pg'){
        playNotesBtn.disabled=false;
        startGameBtn.classList.remove('hideClass');
        h3.innerText="Identify the Notes";
        features.classList.add('hideClass');
        keysContainer.classList.add('hideClass');
        gameOn=true;
    }
    else{
        playGameBtn.disabled=false;
        startGameBtn.classList.add('hideClass');
        h3.innerText="Play the Notes";
        features.classList.remove('hideClass');
        keysContainer.classList.remove('hideClass');
        for (var i = 0; i < gameElm.length; i++) {
            gameElm[i].classList.add("hideClass");
        }
        resultDiv.classList.add('hideClass')
        for(var i=0;i<layoutLength;i++){
            allKeysNow[i].classList.remove('correctOption');
            allKeysNow[i].classList.remove('wrongOption');
        }
        gameOn=false;
        
    }
    
}

function startGame(){
    startGameBtn.classList.add('hideClass');
    keysContainer.classList.remove('hideClass');
    features.classList.remove('hideClass');
    for (var i = 0; i < gameElm.length; i++) {
        gameElm[i].classList.remove("hideClass");
    }
    
    startedGame();
}

function startedGame(){
    if(darkNotesDisabled){ 
        do{
            theRandomNote=Math.floor(Math.random() * (firstNoteIndex+layoutLength - firstNoteIndex )) + firstNoteIndex;
        }
        while(allKeysNow[theRandomNote-firstNoteIndex].classList.contains('darkNotesBySc'))
    }else{
        theRandomNote=Math.floor(Math.random() * (firstNoteIndex+layoutLength - firstNoteIndex )) + firstNoteIndex;
    }
    resultDiv.classList.add('hideClass');
    playNote(dynamicNotes[theRandomNote]);
    for(var i=0;i<layoutLength;i++){
        allKeysNow[i].setAttribute("onclick", "check("+i+")");allKeysNow[i].classList.remove('correctOption');
        allKeysNow[i].classList.remove('wrongOption');
    }
}


function playRoot(){
    playNote(dynamicNotes[rootNoteIndex]);
}
function playRandomNotes(){
    playNote(dynamicNotes[theRandomNote]);
}

function check(sni){ //sni: selected note index for notes now
    var j=firstNoteIndex;
    for(var i=0;i<layoutLength;i++){
        allKeysNow[i].setAttribute("onclick","playNote(" +"'"+dynamicNotes[j]+"'"+ ")");
        j++;
    }
    if(sni==theRandomNote-firstNoteIndex){
        allKeysNow[sni].classList.add('correctOption');
        scoreP++;
        correctScoreSpan.innerText=scoreP;
        if(autoplayCheckbox.checked){
            setTimeout(function() {
                console.log("After waiting");
                startedGame();
              }, 800);
        }
        else{
            var audi=new Audio("correctSound.mp3");
            audi.volume=0.2;
            audi.play();
            resultSpan.style.color='rgb(34, 238, 61)';
            resultDiv.style.border='1px solid rgb(34, 238, 61)';
            resultSpan.innerText="Correct";
            resultDiv.classList.remove('hideClass');
        }
    }
    else{
        var audi=new Audio("wrongSound.mp3");
        audi.volume=0.2;
        audi.play();
        scoreM++;
        wrongScoreSpan.innerText=scoreM;
        allKeysNow[sni].classList.add('wrongOption');
        allKeysNow[theRandomNote-firstNoteIndex].classList.add('correctOption')
        resultSpan.innerText="Wrong";
        resultSpan.style.color='red';
        resultDiv.style.border='1px solid red';
        resultDiv.classList.remove('hideClass')
    }
}