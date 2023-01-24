/* APIs */
const IP_URL = "https://api.ipify.org/?format=json";
const RANDOM_NAMES_URL = "https://random-data-api.com/api/name/random_name";
const RANDOM_USER_URL = "https://random-data-api.com/api/users/random_user";

/**
 * Fetches JSON from API and prints it to the console.
 */
const printIP = async () => console.log(await getJSON(IP_URL));

/**
 * Fetches JSON from API.
 * 
 * @returns Parsed JSON with IP
 */
const getIP = async () => await getJSON(IP_URL);

/**
 * Await for IP and run callback with IP as an argument.
 * 
 * @param callback Callback to run with IP.
 */
const runCallbackWithIP = async (callback: (ip: string) => void) => {
    const { ip } = await getIP();
    callback(ip);
}

/**
 * Print IP to the console.
 */
const logIP = async () => {
    runCallbackWithIP(ip => {
        console.log("IP:", ip);
    });
}

/**
 * Run callback with IP as an argument.
 * 
 * @param callback Callback to run with IP.
 */
const runCallbackWithIP2 = (callback: (ip: string) => void) => {
    callback("00.00.00.00");
}

const printOctets = async () => {
    runCallbackWithIP2(ip => {
        console.log(ip.split("."));
    });
}

/**
 * Makes three conccurent requests to get random names.
 * async/await + Promise.all
 * 
 * @returns Promise to get three parsed JSONs with random name.
 */
async function getThreeRandomNames1() {
    const promises: Promise<unknown>[] = [];

    for (let i = 0; i < 3; i++) {
        promises.push(getJSON(RANDOM_NAMES_URL));
    }

    const result = await Promise.all(promises);
    return result;
}

/**
 * Makes three conccurent requests to get random names.
 * async/await, without Promise.all.
 * 
 * @returns Promise to get three parsed JSONs with random name.
 */
async function getThreeRandomNames2() {
    const promises: Promise<unknown>[] = [];

    for (let i = 0; i < 3; i++) {
        promises.push(getJSON(RANDOM_NAMES_URL));
    }

    return await concurrentResolve(promises);
}

/**
 * Makes three conccurent requests to get random names.
 * Promises only.
 * 
 * @returns Promise to get three parsed JSONs with random name.
 */
function getThreeRandomNames3() {
    const promises: Promise<unknown>[] = [];

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
 async function getFemaleUser1() {
    let user: { [gender: string]: string } = {};
    let counter = 0;

    while (user.gender !== "Female") {
        const response = await fetch(RANDOM_USER_URL);
        counter++;
        user = await response.json();
    }

    return { user, attempts: counter };
}

/**
 * Makes requests to get random user until it gets a female user.
 * Promises only.
 * 
 * @returns Promise to get female user and number of attempts.
 */
function getFemaleUser2(): Promise<any> {
    return new Promise(resolve => {
        let counter = 0;

        const startFetch = () => {
            fetch(RANDOM_USER_URL)
                .then(response => response.json())
                .then(user => {
                    counter++;
                    if (user.gender === "Female") {
                        resolve({ user, attempts: counter });
                    } else {
                        startFetch();
                    }
                });
        };

        startFetch();
    })
}

/**
 * Creates a Promise that is resolved with an array of results
 * when all of the provided Promises resolve.
 * 
 * @param promises Promises to be resolved concurrently.
 * @returns A new Promise.
 */
function concurrentResolve(promises: Promise<unknown>[]): Promise<unknown> {
    return new Promise(resolve => {
        const results: any[] = [];

        for (let promise of promises) {
            promise.then(result => {
                results.push(result);
                if (results.length === promises.length) resolve(results);
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
function getJSON(url: string): Promise<any> {
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
(async () => {
    const names1 = await getThreeRandomNames1();
    // console.log("async/await + Promise.all", names1);
    const names2 = await getThreeRandomNames2();
    // console.log("async/await without Promise.all", names2);
    const femaleUser = await getFemaleUser1();
    // console.log(femaleUser.user);
    // console.log("Attempts:", femaleUser.attempts);
    await logIP();
    await printOctets();
})();