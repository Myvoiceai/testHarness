import { soxStream } from "./sox";

const fs = require('fs');
const request = require("request-promise")

const url = 'https://core.myvoice.ai';
const token = 'gigaaa';

export interface RegisterResponse {
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
    const [stream, size] = await soxStream(path, id)
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
    return request(options).then((r:any) => {
        r = JSON.parse(r);
        return {
            snr: r.quality.files[0].snr,
            speechTime: r.quality.files[0].speech_time,
            fileSize: size,
        }
    });
}


export async function verify(id: string, path: string): Promise<VerifyResponse>  {
    const [stream, size] = await soxStream(path, id)
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
    return request(options).then((r:any) => {
        r = JSON.parse(r);
        return {
            score: r.score,
            snr: r.quality.files[0].score,
            speechTime: r.quality.files[0].speech_time,
        }
    })
}
