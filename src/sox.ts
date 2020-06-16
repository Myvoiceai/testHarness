const fs = require('fs');
const exec = require('child_process').exec;
const path = require('path');
const mkdirp = require('mkdirp');

// run sox to -re-encode to the desired format and remove silence etc to make it nice for the algorithm
export async function runSox(inpath: string, id: string): Promise<string> {
    mkdirp.sync('./tmp');
    const pname = path.join('./tmp', id + '.wav')
    return new Promise<string>((resolve, reject) => {
        exec(`sox ${inpath} -r 8000 -c 1 -b 16 ${pname} silence -l 1 0.1t 1% -1 10t 1%`, (error: any) => {
            if (error)
                throw error;
            resolve(pname);
        });
    });
}


export async function runSoxSplit(inpath: string, id: string): Promise<string[]> {
    const pname1 = path.join('./tmp', id + '_1.wav')
    const pname2 = path.join('./tmp', id + '_2.wav')
    const pname3 = path.join('./tmp', id + '_3.wav')
    const pname4 = path.join('./tmp', id + '_4.wav')
    const ps = [new Promise<string>((resolve, reject) => {
        exec(`sox ${inpath} ${pname1} trim 0 10t`, (error: any) => {
            if (error)
                throw error;
            resolve(pname1);
        });
    }),new Promise<string>((resolve, reject) => {
        exec(`sox ${inpath} ${pname2} trim 10t 10t`, (error: any) => {
            if (error)
                throw error;
            resolve(pname2);
        });
    }),new Promise<string>((resolve, reject) => {
        exec(`sox ${inpath} ${pname3} trim 20t 10t`, (error: any) => {
            if (error)
                throw error;
            resolve(pname3);
        });
    }),new Promise<string>((resolve, reject) => {
        exec(`sox ${inpath} ${pname3} trim 30t -0`, (error: any) => {
            if (error)
                throw error;
            resolve(pname3);
        });
    })];
    return Promise.all(ps);
}

export async function soxFile(inpath: string, id: string): Promise<[string, string, string, string, string,number]> {
    const path = await runSox(inpath, id);
    const stats = fs.statSync(path)
    const paths = await runSoxSplit(path, id)
    const fileSizeInBytes = stats.size
    const gen = (path: string)=>{
        return new Promise<string>((resolve, reject) => {
            fs.readFile(path, function (err:any, data:string) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            })
        })
    }
    return [await gen(path), await gen(paths[0]), await gen(paths[1]), await gen(paths[2]),await gen(paths[3]), fileSizeInBytes]
}
export async function soxStream(inpath: string, id: string): Promise<[any, number]> {
    const path = await runSox(inpath, id);
    const stats = fs.statSync(path)
    const fileSizeInBytes = stats.size
    return [[fs.createReadStream(path)], fileSizeInBytes]
}
