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
const sox_1 = require("./sox");
const fs = require('fs');
const request = require("request-promise");
// const url = 'http://devtest.myvoice.ai';
// const token = 'RE5CVGVsZTo2UXYwbE9oNFd6N01i';
// const url = 'http://localhost:3000';
const url = 'https://client-testing.myvoice.ai';
// const url = 'http://ec2-18-130-139-189.eu-west-2.compute.amazonaws.com:3000';
const token = 'myvoice';
function register(id, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const [stream, size] = yield sox_1.soxStream(path, id);
        const options = {
            method: "POST",
            url: url + `/speakerEnrol?speakerId=${id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
            formData: {
                "wav1": stream
            }
        };
        return request(options).then((r) => {
            r = JSON.parse(r);
            return {
                snr: r.quality.files[0].snr,
                speechTime: r.quality.files[0].speech_time,
                fileSize: size,
            };
        });
    });
}
exports.register = register;
function verify(id, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const [stream, size] = yield sox_1.soxStream(path, id);
        const options = {
            method: "POST",
            url: url + `/speakerVerify?speakerId=${id}`,
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            },
            formData: {
                "wav1": stream
            }
        };
        return request(options).then((r) => {
            r = JSON.parse(r);
            return {
                score: r.score,
            };
        });
    });
}
exports.verify = verify;
//# sourceMappingURL=myvoice.js.map