"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');
const mkdirp = require('mkdirp');
// run sox to -re-encode to the desired format and remove silence etc to make it nice for the algorithm
function runSox(inpath, id) {
    return __awaiter(this, void 0, void 0, function* () {
        mkdirp.sync('./tmp');
        const pname = path.join('./tmp', id + '.wav');
        return new Promise((resolve, reject) => {
            exec(`sox ${inpath} -r 8000 -c 1 -b 16 ${pname} silence -l 1 0.1t 1% -1 10t 1%`, (error) => {
                if (error)
                    throw error;
                resolve(pname);
            });
        });
    });
}
exports.runSox = runSox;
function runSoxSplit(inpath, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const pname1 = path.join('./tmp', id + '_1.wav');
        const pname2 = path.join('./tmp', id + '_2.wav');
        const pname3 = path.join('./tmp', id + '_3.wav');
        const pname4 = path.join('./tmp', id + '_4.wav');
        const ps = [new Promise((resolve, reject) => {
                exec(`sox ${inpath} ${pname1} trim 0 10t`, (error) => {
                    if (error)
                        throw error;
                    resolve(pname1);
                });
            }), new Promise((resolve, reject) => {
                exec(`sox ${inpath} ${pname2} trim 10t 10t`, (error) => {
                    if (error)
                        throw error;
                    resolve(pname2);
                });
            }), new Promise((resolve, reject) => {
                exec(`sox ${inpath} ${pname3} trim 20t 10t`, (error) => {
                    if (error)
                        throw error;
                    resolve(pname3);
                });
            }), new Promise((resolve, reject) => {
                exec(`sox ${inpath} ${pname3} trim 30t -0`, (error) => {
                    if (error)
                        throw error;
                    resolve(pname3);
                });
            })];
        return Promise.all(ps);
    });
}
exports.runSoxSplit = runSoxSplit;
function soxFile(inpath, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = yield runSox(inpath, id);
        const stats = fs.statSync(path);
        const paths = yield runSoxSplit(path, id);
        const fileSizeInBytes = stats.size;
        const gen = (path) => {
            return new Promise((resolve, reject) => {
                fs.readFile(path, function (err, data) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(data);
                });
            });
        };
        return [yield gen(path), yield gen(paths[0]), yield gen(paths[1]), yield gen(paths[2]), yield gen(paths[3]), fileSizeInBytes];
    });
}
exports.soxFile = soxFile;
function soxStream(inpath, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const path = yield runSox(inpath, id);
        const stats = fs.statSync(path);
        const fileSizeInBytes = stats.size;
        return [[fs.createReadStream(path)], fileSizeInBytes];
    });
}
exports.soxStream = soxStream;
//# sourceMappingURL=sox.js.map