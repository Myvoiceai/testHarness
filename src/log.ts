var fs = require('fs');
const llog = (a:string) => {
    fs.appendFileSync('log.csv', a+'\n');
}
fs.writeFileSync('log.csv', '');
llog('No,Should succed,Score,SNR-Reg,SpeechTime-Reg,Registration,SNR-Tst,SpeechTime-Test,Id,SizeReg,SizeTest')
let no = 0

export interface Line {
    shouldSucceed: boolean;
    score: number;
    registration: string;
    test: string;
    snrReg: number;
    speechTimeReg: number;
    snrTst: number;
    speechTimeTst: number;
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
        a.shouldSucceed + ', ' +
        a.score + ', ' +
        a.snrReg + ', ' +
        a.speechTimeReg + ', ' +
        a.registration + ', ' +
        a.snrTst + ', ' +
        a.speechTimeTst + ', ' +
        a.test + ', ' +
        a.id + ', ' +
        a.size_reg + ', ' +
        a.size_test
    log(str);
    llog(str);
}
