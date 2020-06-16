"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const llog = (a) => {
    fs.appendFileSync('log.csv', a + '\n');
};
fs.writeFileSync('log.csv', '');
llog('No,Should succed,Score,SNR-Reg,SpeechTime-Reg,Registration,SNR-Tst,SpeechTime-Test,Id,SizeReg,SizeTest');
let no = 0;
function log(a) {
    console.log(a);
}
exports.log = log;
function logLine(a) {
    no++;
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
        a.size_test;
    log(str);
    llog(str);
}
exports.logLine = logLine;
//# sourceMappingURL=log.js.map