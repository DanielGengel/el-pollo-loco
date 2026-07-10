export class IntervalHub {
    // Save all Interval-IDs
    static allIntervals = [];

    /**
     * Starts a new interval and saves it in the interval list.
     * @param {Function} func -> The function that should run again and again
     * @param {number} timer -> The time between each run
     * @returns {number} -> The id of the new interval
     */
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        return newInterval;
    }

    /**
     * Stops all intervals and clears the interval list.
     */
    static stopAllIntervals() {
        IntervalHub.allIntervals.forEach(clearInterval);
        IntervalHub.allIntervals = [];
    }

    /**
     * Stops one interval and removes it from the interval list.
     * @param {number} id -> The id of the interval that should stop
     */
    static stopInterval(id) {
    clearInterval(id);
    // remove from array
    const index = this.allIntervals.indexOf(id);
    if (index !== -1) {
        this.allIntervals.splice(index, 1);
    }
}
}