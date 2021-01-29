import { getData, Individual, Sample } from "./saples";
import { register, verify } from "./myvoice";
import { log, logLine } from "./log";


async function main() {

    // Get all the individuals we should use
    let [individuals, tally] = await getData('data/');
    log('# Using ' + tally + ' files')
    log('')

    // Register them all
    for (const ind of individuals) {
        await registerAll(ind)
    }
    log('')

    // Build the list of possible test candidates that we should use
    const list = new Array<[Individual, Sample]>()
    for (const ind_test of individuals) {
        for (const s_test of ind_test.samples) {
            log("SPEAKER DETAIL " + ind_test.name + " - " + s_test.speakerId);
            list.push([ind_test, s_test])
        }
    }

    // Run each of the samples towards each of the registered id's
    // and constantly log our performance/result
    for (const ind_reg of individuals) {
        for (const s_reg of ind_reg.samples) {
            for (const ind_test of individuals) {
                for (const s_test of ind_test.samples) {
                    // Skip the test if it is the same one used for registration
                    if(s_reg.id == s_test.id) {
                        log("don't verify " + s_reg.id);
                        continue
                    }
                    log("VERIFY " + s_reg.id + " " + s_test.id);
                    // let result = await verify(s_reg.id, s_test.path);
                    // logLine({
                    //     shouldSucceed: ind_reg == ind_test,
                    //     score: result.score,
                    //     snrReg: s_reg.snr,
                    //     speechTimeReg: s_reg.speechTime,
                    //     registration: s_reg.path,
                    //     snrTst: result.snr,
                    //     speechTimeTst: result.speechTime,
                    //     test: s_test.path,
                    //     id: s_reg.id,
                    //     size_reg: s_reg.size,
                    //     size_test: s_test.size,
                    // })
                }
            }
        }
    }
}

main();

async function registerAll(ind: Individual): Promise<any> {
    // Register the same individual with all the different samples - important
    // so that we get the variation in registration also and not only verification
    for (const it of ind.samples) {
        log('# registering ' + it.path + ' as ' + it.id);
        const resp = await register(it.id, it.path);
        it.speakerId = resp.speakerId;
        it.snr = resp.snr;
        it.speechTime = resp.speechTime;
        it.size = resp.fileSize
    }
}
