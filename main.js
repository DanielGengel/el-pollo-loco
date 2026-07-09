import { World } from "./models/world.class.js";
import { Keyboard } from "./helper/keyboard.class.js";
import { IntervalHub } from "./helper/intervallHub.js";
import { preloadImages } from "./helper/preload.js";
import { SoundHub } from "./helper/soundHub.class.js";

let canvas;
let world;
let preloadPromise;
let gameIsStarting = false;
let countdownSeconds = 0;
let countdownTimer;

const loadingScreen = getElement("loadingScreen");
const countdown = getElement("countdown");
const startScreen = getElement("startScreen");
const infoPopup = getElement("infoPopup");
const imprintPopup = getElement("imprintPopup");
const winScreen = getElement("winScreen");
const loseScreen = getElement("loseScreen");

init();

/**
 * Gets one HTML element by its id
 * @param {string} id -> The id of the HTML element
 * @returns {HTMLElement} -> The actual HTML element
 */
function getElement(id) {
    return document.getElementById(id);
}

/**
 * Init functions
 */
function init() {
    canvas = getElement("canvas");
    preloadPromise = preloadImages();
    initMobileButtons();
    initKeyboardEvents();
    initButtonEvents();
    SoundHub.loadVolume();
    initVolumeControls();
}

/**
 * Connect keyboard events.
 * The player can use the keyboard after this function is running...
 */
function initKeyboardEvents() {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
}

/**
 * Saves a pressed key in the Keyboard class
 * @param {KeyboardEvent} event -> The pressed keyboard key
 */
function handleKeyDown(event) {
    setKeyboardValue(event.code, true);
}

/**
 * Saves a released key in the Keyboard class
 * @param {KeyboardEvent} event -> The released keyboard key
 */
function handleKeyUp(event) {
    setKeyboardValue(event.code, false);
}

/**
 * Changes a game key to true or false.
 * @param {string} keyCode - The code of the keyboard key.
 * @param {boolean} value - The new value for this key.
 */
function setKeyboardValue(keyCode, value) {
    if (keyCode === "ArrowLeft") Keyboard.LEFT = value;
    if (keyCode === "ArrowRight") Keyboard.RIGHT = value;
    if (keyCode === "ArrowUp") Keyboard.UP = value;
    if (keyCode === "ArrowDown") Keyboard.DOWN = value;
    if (keyCode === "Space") Keyboard.SPACE = value;
    if (keyCode === "KeyD") Keyboard.D = value;
}

/**
 * Connects all normal menu buttons.
 */
function initButtonEvents() {
    getElement("btnStart").onclick = handleStartClick;
    getElement("btnInfo").onclick = showInfoPopup;
    getElement("btnImprint").onclick = showImprintPopup;
    getElement("btnRestartWin").onclick = restartAfterWin;
    getElement("btnRestartLose").onclick = restartAfterLose;
    initClosePopupButtons();
}

/**
 * Connects every popup close button. Each close button hides all popups
 */
function initClosePopupButtons() {
    const buttons = document.querySelectorAll(".closePopup");
    buttons.forEach(addClosePopupClick);
}

/**
 * Adds the close popup click event to one button.
 * It is used for every button with the closePopup class.
 * @param {Element} button -> The close button.
 */
function addClosePopupClick(button) {
    button.addEventListener("click", closePopups);
}

/**
 * Handles the start button click. It waits for all images and then starts the countdown.
 */
async function handleStartClick() {
    if (gameIsStarting) return;
    gameIsStarting = true;
    showLoadingMessage();

    try {
        await preloadPromise;
        showCountdown();
    } catch (error) {
        showLoadingError(error);
    }
}

/**
 * Shows the loading screen before the countdown starts.
 * The start screen is hidden during loading...
 */
function showLoadingMessage() {
    startScreen.classList.remove("active");
    loadingScreen.classList.add("active");
    countdown.textContent = "Loading...";
}

/**
 * Shows a loading error
 * @param {Error} error -> image loading error
 */
function showLoadingError(error) {
    console.error("Image could not be loaded:", error);
    countdown.textContent = "Loading failed";
    gameIsStarting = false;
}

/**
 * Shows the countdown before the game starts and once the countdown reaches zero, the game begins
 */
function showCountdown() {
    let seconds = 3;
    SoundHub.playLoop(SoundHub.backgroundMusic);
    countdown.textContent = seconds;
    startCountdownTimer(seconds);
}

/**
 * Starts the one-second countdown timer.
 * The timer updates the countdown text every second.
 * @param {number} seconds -> The first countdown number
 */
function startCountdownTimer(seconds) {
    countdownSeconds = seconds;
    countdownTimer = setInterval(handleCountdownTick, 1000);
}

/**
 * Runs once every countdown second.
 * updates the text and checks if the game can start
 */
function handleCountdownTick() {
    countdownSeconds = countdownSeconds - 1;
    countdown.textContent = countdownSeconds;
    finishCountdownIfReady();
}

/**
 * Starts the game when the countdown is finished.
 * It also hides the loading screen
 */
function finishCountdownIfReady() {
    if (countdownSeconds !== 0) return;
    clearInterval(countdownTimer);
    loadingScreen.classList.remove("active");
    startGame();
    gameIsStarting = false;
}

/**
 * Starts a fresh game world, but first clears old game data and old pressed keys...
 */
function startGame() {
    destroyWorldIfNeeded();
    IntervalHub.stopAllIntervals();
    resetKeyboard();
    world = new World(canvas, Keyboard);
    IntervalHub.startInterval(checkGameState, 100);
    SoundHub.playOne(SoundHub.gameStart);
}

/**
 * Stops the current game -> clears intervals, sounds, and pressed keys
 */
function stopGame() {
    destroyWorldIfNeeded();
    IntervalHub.stopAllIntervals();
    SoundHub.pauseAll();
    resetKeyboard();
}

/**
 * Destroys the current world if one exists, preventing old worlds 
 * from running in the background
 */
function destroyWorldIfNeeded() {
    if (world) {
        world.destroyWorld();
    }
}

/**
 * Checks if the game is still running, and if the game ended, 
 * it shows the correct end screen
 */
function checkGameState() {
    if (!world) return;
    if (world.gameIsRunning) return;

    const result = world.gameResult;
    stopGame();
    showGameResult(result);
}

/**
 * Shows the win or lose screen. Game result => world.gameResult
 * @param {string} result -> The result of the game
 */
function showGameResult(result) {
    if (result === "won") {
        winScreen.classList.add("active");
    }
    if (result === "lost") {
        loseScreen.classList.add("active");
    }
}

/**
 * Sets all game keys to false, this prevents stuck movement 
 * after a restart.
 */
function resetKeyboard() {
    Keyboard.LEFT = false;
    Keyboard.RIGHT = false;
    Keyboard.UP = false;
    Keyboard.DOWN = false;
    Keyboard.SPACE = false;
    Keyboard.D = false;
}

/**
 * Connects all mobile game buttons.
 * The buttons control walking left and right, jumping, and throwing.
 */
function initMobileButtons() {
    addMobileButton("btnMobileLeft", "LEFT");
    addMobileButton("btnMobileRight", "RIGHT");
    addMobileButton("btnMobileJump", "SPACE");
    addMobileButton("btnMobileThrow", "D");
}

/**
 * Connects one mobile button to one game key
 * Buttons work for touch and mouse input
 * @param {string} buttonId -> The id of the mobile button.
 * @param {string} key -> The Keyboard property that should change.
 */
function addMobileButton(buttonId, key) {
    const button = getElement(buttonId);
    addTouchStart(button, key);
    addTouchEnd(button, key);
    addMouseStart(button, key);
    addMouseEnd(button, key);
    addNoContextMenu(button);
}

/**
 * Adds the touch START event to one mobile button
 * The matching game key becomes true.
 * @param {HTMLElement} button -> mobile button
 * @param {string} key -> The Keyboard property that should change
 */
function addTouchStart(button, key) {
    button.addEventListener("touchstart", startMobileKey.bind(null, key));
}

/**
 * Adds touch END events to one mobile button.
 * @param {HTMLElement} button -< mobile button
 * @param {string} key -> The property that should change
 */
function addTouchEnd(button, key) {
    button.addEventListener("touchend", stopMobileKey.bind(null, key));
    button.addEventListener("touchcancel", stopMobileKey.bind(null, key));
    button.addEventListener("touchmove", preventTouchMove);
}

/**
 * Adds the mouse down event to one mobile button.
 * @param {HTMLElement} button -> mobile button
 * @param {string} key -> The Keyboard property that should change
 */
function addMouseStart(button, key) {
    button.addEventListener("mousedown", startMouseKey.bind(null, key));
}

/**
 * Adds mouse end events to one mobile buttons...
 * @param {HTMLElement} button 
 * @param {string} key
 */
function addMouseEnd(button, key) {
    button.addEventListener("mouseup", stopMouseKey.bind(null, key));
    button.addEventListener("mouseleave", stopMouseKey.bind(null, key));
}

/**
 * keeps the game controls feeling like game buttons
 * @param {HTMLElement} button
 */
function addNoContextMenu(button) {
    button.addEventListener("contextmenu", preventDefaultEvent);
}

/**
 * STARTING one mobile key after a touch event
 * It also prevents browser touch behavior.
 * @param {string} key 
 * @param {TouchEvent} event
 */
function startMobileKey(key, event) {
    event.preventDefault();
    Keyboard[key] = true;
}

/**
 * STOPPING mobile key after a touch event
 * @param {string} key 
 * @param {TouchEvent} event
 */
function stopMobileKey(key, event) {
    event.preventDefault();
    Keyboard[key] = false;
}

/**
 * STARTING mobile key 
 * @param {string} key 
 */
function startMouseKey(key) {
    Keyboard[key] = true;
}

/**
 * STARTING mobile key 
 * @param {string} key 
 */
function stopMouseKey(key) {
    Keyboard[key] = false;
}

/**
 * Prevent scrolling while touching a mobile button...
 * @param {TouchEvent} event
 */
function preventTouchMove(event) {
    event.preventDefault();
}

/**
 * This is used for the mobile button context menu
 * @param {Event} event
 */
function preventDefaultEvent(event) {
    event.preventDefault();
}

/**
 * Opens the info popup for the game controls.
 */
function showInfoPopup() {
    infoPopup.classList.remove("hidden");
}

/**
 * Opens the imprint popup
 */
function showImprintPopup() {
    imprintPopup.classList.remove("hidden");
}

/**
 * Closes all small popups
 */
function closePopups() {
    infoPopup.classList.add("hidden");
    imprintPopup.classList.add("hidden");
}

/**
 * Restarts the game after winning
 */
function restartAfterWin() {
    winScreen.classList.remove("active");
    startGame();
}

/**
 * Restarts the game after losing.
 */
function restartAfterLose() {
    loseScreen.classList.remove("active");
    startGame();
}

/**
 * Connects the volume slider and mute buttons. SoundHub handles sound changes.
 */
function initVolumeControls() {
    const slider = getElement("volumeSlider");
    const textButton = getElement("btnMute");
    const iconButton = getElement("btnMuteIcon");

    SoundHub.initControls(slider, textButton, iconButton);
    addVolumeSliderEvent(slider);
    addMuteButtonEvents(textButton, iconButton);
}

/**
 * Connects the volume slider.
 * Moving the slider changes the game volume.
 * @param {HTMLInputElement} slider
 */
function addVolumeSliderEvent(slider) {
    slider.addEventListener("input", handleVolumeInput.bind(null, slider));
}

/**
 * Handles changes on the volume slide
 * @param {HTMLInputElement} slider 
 */
function handleVolumeInput(slider) {
    SoundHub.setVolume(slider.value / 100);
}

/**
 * Connects both mute buttons (Start-Screen and game controll)
 * Clicking either button toggles sound on or off
 * @param {HTMLElement} textButton -> text mute button at Start-Screen
 * @param {HTMLElement} iconButton - icon mute buton in the game 
 *  */
function addMuteButtonEvents(textButton, iconButton) {
    textButton.onclick = toggleMute;
    iconButton.onclick = toggleMute;
}

/**
 * Toggles all game sounds
 */
function toggleMute() {
    SoundHub.toggleMute();
}
