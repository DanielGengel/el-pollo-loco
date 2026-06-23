export class IntervalHub {
    // Speichert alle registrierten Interval-IDs
    static allIntervals = [];

    // Startet ein neues Intervall und
    // fügt es dem Array allIntervals hinzu
    static startInterval(func, timer) {
        const newInterval = setInterval(func, timer);
        IntervalHub.allIntervals.push(newInterval);
        console.log("<<<<< startInterval >>>>>");
        console.log("func ==> ", func);
        
    }

    //Stoppt alle registrierten Intervalle und leert die Registry.
    static stopAllIntervals() {
        console.log(IntervalHub.allIntervals.length);

        IntervalHub.allIntervals.forEach(clearInterval);
        // IntervalHub.allIntervals = [];
    }
}


