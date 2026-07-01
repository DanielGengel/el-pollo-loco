export class IntervalHub {
    // Speichert alle registrierten Interval-IDs
    static allIntervals = [];

    // Startet ein neues Intervall und
    // fügt es dem Array allIntervals hinzu
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        // console.log("<<<<< startInterval >>>>>");
        // console.log("func ==> ", func);
        return newInterval;
        
    }

    //Stoppt alle registrierten Intervalle und leert die Registry.
    static stopAllIntervals() {
        console.log(IntervalHub.allIntervals.length);
        IntervalHub.allIntervals.forEach(clearInterval);
        // IntervalHub.allIntervals = [];
    }

    // To stop single intervalls 
    static stopInterval(id) {
    clearInterval(id);
    console.log("Clear single intervall...id => ", id);
    // remove from array
    const index = this.allIntervals.indexOf(id);
    if (index !== -1) {
        this.allIntervals.splice(index, 1);
    }
}
}


