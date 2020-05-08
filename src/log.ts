var fs = require('fs');
const llog = (a:string) => {
    fs.appendFileSync('log.csv', a+'\n');
}
fs.writeFileSync('log.csv', '');
llog('No,Should succed,Score,SNR,SpeechTime,Registration,Test,Id,SizeReg,SizeTest')
let no = 0

export interface Line {
    shouldSucced: boolean;
    score: number;
    registration: string;
    test: string;
    snr: number;
    speechTime: number;
    id: string;
    size_reg: number;
    size_test: number;
}

export function log(a: string) {
    console.log(a)
}

export function logLine(a: Line) {
    no++
    const str = no + ', ' +
        a.shouldSucced + ', ' +
        a.score + ', ' +
        a.snr + ', ' +
        a.speechTime + ', ' +
        a.registration + ', ' +
        a.test + ', ' +
        a.id + ', ' +
        a.size_reg + ', ' +
        a.size_test
    log(str);
    llog(str);
}
