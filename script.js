window.onload = function() {
   musicPlay()
   updateTime()
}

let currentTime = document.querySelector(".current-time");
let duration = document.querySelector(".duration");
// Objeto com todos as informações da musica

let audio = document.getElementById("toPlay");
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


let imageBack  = document.getElementById("demo");
let songToday_artist = document.querySelector(".songArtistToday");
let songToday = document.querySelector(".songToday");

let currentSongIndex = 0; 

// Direção das musicas

function musicPlay(direction) {
  let musicaEscolhida;
  let keys = Object.keys(audio.musicToPlay); 
  let numSongs = keys.length; 
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
  
// Mostrar as informações da musica e o play

  let currentSongKey = keys[currentSongIndex]; 
  musicaEscolhida = audio.musicToPlay[currentSongKey];
  imageBack.innerHTML = '<img src="' + audio.musicToPlay[currentSongKey].imageBack + '">';
  songToday.innerHTML = audio.musicToPlay[currentSongKey].nameSong;
  songToday_artist.innerHTML = audio.musicToPlay[currentSongKey].nameArtist;
  audio.src = musicaEscolhida.song;
  audio.play();
  
}

// Adicionar o button

let nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", function() {
  musicPlay("next");
});

let prevButton = document.getElementById("prevButton");
prevButton.addEventListener("click", function() {
  musicPlay("prev"); 
});


//--------------------------------------------------------------------------------------------

//---------------------------------------------------------------

// Barra de progresso

let progressBar = document.querySelector("#barra_progress");

let calculateValue = () => {
  return 0.5;

}
let value = calculateValue();

  if (isFinite(value) && !isNaN(value) && value >= 0 && value <= 1) {
    progressBar.value = value;
  } else {
    progressBar.value = 0;
  }

calculateValue();


progressBar.addEventListener("click", function(event) {
  let newTime = event.offsetX / this.offsetWidth * audio.duration;
  audio.currentTime = newTime;
});


//---------------------------------------------------------------------

// Atualiza a barra de progresso

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

// contagem do tempo de cada musica

function toMinutesAndSeconds(time) {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}


// Atualizar o tempo
function updateTime() {
  currentTime.textContent = toMinutesAndSeconds(audio.currentTime);
  duration.textContent = toMinutesAndSeconds(audio.duration);
}

// Mostrar o progresso e tempo da musica

audio.addEventListener("timeupdate", function() {
  updateProgress();
  updateTime();
});

let currentTimeValue = 0;
let playPause = document.getElementById("buttonPause");
let playButton = document.getElementById("buttonPlay");

// Função pra pausar musica

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

   


