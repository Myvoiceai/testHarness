import { resolveCname } from "dns";
import { eventNames } from "cluster";
import { PassThrough } from "stream";

const fs = require('fs');
const path = require('path');
const { readdir, stat } = require("fs").promises

const noice = Math.ceil(Math.random()*1e6);

export interface Sample {
    path: string;
    name: string;
    id: string;
    snr: number;
    speechTime: number;
    size: number;
}

export interface Individual {
    samples: Sample[];
    name: string;
    id: string;
}


export async function getData(pth: string): Promise<[Individual[], number]> {
    let dirsr = await readdir(pth)
    let ret = new Array<Individual>();
    let tally = 0;
    for (const p of dirsr) {
        if(p.startsWith('.')) {
            continue
        }
        ret.push(await getIndividual(path.join(pth, p), p))
        tally += ret[ret.length-1].samples.length;
    }
    return [ret, tally];
}

async function getIndividual(pth: string, name: string): Promise<Individual> {
    let dirsr = await readdir(pth)
    let samples = new Array<Sample>();
    const id = noice + '_' + pth.split('/')[1];
    for (const p of dirsr) {
        if(p.startsWith('.')) {
            continue
        }
        samples.push(await getSample(id, path.join(pth, p)))
    }
    return {
        name: pth,
        samples: samples,
        id: id,
    }
}

async function getSample(id: string, pth: string): Promise<Sample> {
    let name: any = pth.split('/');
    name = name[name.length-1]
    name = name.replace('.','_')
    return {
        path: pth,
        name: name,
        id: id+'_'+name,
        snr:0,
        speechTime:0,
        size: 0,
    }
}