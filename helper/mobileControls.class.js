import { Keyboard } from "./keyboard.class.js";

export class MobileControls {
    /**
     * Starts the mobile button controls.
     */
    static init() {
        MobileControls.addMobileButton("btnMobileLeft", "LEFT");
        MobileControls.addMobileButton("btnMobileRight", "RIGHT");
        MobileControls.addMobileButton("btnMobileJump", "SPACE");
        MobileControls.addMobileButton("btnMobileThrow", "D");
    }

    /**
     * Connects one mobile button to one game key.
     * @param {string} buttonId -> The id of the mobile button
     * @param {string} key -> The Keyboard property that should change
     */
    static addMobileButton(buttonId, key) {
        const button = document.getElementById(buttonId);

        MobileControls.addTouchStart(button, key);
        MobileControls.addTouchEnd(button, key);
        MobileControls.addMouseStart(button, key);
        MobileControls.addMouseEnd(button, key);
        MobileControls.addNoContextMenu(button);
    }

    /**
     * Adds the touch start event to one mobile button.
     * @param {HTMLElement} button -> The mobile button
     * @param {string} key -> The Keyboard property that should change
     */
    static addTouchStart(button, key) {
        button.addEventListener("touchstart", MobileControls.startMobileKey.bind(null, key));
    }

    /**
     * Adds touch end events to one mobile button.
     * @param {HTMLElement} button -> The mobile button
     * @param {string} key -> The Keyboard property that should change
     */
    static addTouchEnd(button, key) {
        button.addEventListener("touchend", MobileControls.stopMobileKey.bind(null, key));
        button.addEventListener("touchcancel", MobileControls.stopMobileKey.bind(null, key));
        button.addEventListener("touchmove", MobileControls.preventTouchMove);
    }

    /**
     * Adds the mouse down event to one mobile button.
     * @param {HTMLElement} button -> The mobile button
     * @param {string} key -> The Keyboard property that should change
     */
    static addMouseStart(button, key) {
        button.addEventListener("mousedown", MobileControls.startMouseKey.bind(null, key));
    }

    /**
     * Adds mouse end events to one mobile button.
     * @param {HTMLElement} button -> The mobile button
     * @param {string} key -> The Keyboard property that should change
     */
    static addMouseEnd(button, key) {
        button.addEventListener("mouseup", MobileControls.stopMouseKey.bind(null, key));
        button.addEventListener("mouseleave", MobileControls.stopMouseKey.bind(null, key));
    }

    /**
     * Stops the browser context menu on mobile buttons.
     * @param {HTMLElement} button -> The mobile button
     */
    static addNoContextMenu(button) {
        button.addEventListener("contextmenu", MobileControls.preventDefaultEvent);
    }

    /**
     * Starts one mobile key after touching a button.
     * @param {string} key -> The Keyboard property that should change
     * @param {TouchEvent} event -> The touch event
     */
    static startMobileKey(key, event) {
        event.preventDefault();
        Keyboard[key] = true;
    }

    /**
     * Stops one mobile key after touching a button.
     * @param {string} key -> The Keyboard property that should change
     * @param {TouchEvent} event -> The touch event
     */
    static stopMobileKey(key, event) {
        event.preventDefault();
        Keyboard[key] = false;
    }

    /**
     * Starts one mobile key with the mouse.
     * @param {string} key -> The Keyboard property that should change
     */
    static startMouseKey(key) {
        Keyboard[key] = true;
    }

    /**
     * Stops one mobile key with the mouse.
     * @param {string} key -> The Keyboard property that should change
     */
    static stopMouseKey(key) {
        Keyboard[key] = false;
    }

    /**
     * Prevents scrolling while touching a mobile button.
     * @param {TouchEvent} event -> The touch event
     */
    static preventTouchMove(event) {
        event.preventDefault();
    }

    /**
     * Prevents the normal browser action.
     * @param {Event} event -> The browser event
     */
    static preventDefaultEvent(event) {
        event.preventDefault();
    }
}