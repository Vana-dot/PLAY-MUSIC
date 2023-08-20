window.onload = function() {
   musicPlay()
   updateTime()
}

var audio = document.getElementById("toPlay");
audio.musicToPlay = {
    music_one:{
        nameArtist:"Justin bieber",
        nameSong:"Peaches",
        imageBack:"./assets/imgs/JB.jpg",
        song:"./assets/music/musicOne.mp3",
    },
    music_two:{
        nameArtist:"Joji",
        nameSong:"Die for you",
        imageBack:"./assets/imgs/JOJI.jpeg",
        song:"./assets/music/musicaTwo.mp3",
    },
    music_tree:{
        nameArtist:"Kankaku Piero",
        nameSong:"Harukamirai",
        imageBack: "./assets/imgs/Kankaku.jpeg",
        song:"./assets/music/musicTree.mp3",
    },
    music_four:{
        nameArtist:"Rebeldes",
        nameSong:"Sálvame",
        imageBack: "./assets/imgs/RBD.jpeg",
        song:"./assets/music/musicaFour.mp3",
    },
}


var imageBack  = document.getElementById("demo");
var songToday_artist = document.querySelector(".songArtistToday");
var songToday = document.querySelector(".songToday");

var currentSongIndex = 0; 

function musicPlay(direction) {
  var musicaEscolhida;
  var keys = Object.keys(audio.musicToPlay); 
  var numSongs = keys.length; 
  switch (direction) {
    case "next":
      currentSongIndex = (currentSongIndex + 1) % numSongs;
      break;
    case "prev":
      currentSongIndex = (currentSongIndex + numSongs - 1) % numSongs; 
      break;
    default:

      break;
  }
  
  var currentSongKey = keys[currentSongIndex]; 
  musicaEscolhida = audio.musicToPlay[currentSongKey];
  imageBack.innerHTML = '<img src="' + audio.musicToPlay[currentSongKey].imageBack + '">';
  songToday.innerHTML = audio.musicToPlay[currentSongKey].nameSong;
  songToday_artist.innerHTML = audio.musicToPlay[currentSongKey].nameArtist;
  audio.src = musicaEscolhida.song;
  audio.play();
  
}

var nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", function() {
  musicPlay("next");
});

var prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", function() {
  musicPlay("prev"); 
});


//--------------------------------------------------------------------------------------------

//---------------------------------------------------------------

var progressBar = document.querySelector("#barra_progress");

var calculateValue = () => {
  return 0.5;

}
var value = calculateValue();

  if (isFinite(value) && !isNaN(value) && value >= 0 && value <= 1) {
    progressBar.value = value;
  } else {
    progressBar.value = 0;
  }

calculateValue();


progressBar.addEventListener("click", function(event) {
  var newTime = event.offsetX / this.offsetWidth * audio.duration;
  audio.currentTime = newTime;
});


//---------------------------------------------------------------------

function updateProgress() {
  if (!audio.paused && audio.duration > 0) {
    progressBar.value =  audio.currentTime / audio.duration;
  }
  if (progressBar.value === 1) {
    audio.play();
  }
}

audio.addEventListener("canplaythrough", function() {
  updateProgress();
  updateTime();
});


function toMinutesAndSeconds(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}



var currentTime = document.querySelector(".current-time");
var duration = document.querySelector(".duration");


function updateTime() {
  currentTime.textContent = toMinutesAndSeconds(audio.currentTime);
  duration.textContent = toMinutesAndSeconds(audio.duration);
}


audio.addEventListener("timeupdate", function() {
  updateProgress();
  updateTime();
});

var currentTimeValue = 0;
var playPause = document.getElementById("buttonPause");
var playButton = document.getElementById("buttonPlay");

function musicPause() {
  if(audio.paused) {
   audio.play();
   playButton.classList.remove('ph-play-fill');
   playButton.classList.add('ph-pause-fill');
  }else{
    audio.pause();
    playButton.classList.remove('ph-pause-fill');
    playButton.classList.add('ph-play-fill');
   }
}

playButton.addEventListener("click", function() {
  musicPause();
});

   


