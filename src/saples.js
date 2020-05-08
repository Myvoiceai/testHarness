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
const path = require('path');
const { readdir, stat } = require("fs").promises;
const noice = Math.ceil(Math.random() * 1e6);
function getData(pth) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirsr = yield readdir(pth);
        let ret = new Array();
        let tally = 0;
        for (const p of dirsr) {
            if (p.startsWith('.')) {
                continue;
            }
            ret.push(yield getIndividual(path.join(pth, p), p));
            tally += ret[ret.length - 1].samples.length;
        }
        return [ret, tally];
    });
}
exports.getData = getData;
function getIndividual(pth, name) {
    return __awaiter(this, void 0, void 0, function* () {
        let dirsr = yield readdir(pth);
        let samples = new Array();
        const id = noice + '_' + pth.split('/')[1];
        for (const p of dirsr) {
            if (p.startsWith('.')) {
                continue;
            }
            samples.push(yield getSample(id, path.join(pth, p)));
        }
        return {
            name: pth,
            samples: samples,
            id: id,
        };
    });
}
function getSample(id, pth) {
    return __awaiter(this, void 0, void 0, function* () {
        let name = pth.split('/');
        name = name[name.length - 1];
        name = name.replace('.', '_');
        return {
            path: pth,
            name: name,
            id: id + '_' + name,
            snr: 0,
            speechTime: 0,
            size: 0,
        };
    });
}
//# sourceMappingURL=saples.js.map