import { soxStream } from "./sox";
import {log} from "./log";

const fs = require('fs');
const request = require("request-promise");
const devToken = '53810a21-7fee-4373-80ac-ca61a9766f82';
const url = 'https://prd.mve.digital/api/v1';

export interface RegisterResponse {
    speakerId: string;
    snr: number,
    speechTime: number,
    fileSize: number,
}

export interface VerifyResponse {
    snr: number;
    speechTime: number;
    score: number,
}

export async function register(id: string, path: string): Promise<RegisterResponse> {
    const [stream, size] = await soxStream(path, id);
    const options = {
        method: "POST",
        url: url + `/speakers/`,
        headers: {
            "Content-Type": "multipart/form-data",
            "Api-key": devToken
        },
        formData: {
            "wav1": stream
        }
    };
    return request(options).then((r:any) => {
        r = JSON.parse(r);
        log("SPEAKER ID IS " + r.id);
        return {
            speakerId: r.id,
            snr: r.files[0].snr,
            speechTime: r.files[0].speechDuration,
            fileSize: size,
        }
    });
}

// this is now https://prd.mve.digital/api/v1/speakers/{SPEAKERID}}/sessions
// we need to pass the speakerID retrieved during enrol and stored against the new enrol record
export async function verify(id: string, path: string): Promise<VerifyResponse>  {
    const [stream, size] = await soxStream(path, id)
    const options = {
        method: "POST",
        url: url + "/speakers/" + id + "/sessions",
        headers: {
            "Content-Type": "multipart/form-data",
            "Api-key": devToken
        },
        formData: {
            "wav1": stream
        }
    };
    return request(options).then((r:any) => {
        r = JSON.parse(r);
        return {
            score: r.verifications[0].result.raw,
            snr: r.verifications[0].files[0].snr,
            speechTime: r.verifications[0].files[0].speechDuration,
        }
    })
}
