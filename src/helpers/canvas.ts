export const CANVAS = {
    marginLeftX: 30,
    paddingLeftX: 30,
    marginRightX: 30,
    marginY: 30, // вниз
    canvasW: function (): number {
        return 800 + this.marginLeftX + this.paddingLeftX + this.marginRightX
    },
    canvasH: function (): number {
        return 300 + this.marginY
    },
    deltaGridYf(DELTA: number): number {
        const DELTAString = `${DELTA}`;
        const countOfNumber = DELTAString.length;
        const topNumber = Math.pow(10, countOfNumber);
        if (DELTA > topNumber / 2) {
            return Math.pow(10, countOfNumber - 1);
        } else {
            return Math.pow(10, countOfNumber - 1) / 2;
        }
        // if (DELTA <= 10) {
        //     return 1;
        // } else if (DELTA > 10 && DELTA <= 50) {
        //     return 5;
        // } else if (DELTA > 50 && DELTA <= 100) {
        //     return 10;
        // } else if (DELTA > 100 && DELTA <= 500) {
        //     return 50;
        // } else if (DELTA > 500 && DELTA <= 1000) {
        //     return 100;
        // } else if (DELTA > 1000 && DELTA <= 5000) {
        //     return 500;
        // } else if (DELTA > 5000 && DELTA <= 10000) {
        //     return 1000;
        // } else if (DELTA > 10000 && DELTA <= 50000) {
        //     return 5000;
        // } else if (DELTA > 50000 && DELTA <= 100000) {
        //     return 10000;
        // } else if (DELTA > 100000 && DELTA <= 500000) {
        //     return 50000;
        // } else if (DELTA > 500000 && DELTA <= 1000000) {
        //     return 100000;
        // } else if (DELTA > 1000000 && DELTA <= 5000000) {
        //     return 500000;
        // } else if (DELTA > 5000000 && DELTA <= 10000000) {
        //     return 1000000;
        // } else return 1000000;

    }
};