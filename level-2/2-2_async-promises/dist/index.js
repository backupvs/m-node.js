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
/* APIs */
const IP_URL = "https://api.ipify.org/?format=json";
const RANDOM_NAMES_URL = "https://random-data-api.com/api/name/random_name";
const RANDOM_USER_URL = "https://random-data-api.com/api/users/random_user";
/**
 * Fetches JSON from API and prints it to the console.
 */
const printIP = () => __awaiter(void 0, void 0, void 0, function* () { return console.log(yield getJSON(IP_URL)); });
/**
 * Fetches JSON from API.
 *
 * @returns Parsed JSON with IP
 */
const getIP = () => __awaiter(void 0, void 0, void 0, function* () { return yield getJSON(IP_URL); });
/**
 * Await for IP and run callback with IP as an argument.
 *
 * @param callback Callback to run with IP.
 */
const runCallbackWithIP = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const { ip } = yield getIP();
    callback(ip);
});
/**
 * Print IP to the console.
 */
const logIP = () => __awaiter(void 0, void 0, void 0, function* () {
    runCallbackWithIP(ip => {
        console.log("IP:", ip);
    });
});
/**
 * Run callback with IP as an argument.
 *
 * @param callback Callback to run with IP.
 */
const runCallbackWithIP2 = (callback) => {
    callback("00.00.00.00");
};
const printOctets = () => __awaiter(void 0, void 0, void 0, function* () {
    runCallbackWithIP2(ip => {
        console.log(ip.split("."));
    });
});
/**
 * Makes three conccurent requests to get random names.
 * async/await + Promise.all
 *
 * @returns Promise to get three parsed JSONs with random name.
 */
function getThreeRandomNames1() {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < 3; i++) {
            promises.push(getJSON(RANDOM_NAMES_URL));
        }
        const result = yield Promise.all(promises);
        return result;
    });
}
/**
 * Makes three conccurent requests to get random names.
 * async/await, without Promise.all.
 *
 * @returns Promise to get three parsed JSONs with random name.
 */
function getThreeRandomNames2() {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < 3; i++) {
            promises.push(getJSON(RANDOM_NAMES_URL));
        }
        return yield concurrentResolve(promises);
    });
}
/**
 * Makes three conccurent requests to get random names.
 * Promises only.
 *
 * @returns Promise to get three parsed JSONs with random name.
 */
function getThreeRandomNames3() {
    const promises = [];
    for (let i = 0; i < 3; i++) {
        promises.push(getJSON(RANDOM_NAMES_URL));
    }
    return concurrentResolve(promises);
}
/**
 * Makes requests to get random user until it gets a female user.
 * async/await.
 *
 * @returns Promise to get female user and number of attempts.
 */
function getFemaleUser1() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = {};
        let counter = 0;
        while (user.gender !== "Female") {
            const response = yield fetch(RANDOM_USER_URL);
            counter++;
            user = yield response.json();
        }
        return { user, attempts: counter };
    });
}
/**
 * Makes requests to get random user until it gets a female user.
 * Promises only.
 *
 * @returns Promise to get female user and number of attempts.
 */
function getFemaleUser2() {
    return new Promise(resolve => {
        let counter = 0;
        const startFetch = () => {
            fetch(RANDOM_USER_URL)
                .then(response => response.json())
                .then(user => {
                counter++;
                if (user.gender === "Female") {
                    resolve({ user, attempts: counter });
                }
                else {
                    startFetch();
                }
            });
        };
        startFetch();
    });
}
/**
 * Creates a Promise that is resolved with an array of results
 * when all of the provided Promises resolve.
 *
 * @param promises Promises to be resolved concurrently.
 * @returns A new Promise.
 */
function concurrentResolve(promises) {
    return new Promise(resolve => {
        const results = [];
        for (let promise of promises) {
            promise.then(result => {
                results.push(result);
                if (results.length === promises.length)
                    resolve(results);
            });
        }
    });
}
/**
 * Fetches JSON and makes Promise.
 *
 * @param url Endpoint URL to API.
 * @returns A new Promise.
 */
function getJSON(url) {
    const json = fetch(url).then(res => res.json());
    return json;
}
/* Testing */
getFemaleUser2().then(response => {
    // console.log(response.user);
    // console.log("Attempts:", response.attempts);
});
getThreeRandomNames3()
    .then(names => {
    // console.log("Only Promises", names);
});
/* Async wrapper to be able to use await */
(() => __awaiter(void 0, void 0, void 0, function* () {
    const names1 = yield getThreeRandomNames1();
    // console.log("async/await + Promise.all", names1);
    const names2 = yield getThreeRandomNames2();
    // console.log("async/await without Promise.all", names2);
    const femaleUser = yield getFemaleUser1();
    // console.log(femaleUser.user);
    // console.log("Attempts:", femaleUser.attempts);
    const a = yield logIP();
    const b = yield printOctets();
}))();
