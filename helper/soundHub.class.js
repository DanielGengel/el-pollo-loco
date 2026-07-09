export class SoundHub {
    // // Audiodateien für piano, guitar, drums
    // static piano = new Audio('./assets/sounds/piano.mp3');
    // static guitar = new Audio('./assets/sounds/guitar.mp3');
    // static drums = new Audio('./assets/sounds/drums.mp3');

    // // Array, das alle definierten Audio-Dateien enthält
    // static allSounds = [SoundHub.piano, SoundHub.guitar, SoundHub.drums];

    // Audiofiles
    // Background

    static backgroundMusic = new Audio("./assets/sounds/chickenDance.mp3");

    // Character
    static characterDamage = new Audio("./assets/sounds/character/characterDamage.mp3");
    static characterDead = new Audio("./assets/sounds/character/characterDead.wav");
    static characterJump = new Audio("./assets/sounds/character/characterJump.wav");
    static characterRun = new Audio("./assets/sounds/character/characterRun.mp3");
    static characterSnoring = new Audio("./assets/sounds/character/characterSnoring.mp3");

    // Chicken
    static chickenDead = new Audio("./assets/sounds/chicken/chickenDead.mp3");
    static chickenDead2 = new Audio("./assets/sounds/chicken/chickenDead2.mp3");

    // Collectibles
    static bottleCollectSound = new Audio("./assets/sounds/collectibles/bottleCollectSound.wav");
    static collectSound = new Audio("./assets/sounds/collectibles/collectSound.wav");

    // Endboss
    static endbossApproach = new Audio("./assets/sounds/endboss/endbossApproach.wav");

    // Game
    static gameStart = new Audio("./assets/sounds/game/gameStart.mp3");

    // Throwable
    static bottleBreak = new Audio("./assets/sounds/throwable/bottleBreak.mp3");

    // Array
    static allSounds = [
        SoundHub.backgroundMusic,

        SoundHub.characterDamage,
        SoundHub.characterDead,
        SoundHub.characterJump,
        SoundHub.characterRun,
        SoundHub.characterSnoring,

        SoundHub.chickenDead,
        SoundHub.chickenDead2,

        SoundHub.bottleCollectSound,
        SoundHub.collectSound,

        SoundHub.endbossApproach,

        SoundHub.gameStart,

        SoundHub.bottleBreak,
    ];

    static masterVolume = 0.2;
    static backgroundVolumeFactor = 0.3;

    static setVolume(volume) {
        this.masterVolume = volume;

        this.allSounds.forEach((sound) => {
            sound.volume = volume;
        });
        // Background music is always quieter
        this.backgroundMusic.volume = volume * this.backgroundVolumeFactor;
        localStorage.setItem("masterVolume", volume);
    }

    static loadVolume() {
        const saved = localStorage.getItem("masterVolume");

        if (saved !== null) {
            this.setVolume(Number(saved));
        }
    }

    // // Spielt eine einzelne Audiodatei ab
    // static playOne(sound) {  // instrumentId nur wichtig für die Visualisierung

    //     console.log("play", sound);
    //     if (!sound.paused) return;

    //     sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
    //     sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
    //     sound.play();  // Spielt das übergebene Sound-Objekt ab
    //     // const instrumentImg = document.getElementById(instrumentId);  // nur wichtig für die Visualisierung
    //     // instrumentImg.classList.add('active');  // nur wichtig für die Visualisierung
    // }

    static playOne(sound) {
        if (!sound.paused) return;

        sound.currentTime = 0;
        sound.volume = this.masterVolume;
        sound.play();
    }

    static playLoop(sound) {

    sound.loop = true;

    if (sound === this.backgroundMusic) {
        sound.volume = this.masterVolume * this.backgroundVolumeFactor;
    } else {
        sound.volume = this.masterVolume;
    }

    sound.play().catch(error => {
    console.warn("Could not play sound:", error);
});
}

    // Pausiert das Abspielen aller Audiodateien
    static pauseAll() {
        SoundHub.allSounds.forEach((sound) => {
            sound.pause(); // Pausiert jedes Audio in der Liste
        });
        // document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2
        // const instrumentImages = document.querySelectorAll('.sound_img'); // nur wichtig für die Visualisierung
        // instrumentImages.forEach(img => img.classList.remove('active')); // nur wichtig für die Visualisierung
    }

    // Pausiert das Abspielen einer einzelnen Audiodatei
    static pauseOne(sound) {
        sound.pause(); // Pausiert das übergebene Audio
        // const instrumentImg = document.getElementById(instrumentId); // nur wichtig für die Visualisierung
        // instrumentImg.classList.remove('active'); // nur wichtig für die Visualisierung
    }

    // ##########################################################################################################################
    // ################################################  Sound Slider - BONUS !  ################################################
    // Setzt die Lautstärke für alle Audiodateien
    // static objSetVolume(sounds) {  // sounds ist das array: allSounds welches hier als Parameter ankommt
    //     let volumeValue = document.getElementById('volume').value;  // Holt den aktuellen Lautstärkewert aus dem Inputfeld
    //     sounds.forEach(sound => {
    //         sound.volume = volumeValue;  // Setzt die Lautstärke für jedes Audio wie im Slider angegeben
    //     });
    // }
}
