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
const saples_1 = require("./saples");
// import { register, verify } from "./deepaffects";
const myvoice_1 = require("./myvoice");
const log_1 = require("./log");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get all the individuals we should use
        let [individuals, tally] = yield saples_1.getData('data/');
        log_1.log('# Using ' + tally + ' files');
        log_1.log('');
        // Register them all
        for (const ind of individuals) {
            yield registerAll(ind);
        }
        log_1.log('');
        // Build the list of possible test candidates that we should use
        const list = new Array();
        for (const ind_test of individuals) {
            for (const s_test of ind_test.samples) {
                list.push([ind_test, s_test]);
            }
        }
        // Run each of the samples towards each of the registered id's
        // and constantly lok our performance/result
        for (const ind_reg of individuals) {
            for (const s_reg of ind_reg.samples) {
                for (const ind_test of individuals) {
                    for (const s_test of ind_test.samples) {
                        // Skip the test if it is the same one used for registration
                        if (s_reg.id == s_test.id) {
                            continue;
                        }
                        let result = yield myvoice_1.verify(s_reg.id, s_test.path);
                        log_1.logLine({
                            shouldSucced: ind_reg == ind_test,
                            score: result.score,
                            snr: s_reg.snr,
                            speechTime: s_reg.speechTime,
                            registration: s_reg.path,
                            test: s_test.path,
                            id: s_reg.id,
                            size_reg: s_reg.size,
                            size_test: s_test.size,
                        });
                    }
                }
            }
        }
    });
}
main();
function registerAll(ind) {
    return __awaiter(this, void 0, void 0, function* () {
        // Register the same individual with all the different samples - important
        // so that we get the variation in registrationalso and not only verification
        for (const it of ind.samples) {
            log_1.log('# registering ' + it.path + ' as ' + it.id);
            const resp = yield myvoice_1.register(it.id, it.path);
            it.snr = resp.snr;
            it.speechTime = resp.speechTime;
            it.size = resp.fileSize;
        }
    });
}
//# sourceMappingURL=index.js.map