console.log("Welcome to Spotify");

//Initialize the variables
let songIndex=0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay= document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif= document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
    {songName: "I like me better", filePath: "Songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "See You Again", filePath: "Songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Memories", filePath: "Songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Scars To Your Beautiful", filePath: "Songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Dusk Till Dawn", filePath: "Songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Senorita", filePath: "Songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Stereo Hearts", filePath: "Songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "We Don't Talk Anymore", filePath: "Songs/8.mp3", coverPath: "covers/8.jpg"}
]

songItems.forEach((element, i)=>{
   element.getElementsByTagName("img")[0].src = songs[i].coverPath;
   element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play();

//Handling play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity =0;
    }
})

//Listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = ((myProgressBar.value*audioElement.duration)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
     element.addEventListener('click', (e)=>{
       makeAllPlays();
       songIndex = e.target.id;
       e.target.classList.remove('fa-play-circle');
       e.target.classList.add('fa-pause-circle');
       audioElement.src = `Songs/${songIndex}.mp3`;
       masterSongName.innerText = songs[songIndex-1].songName;
       audioElement.currentTime = 0;
       audioElement.play();
       gif.style.opacity = 1;
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');
     })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>7)
    {
        songIndex=1;
    }
    else
    {
        songIndex+=1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<2)
    {
        songIndex=8;
    }
    else
    {
        songIndex-=1;
    }
    audioElement.src = `Songs/${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})