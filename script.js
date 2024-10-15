console.log("Welcome to Spotify")

//initialize
let songIndex = 0;
let audioElement = new Audio('music/2.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



let songs=[
    {songName:'Bawara Mann-JOLLY LLB',filePath:"music/2.mp3",coverPath:"covers/15.jpg"},
    {songName:'Haawa Haawa - Rockstar',filePath:"music/3.mp3",coverPath:"covers/13.jpg"},
    {songName:'Jo Bhi Main - Rockstar',filePath:"music/4.mp3",coverPath:"covers/13.jpg"},
    {songName:'Nadaan Parindey - Rockstar',filePath:"music/5.mp3",coverPath:"covers/13.jpg"},
    {songName:'Phir Se Ud Chala - Rockstar',filePath:"music/6.mp3",coverPath:"covers/13.jpg"},
    {songName:'Ishq Bulaava - Hasee Toh Phasee',filePath:"music/7.mp3",coverPath:"covers/12.jpg"},
    {songName:'Moh Moh Ke Dhaage- Dum Laga Ke Haisha',filePath:"music/8.mp3",coverPath:"covers/11.jpg"},
    {songName:'Monta Re - Lootera',filePath:"music/9.mp3",coverPath:"covers/14.jpg"},
    {songName:'Tum Tak - Raanjhanaa',filePath:"music/10.mp3",coverPath:"covers/16.jpg"},
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "music/1.mp3", coverPath: "covers/1.jpg"}
]

// audioElement.play();
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

//handel play
masterPlay.addEventListener('click', ()=>{
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
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
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
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `music/${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `music/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})