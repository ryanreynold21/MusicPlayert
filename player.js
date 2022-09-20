const playlistContainerTag = document.getElementsByClassName("playlistContainer")[0];
const audioTag             = document.getElementsByClassName("audioTag")[0];
const curentAndTotalTime   = document.getElementsByClassName("curentAndTotalTime")[0];
const currentProgressTag   = document.getElementById("currentProgress")
const playButtonTag        = document.getElementsByClassName("playButton")[0]
const pauseButtonTag       = document.getElementsByClassName("pauseButton")[0]
const previousButtonTag    = document.getElementsByClassName("previousButton")[0]
const nextButtonTag        = document.getElementsByClassName("nextButton")[0]


let tracks = [
    { trackID:"./dsn.mp3",   title: "Don't start now_-_Dua lipa" },
    { trackID:"./kiss.mp3",  title: "One kiss _-_ kelvin.ft.Dua lipa" },
    { trackID:"./lev.mp3",   title: "Levtating _-_ Dua lipa ft.Dababy" },
    { trackID:"./new.mp3",   title: "New Rules _-_ Dua lipa" },
    { trackID:"./light.mp3", title: "Light Switch _-_ Charlie Puth"}
]

for (let i=0; i<tracks.length; i++){
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click", () => {
        currentPlayingIndex = i;
        playSong()
    })
    trackTag.classList.add("trackItem")
    const title = (i + 1).toString() +". "+ tracks[i].title; // 1. title---
    trackTag.textContent = title;
    playlistContainerTag.append(trackTag)
    
};

//for totalsec
let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata",() => {
    duration = Math.floor(audioTag.duration) ; //222.3234 = 222
    durationText = creatMinAndSec(duration) 
})

//for updatesec
audioTag.addEventListener("timeupdate",() => {
    const currentTime = Math.floor(audioTag.currentTime) ; //222.3234 = 222
    const currentTimeText = creatMinAndSec(currentTime)
    const totalMinandSec =  currentTimeText + " / " + durationText
    curentAndTotalTime.textContent =  totalMinandSec
    updateCurrentProgress(currentTime)
})

const updateCurrentProgress = (currentTime) =>{
    const currentProgressWidth = (500/duration) * currentTime  //(500-bar-width/totalSec) * updateSec
    currentProgressTag.style.width = currentProgressWidth.toString() +"px" //00px
}

let creatMinAndSec = (totalSecond) => {
    const minute = Math.floor(totalSecond/60);
    const second = totalSecond % 60;

    const minuteText = minute < 10 ? "0"+minute.toString() : minute;
    const secondText = second < 10 ? "0"+second.toString() : second;
    return minuteText + ":" + secondText;
}

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
    isPlaying = true;
    const currenttime = Math.floor(audioTag.currentTime);
    if (currenttime ===0){
        const songtoPlay = tracks[currentPlayingIndex].trackID;
        audioTag.src = songtoPlay;
        audioTag.play(); 
    }else {
        audioTag.play() //autoplay
    }
    updatePandPbutton();
   
})

pauseButtonTag.addEventListener("click", () => {
    isPlaying = false;
    audioTag.pause(); //pause
    updatePandPbutton();
})

previousButtonTag.addEventListener("click",()=>{
    if(currentPlayingIndex === 0){
        return;
    }
    currentPlayingIndex -= 1
    playSong();
    })
    
nextButtonTag.addEventListener("click",()=>{
        if(currentPlayingIndex === tracks.length-1){
            return;
        }
        currentPlayingIndex += 1;
        playSong();
    });

    const playSong = () => {
        const songtoPlay = tracks[currentPlayingIndex].trackID;
        audioTag.src = songtoPlay;
        audioTag.play()
        isPlaying = true;
        updatePandPbutton()
        
    }

const updatePandPbutton= () => {
    if(isPlaying){
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
    }else {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
    }
}

