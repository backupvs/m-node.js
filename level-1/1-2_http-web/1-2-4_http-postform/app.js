/**
 * Procces HTTP request and makes response depending on
 * method, uri, headers and body.
 * Prints response to the console.
 * 
 * @param {string} $method HTTP method
 * @param {string} $uri Request URI
 * @param {string} $headers Request headers
 * @param {string} $body Request body
 */
function processHttpRequest($method, $uri, $headers, $body) {
    let statusCode =
        $method === "POST"
            ? $uri === "/api/checkLoginAndPassword" && $headers["Content-Type"] === "application/x-www-form-urlencoded" 
                ? 200
                : 404
        : 400;

    try {
        readFile("passwords.txt");
    } catch(e) {
        statusCode = 500;
    }

    const statusMessage = getStatusMessage(statusCode);
    const body = 
        statusCode === 200 
            ? auth(getUsernameAndPassword($body))
                ? `<h1 style="color:green">FOUND</h1>`
                : `<h1 style="color:red">NOT FOUND</h1>`
        : "";
    
    const headers =
        `${new Date()}\n` +
        `Server: Apache/2.2.14 (Win32)\n` +
        `Content-Length: ${body.toString().length}\n` +
        `Connection: Closed\n` +
        `Content-Type: text/html; charset=utf-8`;

    outputHttpResponse(statusCode, statusMessage, headers, body);
}

/**
 * Prints fromatted response to the console.
 * 
 * @param {string} statusCode Status code
 * @param {string} statusMessage Status message
 * @param {string} headers Headers
 * @param {string} body Body
 */
function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}\n${headers}${body ? "\n" + body : ""}`);
}

/**
 * Checks if username:password pair is in the file.
 * 
 * @param {string} authData username:password pair.
 * @returns {boolean} True - if a match was found, False otherwise.
 */
function auth(authData) {
    const data = readFile("passwords.txt");
    return data
        .split(/\r\n/)
        .reduce((result, entry, i, arr) => {
            if(entry === authData) arr.splice(1);
            return acc = entry === authData;
        });
}

/**
 * Parses body and gets username and password.
 * 
 * @param {string} body Body of the request.
 * @returns {string} username:password pair.
 */
function getUsernameAndPassword(body) {
    const username = body.match(/(?:login=)([\S]+)(?:&)/)[1];
    const password = body.match(/(?:password=)([\S]+)/)[1];
    return `${username}:${password}`;
}

function readFile(path) {
    return require("fs").readFileSync(path, {encoding: "utf-8", flag:"r"});
}

/**
 * Returns a message depending on status code.
 * 
 * @param {number} statusCode Status code of request.
 * @returns {string} Status message.
 */
function getStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 400: return "Bad Request";
        case 404: return "Not Found";
        case 500: return "Internal Server Error"
        default: throw new Error("Wrong status code");
    }
}

/**
 * Parses request.
 * 
 * @param {string} string Request as string
 * @returns {Object} Object with properties of request.
 */
function parseTcpStringAsHttpRequest(string) {
    return {
    method: string.match(/\w+/)[0],
    uri : string.match(/((\/\w+)+(\?(\w+)=[\d,]+)?(\.html)?)|(\/)/)[0],
    headers: Object.fromEntries(
        string
            .match(/([\w-]+:\s?.+)/g)
            .map( str => str.replace(" ", "").split(":"))
        ),
    body :string.match(/\n\s(.*)/)[1],
  };
}

/* Create request */
const contents = 
    `POST /api/checkLoginAndPassword HTTP/1.1\n` +
    `Accept: */*\n` +
    `Content-Type: application/x-www-form-urlencoded\n` +
    `User-Agent: Mozilla/4.0\n` +
    `Content-Length: 35\n` +
    `\n` +
    `login=student&password=12345`;    

/* Parse request */
const http = parseTcpStringAsHttpRequest(contents);

/* Process request and print response to the console */
processHttpRequest(http.method, http.uri, http.headers, http.body);