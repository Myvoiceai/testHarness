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
const url = 'https://developer:50827367-af1d-42bc-b5fb-9a8b0f1183ed@client-testing.myvoice.ai';
function register(id, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const [stream, size] = yield sox_1.soxStream(path, id);
        const options = {
            method: "POST",
            url: url + `/speakerEnrol?speakerId=${id}`,
            headers: {
                "Content-Type": "multipart/form-data"
                // "Authorization": `Basic ${token}`,
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
                "Content-Type": "multipart/form-data"
                // "Authorization": `Basic ${token}`,
            },
            formData: {
                "wav1": stream
            }
        };
        return request(options).then((r) => {
            r = JSON.parse(r);
            return {
                score: r.score,
                snr: r.quality.files[0].score,
                speechTime: r.quality.files[0].speech_time,
            };
        });
    });
}
exports.verify = verify;
//# sourceMappingURL=myvoice.js.map