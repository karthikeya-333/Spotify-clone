
let playlist = document.querySelector("h1").innerText;
let songIndex = 0;
let audioElement = new Audio("songs/" + playlist + "/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songitem"));
let playingSong = document.getElementById("playingSong");
var x=[];
var songitemsContainers = document.getElementsByClassName("songitem");
var songsNo = songitemsContainers.length;
//console.log(songsNo);
playingSong.innerText= document.getElementsByClassName("songName")[0].innerText;
var y = 0;

//console.log(playlist);

function setAll(a, v) {
    var i, n = a.length;
    for (i = 0; i < n; ++i) {
        a[i] = v;
    }
}

function makeAllPlays(){
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
  });

}

masterPlay.addEventListener("click",function(){
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    if(y===0){
    document.getElementById("1").classList.remove("fa-play-circle");
    document.getElementById("1").classList.add("fa-pause-circle");
    songIndex=1;
    y=1;
    }
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
     document.getElementById(songIndex).classList.remove("fa-play-circle");
     document.getElementById(songIndex).classList.add("fa-pause-circle");
    gif.style.opacity=1;
  }
  else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
     // document.getElementsById(songIndex).classList.remove("fa-pause-circle");
     // document.getElementsById(songIndex).classList.add("fa-play-circle");
    gif.style.opacity=0;
    makeAllPlays();
  }
});


audioElement.addEventListener("timeupdate",function(){
  //console.log("hehe");
  var progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
  myprogressbar.value = progress;

});

myprogressbar.addEventListener("change",function(){
  audioElement.currentTime = myprogressbar.value * audioElement.duration/100;
});



Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
  element.addEventListener("click",function(){
    if(x[i]!=1){
      y=1;
      setAll(x,0);
      x[i]=1;
      songIndex = parseInt(element.id);
      makeAllPlays();
      element.classList.remove("fa-play-circle");
      element.classList.add("fa-pause-circle");
      audioElement.src ="songs/" + playlist  + "/" + songIndex + ".mp3";
      audioElement.currentTime = 0;
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
      playingSong.innerText = document.getElementsByClassName("songName")[i].innerText;
      gif.style.opacity =1;
    }
    else{
      audioElement.pause();
      x[i] = 0;
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
      gif.style.opacity =0;
    }
  })
});

document.getElementById("previous").addEventListener("click",function(){
  if(songIndex<2){
    songIndex = songsNo;
  }
  else{
    songIndex--;
  }
  audioElement.src ="songs/" + playlist + "/" + songIndex + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  playingSong.innerText = document.getElementsByClassName("songName")[songIndex-1].innerText;
  gif.style.opacity =1;
});


document.getElementById("next").addEventListener("click",function(){
  if(songIndex>songsNo-1){
    songIndex = 1;
  }
  else{
    songIndex++;
  }
  audioElement.src ="songs/" + playlist  + "/" + songIndex + ".mp3";
  audioElement.currentTime = 0;
  audioElement.play();
  makeAllPlays();
  document.getElementById(songIndex).classList.remove("fa-play-circle");
  document.getElementById(songIndex).classList.add("fa-pause-circle");
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
  playingSong.innerText = document.getElementsByClassName("songName")[songIndex-1].innerText;
  gif.style.opacity =1;
});
