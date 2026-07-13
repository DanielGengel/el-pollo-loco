export class SoundHub {
    static backgroundMusic = new Audio("./assets/sounds/chickenDance.mp3");
    static characterDamage = new Audio("./assets/sounds/character/characterDamage.mp3");
    static characterDead = new Audio("./assets/sounds/character/characterDead.wav");
    static characterJump = new Audio("./assets/sounds/character/characterJump.wav");
    static characterRun = new Audio("./assets/sounds/character/characterRun.mp3");
    static characterSnoring = new Audio("./assets/sounds/character/characterSnoring.mp3");
    static chickenDead = new Audio("./assets/sounds/chicken/chickenDead.mp3");
    static chickenDead2 = new Audio("./assets/sounds/chicken/chickenDead2.mp3");
    static bottleCollectSound = new Audio("./assets/sounds/collectibles/bottleCollectSound.wav");
    static collectSound = new Audio("./assets/sounds/collectibles/collectSound.wav");
    static endbossApproach = new Audio("./assets/sounds/endboss/endbossApproach.wav");
    static gameStart = new Audio("./assets/sounds/game/gameStart.mp3");
    static bottleBreak = new Audio("./assets/sounds/throwable/bottleBreak.mp3");

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
    static slider = null;
    static textButton = null;
    static iconButton = null;

    /**
     * Sets the volume for all sounds.
     * @param {number} volume -> The new volume
     */
    static setVolume(volume) {
        this.masterVolume = volume;

        this.allSounds.forEach((sound) => {
            sound.volume = volume;
        });

        this.backgroundMusic.volume = volume * this.backgroundVolumeFactor;
        localStorage.setItem("masterVolume", volume);

        this.updateControls();
    }

    /**
     * Loads the saved volume from the browser.
     */
    static loadVolume() {
        const saved = localStorage.getItem("masterVolume");

        if (saved !== null) {
            this.setVolume(Number(saved));
        }
    }

    /**
     * Saves the buttons and slider for sound control.
     * @param {HTMLInputElement} slider -> The volume slider
     * @param {HTMLButtonElement} textButton -> The sound button with text
     * @param {HTMLButtonElement} iconButton -> The sound button with icon
     */
    static initControls(slider, textButton, iconButton) {
        this.slider = slider;
        this.textButton = textButton;
        this.iconButton = iconButton;

        this.updateControls();
    }

    /**
     * Turns the sound on or off.
     */
    static toggleMute() {
        if (this.masterVolume === 0) {
            this.setVolume(0.2);
        } else {
            this.setVolume(0);
        }
    }

    /**
     * Updates the sound buttons and the volume slider.
     */
    static updateControls() {
        if (this.slider) {
            this.slider.value = this.masterVolume * 100;
        }

        if (this.textButton) {
            this.textButton.textContent = this.isMuted() ? "🔇 SOUNDS OFF" : "🔊 SOUNDS ON";
        }

        if (this.iconButton) {
            this.iconButton.textContent = this.isMuted() ? "🔇" : "🔊";
        }
    }

    /**
     * Checks if the sound is muted.
     * @returns {boolean} -> True when the sound is off
     */
    static isMuted() {
        return this.masterVolume === 0;
    }

    /**
     * Plays the sound only when the sound file is fully loaded.
     * Without this check, the game could throw an error when starting
     * or when pressing the pause button.
     * @param {HTMLAudioElement} sound -> The sound that should play
     */
    static playOne(sound) {
        if (!sound.paused) return;
        const soundInterval = setInterval(() => {
            if (sound.readyState == 4) {
                sound.volume = 0.2;
                sound.currentTime = 0;
                sound.play();

                clearInterval(soundInterval);
            }
        }, 50);
    }

    /**
     * Plays one sound again and again.
     * @param {HTMLAudioElement} sound -> The sound that should loop
     */
    static playLoop(sound) {
        sound.loop = true;

        if (sound === this.backgroundMusic) {
            sound.volume = this.masterVolume * this.backgroundVolumeFactor;
        } else {
            sound.volume = this.masterVolume;
        }

        sound.play().catch((error) => {
            console.warn("Could not play sound:", error);
        });
    }

    /**
     * Stops all sounds.
     */
    static pauseAll() {
        SoundHub.allSounds.forEach((sound) => {
            sound.pause();
        });
    }

    /**
     * Stops one sound.
     * @param {HTMLAudioElement} sound -> The sound that should stop
     */
    static pauseOne(sound) {
        sound.pause();
    }
}
